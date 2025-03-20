import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import useChatState from "../state/ChatStore";
import useChatInput from "../hooks/use-chat-input";
import useFetchAIResponse from "../hooks/useFetchAIResponse";

export function ChatInput() {
  const { prompt, setPrompt, handleKeyDown, handleChange } = useChatInput("", () => sendUserPrompt(prompt));
  const { isPending, sendUserPrompt } = useFetchAIResponse();

  return (
    <div className="p-4 dark:bg-zinc-900 flex justify-center items-center flex-col lg:pl-24 lg:pr-24">
      <div className="flex w-full items-center rounded-lg border p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <textarea
          disabled={isPending}
          value={prompt}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={3}
          className="scrollbar text-sm w-full resize-none bg-transparent p-2 focus:border-transparent focus:ring-0 focus:outline-none dark:focus:border-zinc-700"
          placeholder="Type your message here..."
        ></textarea>

        {prompt.length > 0 && !isPending && (
          <button
            onClick={() => sendUserPrompt(prompt)}
            disabled={isPending}
            className="ml-2 rounded-lg p-2 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            {!isPending && <PaperAirplaneIcon className="h-5 w-5 rotate-270 cursor-pointer" />}
          </button>
        )}
      </div>

      <p className="text-xs pt-2 text-red-600 dark:text-red-300">Warning</p>
    </div>
  );
}
