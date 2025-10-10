"use client";

import { VerifyingScreen } from "@/components/widget/VerifyingScreen";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useRequest from "@/hooks/useRequest";
import { getAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout(props: Props) {
  // Props
  const { children } = props;

  // Contexts
  const localAuthToken = getAuthToken();
  const verifiedAuthToken = useAuthMiddleware((s) => s.verifiedAuthToken);
  const setRole = useAuthMiddleware((s) => s.setRole);
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);
  const setVerifiedAuthToken = useAuthMiddleware((s) => s.setVerifiedAuthToken);

  // Hooks
  const router = useRouter();
  const { req, loading } = useRequest({
    id: "user-profile",
    showLoadingToast: false,
    showSuccessToast: false,
    showErrorToast: false,
  });

  useEffect(() => {
    if (localAuthToken && !verifiedAuthToken) {
      console.debug("verifying");

      const config = {
        method: "GET",
        url: "/api/profile/get-user-profile",
      };
      req({
        config,
        onResolve: {
          onSuccess: (r) => {
            const user = r.data.data;

            setVerifiedAuthToken(localAuthToken);
            setRole(user.role);
            setPermissions(user.role.permissions);
          },
        },
      });
    } else {
      router.push("/");
    }
  }, [localAuthToken, verifiedAuthToken]);

  return (
    <>
      {loading && <VerifyingScreen />}

      {!loading && verifiedAuthToken && children}
    </>
  );
}
