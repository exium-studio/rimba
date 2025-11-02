import { create } from "zustand";

const CMS_SECRET_KEY = "cms-secret-key-kuat";

interface CMSState {
  CMSAuthToken: string;
  setCMSAuthToken: (newToken: string) => void;
  highlightedContentIds: string[];
  setHighlightedContentIds: (newIds: string[]) => void;
  isCMSActive: boolean;
  isStaticContentListOpen: boolean;
  toggleStaticContentList: () => void;
  setStaticContentList: (newState: boolean) => void;
}

export const useCMS = create<CMSState>((set) => {
  let cmsKeyFromURL = "";
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    cmsKeyFromURL = params.get("cms-signature") || "";
  }

  return {
    CMSAuthToken:
      typeof window !== "undefined"
        ? sessionStorage.getItem("CMSAuthToken") || ""
        : "",

    setCMSAuthToken: (newToken: string) => {
      set({ CMSAuthToken: newToken });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("CMSAuthToken", newToken);
      }
    },

    highlightedContentIds: [],
    setHighlightedContentIds: (newIds: string[]) =>
      set({ highlightedContentIds: newIds }),

    isCMSActive: cmsKeyFromURL === CMS_SECRET_KEY,

    // new toggle for static content list
    isStaticContentListOpen: false,
    toggleStaticContentList: () =>
      set((state) => ({
        isStaticContentListOpen: !state.isStaticContentListOpen,
      })),
    setStaticContentList: (newState) =>
      set(() => ({
        isStaticContentListOpen: newState,
      })),
  };
});
