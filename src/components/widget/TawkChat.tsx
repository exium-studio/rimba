"use client";

import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    // Prevent multiple script injections
    if (document.getElementById("tawk-script")) return;

    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/68f87788f978561952923b55/1j8595rol";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    s0.parentNode?.insertBefore(s1, s0);

    return () => {
      // Clean up if component unmounts
      s1.remove();
    };
  }, []);

  return null; // No visual element
}
