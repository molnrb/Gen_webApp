import { useState } from 'react';
import CodeSandbox from './CodeSandbox';
import CodeEditor from './CodeEditor';
import { Chat } from './chat/Chat';
import { ChatHistory } from './chat/ChatHistory';
import { ChatInput } from './chat/ChatInput';
import Header from './ui/Header';
import { Sidebar } from './ui/Sidebar';
import useCodeStore from "./state/CodeStore";
import useUIStateStore from './state/UIStateStore';
import useChatState from './state/ChatStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FeedbackInput from './chat/FeedBackInput';

const queryClient = new QueryClient();

export default function App() {
  const { code } = useCodeStore();
  const { isSidebarOpen } = useUIStateStore();
  const [ activeChat, setActiveChat ] = useState<'generate' | 'modify'>('generate');
  const [activeTab, setActiveTab] = useState<'sandbox' | 'editor'>('sandbox');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900">
      <QueryClientProvider client={queryClient}>
        {isSidebarOpen && (
          <Sidebar>
            <ChatHistory />
          </Sidebar>
        )}
        <div className="flex h-screen w-screen flex-col">
          <Header />
          <Chat />
          <div className="flex space-x-4 border-b p-2">
            <button onClick={() => setActiveChat('generate')} className={activeChat === 'generate' ? 'font-bold' : ''}>Generate</button>
            <button onClick={() => setActiveChat('modify')} className={activeChat === 'modify' ? 'font-bold' : ''}>Modify</button>
          </div>
          {activeChat === 'generate' ? <ChatInput /> : <FeedbackInput />}
          
          
          
        </div>
        <div className="h-screen w-300 flex flex-col overflow-hidden">
          <div className="flex space-x-4 border-b p-2">
            <button onClick={() => setActiveTab('sandbox')} className={activeTab === 'sandbox' ? 'font-bold' : ''}>Sandbox</button>
            <button onClick={() => setActiveTab('editor')} className={activeTab === 'editor' ? 'font-bold' : ''}>Code Editor</button>
          </div>
          {activeTab === 'sandbox' ? <CodeSandbox code={code} /> : <CodeEditor code={code} />}
          
        </div>
      </QueryClientProvider>
    </div>
  );
}
