import {
  activities,
  completionProgress,
  animals,
  staticContents,
  legalDocs,
} from "@/constants/dummy";
import { create } from "zustand";

interface State_Actions {
  activities: any;
  animals: any;
  completionProgress: any;
  legalDocuments: any;
  staticContents: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  staticContents: staticContents || [],
  activities: activities || [],
  animals: animals || [],
  completionProgress: completionProgress || [],
  legalDocuments: legalDocs || [],
  setContents: (newState) =>
    set({
      staticContents: newState.staticContents,
      activities: newState.activities,
      animals: newState.animals,
      completionProgress: newState.completionProgress,
      legalDocuments: newState.legalDocuments,
    }),
}));

export default useContents;
