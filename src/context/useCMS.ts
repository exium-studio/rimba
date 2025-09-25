import { create } from "zustand";

const CMS_SECRET_KEY = "cms-secret-key-kuat";

interface CMSState {
  authToken: string;
  setAuthToken: (newToken: string) => void;
  highlightedContentIds: number[];
  setHighlightedContentIds: (newIds: number[]) => void;
  isCMSActive: boolean;
}

const useCMS = create<CMSState>((set) => {
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
    setHighlightedContentIds: (newIds: number[]) =>
      set({ highlightedContentIds: newIds }),

    isCMSActive: cmsKeyFromURL === CMS_SECRET_KEY,
  };
});

export default useCMS;
