import { create } from "zustand"


type photoStore = {
    pageState: number
    setPageState: (newPageState: number) => void
    layout: {
        name: string
        poses: number
    }
    setLayout: (name: string, poses: number) => void
}

export const useStore = create<photoStore>((set) => ({
    pageState: 1,
    setPageState: (newPageState: number) => set({ pageState: newPageState }),
    layout: { name: "", poses: 0 },
    setLayout: (name: string, poses: number) => set({ layout: { name: name, poses: poses } }),
}))

