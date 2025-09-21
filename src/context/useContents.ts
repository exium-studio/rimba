import { activities, staticContents } from "@/constants/dummy";
import { create } from "zustand";

interface State_Actions {
  activities: any;
  staticContents: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  activities: activities || [],
  staticContents: staticContents || [],
  setContents: (newState) =>
    set({
      activities: newState.activities,
      staticContents: newState.staticContents,
    }),
}));

export default useContents;
