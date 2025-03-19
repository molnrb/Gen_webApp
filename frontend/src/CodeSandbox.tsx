import { useEffect, useRef } from "react";

interface CodeSandboxProps {
  code: string;
}

export default function CodeSandbox({ code }: CodeSandboxProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();  
      }
    }
  }, [code]);

  return (
    <div className="h-full p-4">
      <iframe
        ref={iframeRef}
        className="w-full h-full border border-gray-300 rounded-lg"
      ></iframe>
    </div>
  );
}
