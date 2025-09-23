import {
  activities,
  completionProgress,
  animals,
  staticContents,
} from "@/constants/dummy";
import { create } from "zustand";

interface State_Actions {
  activities: any;
  animals: any;
  completionProgress: any;
  staticContents: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  activities: activities || [],
  animals: animals || [],
  completionProgress: completionProgress || [],
  staticContents: staticContents || [],
  setContents: (newState) =>
    set({
      activities: newState.activities,
      staticContents: newState.staticContents,
    }),
}));

export default useContents;
