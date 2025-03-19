export default function extractCodeFromMarkdown(markdown: string): string | null {
    const codeBlockRegex = /```[a-zA-Z]*\n([\s\S]*?)\n```/g;
    const match = codeBlockRegex.exec(markdown);
    return match ? match[1].trim() : null;
  }
  