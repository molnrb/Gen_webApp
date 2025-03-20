import { create } from "zustand";

// Define file type
interface ProjectFile {
  name: string;
  content: string;
}

// Define Zustand store for project management
interface ProjectState {
  files: ProjectFile[];
  activeFile: string | null;
  setFiles: (files: ProjectFile[]) => void;
  updateFileContent: (fileName: string, newContent: string) => void;
  setActiveFile: (fileName: string) => void;
}

const useProjectStore = create<ProjectState>((set) => ({
  files: [],
  activeFile: null,

  setFiles: (files) => set({ files, activeFile: files.length ? files[0].name : null }),

  updateFileContent: (fileName, newContent) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.name === fileName ? { ...file, content: newContent } : file
      ),
    })),

  setActiveFile: (fileName) => set({ activeFile: fileName }),
}));

export default useProjectStore;
