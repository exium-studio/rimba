"use client";

import { useColorMode } from "@/components/ui/color-mode";
import useADM from "@/context/useADM";
import { useFirefoxPaddingY } from "@/hooks/useFirefoxPaddingY";
import useOfflineAlert from "@/hooks/useOfflineAlert";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import GlobalDisclosure from "./GlobalDisclosure";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientOnlyApp({ children }: Props) {
  const { setColorMode } = useColorMode();
  const ADM = useADM((s) => s.ADM);

  useFirefoxPaddingY();
  useOfflineAlert({ mounted: true });

  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  useEffect(() => {
    setColorMode("light"); // force light on first load
  }, []);

  useEffect(() => {
    if (ADM) {
      updateDarkMode();
      const interval = setInterval(() => {
        const hour = new Date().getHours();
        if (hour === 6 || hour === 18) updateDarkMode();
      }, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [ADM]);

  return (
    <>
      <GlobalDisclosure />
      {children}
    </>
  );
}
