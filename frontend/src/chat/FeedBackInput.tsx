import React, { useState } from "react";
import useCodeStore from "../state/CodeStore";
import extractCodeFromMarkdown from "../util/extractCode";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function FeedbackInput() {
  const { code, updateCode, undo, redo, history, future } = useCodeStore();
  const [userFeedback, setUserFeedback] = useState<string>("");

  const handleSubmitFeedback = async () => {
    const response = await fetch("http://localhost:8000/modify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: userFeedback, code }),
    });

    const modifiedCode = await response.text();
    const extracted = extractCodeFromMarkdown(modifiedCode);
    if (extracted) updateCode(extracted);
    else updateCode
  };

  return (
    <div className="p-4 dark:bg-zinc-900 flex justify-center items-center flex-col lg:pl-24 lg:pr-24">
      {/* Input Box */}
      <div className="flex w-full items-center rounded-lg border p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <textarea
          value={userFeedback}
          onChange={(e) => setUserFeedback(e.target.value)}
          rows={3}
          className="scrollbar text-sm w-full resize-none bg-transparent p-2 focus:border-transparent focus:ring-0 focus:outline-none dark:focus:border-zinc-700"
          placeholder="Type your modification request here..."
        ></textarea>

        {userFeedback.length > 0 && (
          <button
            onClick={handleSubmitFeedback}
            className="ml-2 rounded-lg p-2 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-270 cursor-pointer" />
          </button>
        )}
      </div>

      {/* Undo/Redo Buttons */}
      <div className="flex w-full justify-between mt-4">
        <button
          onClick={undo}
          disabled={history.length === 0}
          className={`py-2 px-4 rounded-lg font-semibold ${
            history.length > 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Undo ⏪
        </button>

        <button
          onClick={redo}
          disabled={future.length === 0}
          className={`py-2 px-4 rounded-lg font-semibold ${
            future.length > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Redo ⏩
        </button>
      </div>

      {/* Warning Message */}
      <p className="text-xs pt-2 text-red-600 dark:text-red-300">Warning</p>
    </div>
  );
}
