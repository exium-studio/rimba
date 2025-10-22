import {
  homeActivities,
  homeCompletionProgress,
  homeAnimalComposition,
  staticContents,
  homeLegalDocuments,
  homeNews,
  FAQs,
} from "@/constants/_dummy";
import { create } from "zustand";

interface State_Actions {
  staticContents: any;
  homeActivities: any;
  homeAnimalComposition: any;
  homeCompletionProgress: any;
  homeLegalDocuments: any;
  homeNews: any;
  FAQs: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  staticContents: staticContents || [],
  homeActivities: homeActivities || [],
  homeAnimalComposition: homeAnimalComposition || [],
  homeCompletionProgress: homeCompletionProgress || [],
  homeLegalDocuments: homeLegalDocuments || [],
  homeNews: homeNews || [],
  FAQs: FAQs || [],
  setContents: (newState) =>
    set({
      staticContents: newState.staticContents,
      homeActivities: newState.homeActivities,
      homeAnimalComposition: newState.homeAnimalComposition,
      homeCompletionProgress: newState.homeCompletionProgress,
      homeLegalDocuments: newState.homeLegalDocuments,
      FAQs: newState.FAQs,
    }),
}));

export default useContents;
