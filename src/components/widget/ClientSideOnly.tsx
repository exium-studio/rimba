"use client";
export const dynamic = "force-dynamic";

import { useColorMode } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";
import { DefaultFallback } from "@/components/widget/DefaultFallback";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LoadingBar } from "@/components/widget/LoadingBar";
import { StaticContentListToggle } from "@/components/widget/StaticContentEditor";
import TawkChat from "@/components/widget/TawkChat";
import useADM from "@/context/useADM";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import { useCMS } from "@/context/useCMS";
import useContents from "@/context/useContents";
import useDataState from "@/hooks/useDataState";
import { useFirefoxPaddingY } from "@/hooks/useFirefoxPaddingY";
import useOfflineAlert from "@/hooks/useOfflineAlert";
import useRequest from "@/hooks/useRequest";
import { isEmptyArray } from "@/utils/array";
import { getAuthToken } from "@/utils/auth";
import { removeStorage, setStorage } from "@/utils/client";
import { Center } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalDisclosure from "./GlobalDisclosure";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// persist mounted state across route changes
let mountedGlobal = false;

export default function ClientSideOnly(props: Props) {
  // Props
  const { children, fallback } = props;

  // Contexts
  const staticContents = useContents((s) => s.staticContents);
  const setContents = useContents((s) => s.setContents);
  const { setColorMode } = useColorMode();
  const ADM = useADM((s) => s.ADM);
  const authToken = getAuthToken();
  const verifiedAuthToken = useAuthMiddleware((s) => s.verifiedAuthToken);
  const setRole = useAuthMiddleware((s) => s.setRole);
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);
  const setVerifiedAuthToken = useAuthMiddleware((s) => s.setVerifiedAuthToken);
  const CMSAuthToken = useCMS((s) => s.CMSAuthToken);
  const setCMSAuthToken = useCMS((s) => s.setCMSAuthToken);

  // Hooks
  const searchParams = useSearchParams();
  const CMSAuthTokenParams = searchParams.get("CMSAuthToken");
  useFirefoxPaddingY();
  const { req } = useRequest({
    id: "user-profile",
    showLoadingToast: false,
    showSuccessToast: false,
    showErrorToast: false,
  });

  // States
  const [mounted, setMounted] = useState(mountedGlobal);
  const { data, initialLoading, error, onRetry } = useDataState<any>({
    initialData: undefined,
    url: `/api/cms/public-request/get-all-content?cms=${CMSAuthToken ? 1 : 0}`,
    dependencies: [],
    dataResource: false,
  });
  const render = {
    loading: <DefaultFallback />,
    error: (
      <Center minH={"100dvh"}>
        <FeedbackRetry onRetry={onRetry} />
      </Center>
    ),
    empty: (
      <Center minH={"100dvh"}>
        <FeedbackNoData />
      </Center>
    ),
    loaded: (
      <>
        <Toaster />
        <LoadingBar />
        <GlobalDisclosure />
        {CMSAuthToken && <StaticContentListToggle />}

        {children}

        <TawkChat />
      </>
    ),
  };

  // Utils
  function updateDarkMode() {
    const hour = new Date().getHours();
    setColorMode(hour >= 18 || hour < 6 ? "dark" : "light");
  }

  useEffect(() => {
    if (CMSAuthTokenParams) setCMSAuthToken(CMSAuthTokenParams as string);
  }, [CMSAuthTokenParams]);

  // handle LP contents
  useEffect(() => {
    if (data) {
      setContents(data);
    }
  }, [data]);

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
  useOfflineAlert();

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
            setStorage("__auth_token", authToken, "local", 259200000);
            setStorage("__user_data", JSON.stringify(user), "local", 259200000);
            setVerifiedAuthToken(authToken);
            setRole(user.role);
            setPermissions(user.role.permissions);
          },
          onError: () => {
            removeStorage("__auth_token");
            removeStorage("__user_data");
          },
        },
      });
    }
  }, [authToken, verifiedAuthToken]);

  if (!mounted) return <>{fallback || <DefaultFallback />}</>;

  return (
    <>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && !isEmptyArray(staticContents) && render.loaded}
              {!data && render.empty}
            </>
          )}
        </>
      )}
    </>
  );
}
