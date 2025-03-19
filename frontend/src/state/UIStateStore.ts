import { create } from 'zustand'

type UIState = {
  isSidebarOpen: boolean,
  isSettingsOpen: boolean,
  aiAnswer: string
};

type UIStateActions = {
  setIsSidebarOpen: (open: boolean) => void,
  setIsSettingsOpen: (open: boolean) => void
  setAiAnswer: (answer: string) => void
}

type UIStateStore = UIState & UIStateActions;

const useUIStateStore = create<UIStateStore>((set) => ({
  isSidebarOpen: false,
  isSettingsOpen: false,
  aiAnswer: '',

  setAiAnswer: (answer) => {
    set({ aiAnswer: answer })
  },
  setIsSidebarOpen: (open) => {
    set({ isSidebarOpen: open })
  },
  setIsSettingsOpen: (open) => {
    set({ isSettingsOpen: open })
  },
}))

export default useUIStateStore