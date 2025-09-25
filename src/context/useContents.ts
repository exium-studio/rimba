import {
  homeActivities,
  homeCompletionProgress,
  homeSpeciesComposition,
  staticContents,
  homeLegalDocs,
  homeNews,
} from "@/constants/_dummy";
import { create } from "zustand";

interface State_Actions {
  staticContents: any;
  homeActivities: any;
  homeSpeciesComposition: any;
  homeCompletionProgress: any;
  legalDocuments: any;
  homeNews: any;
  setContents: (newState: any) => void;
}

const useContents = create<State_Actions>((set) => ({
  staticContents: staticContents || [],
  homeActivities: homeActivities || [],
  homeSpeciesComposition: homeSpeciesComposition || [],
  homeCompletionProgress: homeCompletionProgress || [],
  legalDocuments: homeLegalDocs || [],
  homeNews: homeNews || [],
  setContents: (newState) =>
    set({
      staticContents: newState.staticContents,
      homeActivities: newState.homeActivities,
      homeSpeciesComposition: newState.homeSpeciesComposition,
      homeCompletionProgress: newState.homeCompletionProgress,
      legalDocuments: newState.legalDocuments,
    }),
}));

export default useContents;
