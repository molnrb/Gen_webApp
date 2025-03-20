import React, { useState } from "react";
import useProjectStore from "../state/useProjectStore";

export default function ProjectGenerator() {
  const [description, setDescription] = useState<string>("");
  const [projectType, setProjectType] = useState<string>("Web App");
  const { setFiles } = useProjectStore();

  const handleGenerateProject = async () => {
    const response = await fetch("http://localhost:8000/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_type: "react", description }),
    });

    const project = await response.json();
    setFiles(project.files);
  };

  return (
    <div className="p-4 dark:bg-zinc-900 flex flex-col space-y-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your project..."
        className="w-full p-3 rounded border border-gray-700 bg-gray-800"
      />
      <button
        onClick={handleGenerateProject}
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-semibold"
      >
        Generate Project ✨
      </button>
    </div>
  );
}
