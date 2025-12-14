import { toaster } from "@/components/ui/toaster";
import useOffline from "@/context/disclosure/useOffilne";
import useLang from "@/context/useLang";
import { useEffect, useRef } from "react";

export default function useOfflineAlert() {
  const { l } = useLang();
  const { setOffline } = useOffline();

  const lastStatus = useRef<boolean | null>(null);

  function syncStatus(isOnline: boolean) {
    if (lastStatus.current === isOnline) return;

    lastStatus.current = isOnline;
    setOffline(!isOnline);

    if (isOnline) {
      toaster.success({
        title: l.success_online.title,
        description: l.success_online.description,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  }

  useEffect(() => {
    syncStatus(navigator.onLine);

    const handleOnline = () => syncStatus(true);
    const handleOffline = () => syncStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
}
