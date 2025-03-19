import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css"; // Dark theme for syntax highlighting
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ChatAIResponseMessageProps = {
  content: string;
};

export default function ChatAIResponseMessage({
  content,
}: ChatAIResponseMessageProps) {
  return (
    <div className="flex items-start space-x-2">
      <ComputerDesktopIcon className="h-6 w-6 text-gray-500" />
      <div className="markdown-content flex-1 p-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            code: ({
              node, // Make node optional
              inline,
              className,
              children,
              ...props
            }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) => {
              if (inline) {
                return (
                  <code
                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <div className="rounded-lg overflow-hidden border border-gray-900 bg-gray-900 shadow-lg">
                  <pre className="overflow-x-auto text-sm text-gray-100">
                    <code {...props} className={`${className ?? ""}`}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
