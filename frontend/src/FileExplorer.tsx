import React from "react";
import useProjectStore from "./state/useProjectStore";

export default function FileExplorer() {
  const { files, activeFile, setActiveFile } = useProjectStore();

  return (
    <div className="p-4 dark:bg-zinc-900 w-64 border-r">
      <h2 className="text-lg font-bold mb-2">Project Files</h2>
      <ul className="space-y-2">
        {files.map((file) => (
          <li
            key={file.name}
            onClick={() => setActiveFile(file.name)}
            className={`p-2 rounded cursor-pointer ${
              activeFile === file.name ? "bg-blue-600 text-white" : "hover:bg-gray-700"
            }`}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
