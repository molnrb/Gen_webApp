import { create } from "zustand";

// Define the state type
interface CodeState {
  code: string;
  history: string[]; // Stores previous versions
  future: string[]; // Stores undone versions for redo
  updateCode: (newCode: string) => void;
  undo: () => void;
  redo: () => void;
}

// Zustand store for managing code state
const useCodeStore = create<CodeState>((set) => ({
  code: "",
  history: [],
  future: [],

  updateCode: (newCode) =>
    set((state) => ({
      history: [...state.history, state.code], // Store previous version
      code: newCode,
      future: [], // Clear redo stack when new changes are made
    })),

  undo: () =>
    set((state) => {
      if (state.history.length === 0) return state; // No history to undo
      const previousCode = state.history[state.history.length - 1];
      return {
        code: previousCode,
        history: state.history.slice(0, -1),
        future: [state.code, ...state.future], // Save current for redo
      };
    }),

  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state; // No redo available
      const nextCode = state.future[0];
      return {
        code: nextCode,
        history: [...state.history, state.code], // Store current for undo
        future: state.future.slice(1),
      };
    }),
}));

export default useCodeStore;
