import { useState } from "react";
import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
}

export default function CodeEditor({ code }: CodeEditorProps) {
  const [editorCode, setEditorCode] = useState(code);

  return (
    <div className="h-full p-4">
      <Editor
        defaultLanguage="html"
        value={editorCode}
        onChange={(value) => setEditorCode(value || "")}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false } }}
        className="w-full h-full rounded-lg"
      />
    </div>
  );
}
