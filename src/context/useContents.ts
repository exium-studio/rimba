import {
  homeActivities,
  homeCompletionProgress,
  homeAnimalComposition,
  staticContents,
  homeLegalDocuments,
  homeNews,
} from "@/constants/_dummy";
import { create } from "zustand";

interface State_Actions {
  staticContents: any;
  homeActivities: any;
  homeAnimalComposition: any;
  homeCompletionProgress: any;
  legalDocuments: any;
  homeNews: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  staticContents: staticContents || [],
  homeActivities: homeActivities || [],
  homeAnimalComposition: homeAnimalComposition || [],
  homeCompletionProgress: homeCompletionProgress || [],
  legalDocuments: homeLegalDocuments || [],
  homeNews: homeNews || [],
  setContents: (newState) =>
    set({
      staticContents: newState.staticContents,
      homeActivities: newState.homeActivities,
      homeAnimalComposition: newState.homeAnimalComposition,
      homeCompletionProgress: newState.homeCompletionProgress,
      legalDocuments: newState.legalDocuments,
    }),
}));

export default useContents;
