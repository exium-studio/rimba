import { create } from "zustand";

const CMS_SECRET_KEY = "cms-secret-key-kuat";

interface CMSState {
  authToken: string;
  setAuthToken: (newToken: string) => void;
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
    authToken:
      typeof window !== "undefined"
        ? sessionStorage.getItem("authToken") || ""
        : "",

    setAuthToken: (newToken: string) => {
      set({ authToken: newToken });
      if (typeof window !== "undefined") {
        sessionStorage.setItem("authToken", newToken);
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
