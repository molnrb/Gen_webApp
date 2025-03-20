import React from "react";
import useProjectStore from "./state/useProjectStore";

export default function ProjectEditor() {
  const { files, activeFile, updateFileContent } = useProjectStore();
  const file = files.find((f) => f.name === activeFile);

  if (!file) return <p className="p-4">Select a file to edit</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-bold mb-2">{file.name}</h2>
      <textarea
        value={file.content}
        onChange={(e) => updateFileContent(file.name, e.target.value)}
        className="w-full h-80 p-3 rounded border border-gray-700 bg-gray-800"
      />
    </div>
  );
}
