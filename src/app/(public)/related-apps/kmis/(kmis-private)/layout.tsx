"use client";

import { VerifyingScreen } from "@/components/widget/VerifyingScreen";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useRequest from "@/hooks/useRequest";
import { getAuthToken } from "@/utils/auth";
import { removeStorage, setStorage } from "@/utils/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout({ children }: Props) {
  // Contexts
  const authToken = getAuthToken();
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

  // Track whether verification check is finished
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // If there's no local token → redirect after first render
    if (!authToken) {
      setChecked(true);
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
            setChecked(true);
          },
          onError: () => {
            removeStorage("__auth_token");
            removeStorage("__user_data");
            setChecked(true);
          },
        },
      });
    } else {
      setChecked(true);
    }
  }, [authToken, verifiedAuthToken]);

  useEffect(() => {
    // Redirect only when check is done and no verified token
    if (checked && !verifiedAuthToken) {
      router.replace("/");
    }
  }, [checked, verifiedAuthToken]);

  // Show verifying screen when still loading or not checked yet
  if (!checked || loading) {
    return <VerifyingScreen />;
  }

  return <>{verifiedAuthToken && children}</>;
}
