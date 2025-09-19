"use client";

import { useEffect } from "react";

export function useDisableBodyScroll(active: boolean) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [active]);
}
