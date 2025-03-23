import { create } from "zustand";

interface ControlManager {
    view: string;
    setView: (view: string) => void;
}


const useManager = create<ControlManager>((set) => ({
    view: "coffees",
    setView: (view: string) => {
        set(()=>({view}));
    }
}))

export { useManager };