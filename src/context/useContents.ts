import { lp_contents } from "@/constants/dummy";
import { create } from "zustand";

interface State_Actions {
  contents: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => {
  return {
    contents: lp_contents,
    setContents: (newState) => set({ contents: newState }),
  };
});

export default useContents;
