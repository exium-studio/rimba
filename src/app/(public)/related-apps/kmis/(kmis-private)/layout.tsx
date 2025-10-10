"use client";

import { VerifyingScreen } from "@/components/widget/VerifyingScreen";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useRequest from "@/hooks/useRequest";
import { getAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout({ children }: Props) {
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

  // Track whether verification check is finished
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // If there's no local token → redirect after first render
    if (!localAuthToken) {
      setChecked(true);
      return;
    }

    // If token exists but not verified yet → verify
    if (localAuthToken && !verifiedAuthToken) {
      const config = { method: "GET", url: "/api/profile/get-user-profile" };
      req({
        config,
        onResolve: {
          onSuccess: (r) => {
            const user = r.data.data;
            setVerifiedAuthToken(localAuthToken);
            setRole(user.role);
            setPermissions(user.role.permissions);
            setChecked(true);
          },
          onError: () => {
            setChecked(true);
          },
        },
      });
    } else {
      setChecked(true);
    }
  }, [localAuthToken, verifiedAuthToken]);

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
