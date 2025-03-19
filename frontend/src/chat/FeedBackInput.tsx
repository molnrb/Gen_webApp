import React, { useState } from "react";
import useCodeStore from "../state/CodeStore";

export default function FeedbackInput() {
  const { code, updateCode } = useCodeStore();
  const [userFeedback, setUserFeedback] = useState<string>("");

  const handleSubmitFeedback = async () => {
    const response = await fetch("http://localhost:8000/modify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: userFeedback, code }),
    });

    const modifiedCode = await response.text();
    updateCode(modifiedCode);
  };

  return (
    <div className="mt-4">
      <label className="block mb-1">Modify the code:</label>
      <input
        type="text"
        value={userFeedback}
        onChange={(e) => setUserFeedback(e.target.value)}
        placeholder="E.g., Make the button smaller"
        className="w-full p-3 rounded border border-gray-700 bg-gray-800"
      />
      <button
        onClick={handleSubmitFeedback}
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-semibold mt-2"
      >
        Apply Modification ✨
      </button>
    </div>
  );
}
