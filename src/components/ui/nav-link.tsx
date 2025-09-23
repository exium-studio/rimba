"use client";

import { Props__NavLink } from "@/constants/props";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect } from "react";
import { CContainer } from "./c-container";

export const NavLink = forwardRef<HTMLDivElement, Props__NavLink>(
  (props, ref) => {
    const { children, to, ...restProps } = props;
    const router = useRouter();

    useEffect(() => {
      if (to) {
        router.prefetch(to);
      }
    }, [to, router]);

    function handleOnClick() {
      if (to) {
        router.push(to);
      }
    }

    return (
      <CContainer
        ref={ref}
        cursor={"pointer"}
        onClick={handleOnClick}
        {...restProps}
      >
        {children}
      </CContainer>
    );
  }
);

NavLink.displayName = "NavLink";
