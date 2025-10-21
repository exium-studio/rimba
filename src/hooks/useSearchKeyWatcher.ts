import { useEffect, useState } from "react";

export function useSearchKeyWatcher(paramKey: string) {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    function readParam() {
      const params = new URLSearchParams(window.location.search);
      setValue(params.get(paramKey));
    }

    readParam();

    // listen for SPA route changes
    const handleUrlChange = () => readParam();
    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("pushstate", handleUrlChange);
    window.addEventListener("replacestate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("pushstate", handleUrlChange);
      window.removeEventListener("replacestate", handleUrlChange);
    };
  }, [paramKey]);

  return value;
}
