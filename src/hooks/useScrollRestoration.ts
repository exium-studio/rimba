"use client";
import { useEffect } from "react";

export function useScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "auto";
    }
  }, []);
}
