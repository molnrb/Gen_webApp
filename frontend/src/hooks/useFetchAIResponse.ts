import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useChatState from "../state/ChatStore";
import useUIStateStore from "../state/UIStateStore";
import extractCodeFromMarkdown from "../util/extractCode";
import useCodeStore from "../state/CodeStore";

export default function useFetchAIResponse() {
  const { setAiAnswer } = useUIStateStore();
  const setIsPending = useChatState((state) => state.setIsPending);
  const addMessage = useChatState((state) => state.addMessage);
  const activeChatId = useChatState((state) => state.currentChatId);
  const currentChat = useChatState((state) => state.chats).find(ch => ch.id === activeChatId);
  const [extractedCode, setExtractedCode] = useState<string | null>(null);
  const { code, updateCode } = useCodeStore(); 

  async function fetchStreamedResponse(userPrompt: string) {
    const response = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: "HTML", task: userPrompt }),
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = "";
    setExtractedCode(null);

    if (reader) {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setAiAnswer(result);

        // Extract code while streaming
        const extracted = extractCodeFromMarkdown(result);
        if (extracted) updateCode(extracted);
      }
    }
    return result;
  }

  const sendUserPromptMutation = useMutation({
    mutationFn: fetchStreamedResponse,
    onMutate: (userPrompt) => {
      if (!currentChat || !activeChatId || userPrompt.length <= 0) return;
      setIsPending(activeChatId, true);
      addMessage(activeChatId, userPrompt, true);
    },
    onSuccess: (data) => {
      if (activeChatId) {
        setIsPending(activeChatId, false);
        if (data) addMessage(activeChatId, data, false);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      setIsPending(activeChatId? activeChatId: "", false);
    },
  });

  return {
    isPending: sendUserPromptMutation.isPending,
    sendUserPrompt: sendUserPromptMutation.mutate,
  };
}
