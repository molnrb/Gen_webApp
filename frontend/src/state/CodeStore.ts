import { create } from "zustand";

// Define the state type
interface CodeState {
  code: string;
  updateCode: (newCode: string) => void;
}

// Zustand store for managing code state
const useCodeStore = create<CodeState>((set) => ({
  code: "", // Store the generated code
  updateCode: (newCode) => set({ code: newCode }), // Update the code
}));

export default useCodeStore;