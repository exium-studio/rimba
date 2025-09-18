"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { SVGS_PATH } from "@/constants/paths";
import useADM from "@/context/useADM";
import { useFirefoxPaddingY } from "@/hooks/useFirefoxPaddingY";
import useOfflineAlert from "@/hooks/useOfflineAlert";
import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Img } from "../ui/img";
import GlobalDisclosure from "./GlobalDisclosure";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => {
  return (
    <Center w={"100w"} minH={"100dvh"} color={"fg.subtle"}>
      <Center position={"relative"}>
        <Img
          alt={`RIMBA letter art`}
          src={`${SVGS_PATH}`}
          width={40}
          height={40}
        />
      </Center>
    </Center>
  );
};

// persist mounted state across route changes
let mountedGlobal = false;

export default function ClientOnlyApp(props: Props) {
  // Props
  const { children, fallback } = props;

  // Contexts
  const { setColorMode } = useColorMode();
  const ADM = useADM((s) => s.ADM);

  // Hooks
  useFirefoxPaddingY();

  // States
  const [mounted, setMounted] = useState(mountedGlobal);

  // Utils
  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  // Handle mount
  useEffect(() => {
    mountedGlobal = true;
    setMounted(true);
  }, []);

  // Handle offline alert
  useOfflineAlert({ mounted });

  useEffect(() => {
    if (ADM) {
      const interval = setInterval(() => {
        const hour = new Date().getHours();
        if (hour === 6 || hour === 18) {
          updateDarkMode();
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, []);
  useEffect(() => {
    if (ADM) {
      updateDarkMode();
    }
  }, [ADM]);

  if (!mounted) return <>{fallback || <DefaultFallback />}</>;

  return (
    <>
      <GlobalDisclosure />
      {children}
    </>
  );
}
