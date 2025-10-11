"use client";

import { useColorMode } from "@/components/ui/color-mode";
import { PartnersLogo } from "@/components/widget/PartnersLogo";
import useADM from "@/context/useADM";
import { useFirefoxPaddingY } from "@/hooks/useFirefoxPaddingY";
import useOfflineAlert from "@/hooks/useOfflineAlert";
import { Center } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import GlobalDisclosure from "./GlobalDisclosure";
import { LoadingBar } from "@/components/widget/LoadingBar";
import { getAuthToken } from "@/utils/auth";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useRequest from "@/hooks/useRequest";
import { setStorage } from "@/utils/client";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => {
  return (
    <Center w={"100w"} minH={"100dvh"} color={"fg.subtle"}>
      <Center position={"relative"}>
        {/* <Img
          alt={`RIMBA letter art`}
          src={`${SVGS_PATH}/rimba_letter_art_color.svg`}
          width={40}
          height={40}
          objectFit="contain"
        /> */}
        <PartnersLogo />
      </Center>
    </Center>
  );
};

// persist mounted state across route changes
let mountedGlobal = false;

export default function ClientSideOnly(props: Props) {
  // Props
  const { children, fallback } = props;

  // Contexts
  const { setColorMode } = useColorMode();
  const ADM = useADM((s) => s.ADM);
  const authToken = getAuthToken();
  const verifiedAuthToken = useAuthMiddleware((s) => s.verifiedAuthToken);
  const setRole = useAuthMiddleware((s) => s.setRole);
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);
  const setVerifiedAuthToken = useAuthMiddleware((s) => s.setVerifiedAuthToken);

  // Hooks
  useFirefoxPaddingY();
  const { req } = useRequest({
    id: "user-profile",
    showLoadingToast: false,
    showSuccessToast: false,
    showErrorToast: false,
  });

  // States
  const [mounted, setMounted] = useState(mountedGlobal);

  // Utils
  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  // handle mount
  useEffect(() => {
    mountedGlobal = true;
    setMounted(true);
  }, []);

  // force dark mode = off
  useEffect(() => {
    setColorMode("light");
  }, []);

  // Handle offline alert
  useOfflineAlert({ mounted });

  // handle ADM
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

  useEffect(() => {
    // If there's no local token → redirect after first render
    if (!authToken) {
      return;
    }

    // If token exists but not verified yet → verify
    if (authToken && !verifiedAuthToken) {
      const config = { method: "GET", url: "/api/profile/get-user-profile" };
      req({
        config,
        onResolve: {
          onSuccess: (r) => {
            const user = r.data.data;
            setStorage("__user_data", JSON.stringify(user));
            setVerifiedAuthToken(authToken);
            setRole(user.role);
            setPermissions(user.role.permissions);
          },
          onError: () => {},
        },
      });
    }
  }, [authToken, verifiedAuthToken]);

  if (!mounted) return <>{fallback || <DefaultFallback />}</>;

  return (
    <>
      <LoadingBar />
      <GlobalDisclosure />
      {children}
    </>
  );
}
