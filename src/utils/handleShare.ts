import { Interface__CMSNews } from "@/constants/interfaces";
import { Type__LanguageOptions } from "@/constants/types";
import { getStorage } from "@/utils/client";

export function handleShareBlog(news: Interface__CMSNews) {
  const lang = getStorage("lang") as Type__LanguageOptions;

  if (navigator.share) {
    navigator
      .share({
        title: news?.title[lang],
        text: news?.description[lang],
        url: window.location.href,
      })
      .then(() => {
        console.log("Shared successfully");
      })
      .catch((err) => {
        console.error("Error sharing:", err);
      });
  } else {
    alert("This browser does not support sharing.");
  }
}
