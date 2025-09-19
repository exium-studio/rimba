"use client";

import { CContainer } from "@/components/ui/c-container";
import { useThemeConfig } from "@/context/useThemeConfig";
import useClickOutside from "@/hooks/useClickOutside";
import { Portal, Presence, StackProps, useDisclosure } from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";

import {
  computePosition,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/dom";

type DropdownCtx = {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownCtx | null>(null);

function useDropdownCtx() {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error("useDropdownCtx must be used inside <DropdownRoot>");
  return ctx;
}

export function DropdownRoot(props: { children: ReactNode }) {
  // Props
  const { children } = props;

  // Hooks
  const disclosure = useDisclosure();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <DropdownContext.Provider value={{ ...disclosure, rootRef, triggerRef }}>
      <CContainer position="relative" ref={rootRef}>
        {children}
      </CContainer>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger(props: StackProps) {
  // Props
  const { children, ...restProps } = props;

  // Hooks
  const { triggerRef, onToggle } = useDropdownCtx();

  return (
    <CContainer ref={triggerRef} onClick={onToggle} {...restProps}>
      {children}
    </CContainer>
  );
}

export function DropdownContent(props: StackProps) {
  // Props
  const { children, ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { open, onClose, triggerRef } = useDropdownCtx();

  // Refs
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  // Hooks
  useClickOutside([contentContainerRef], onClose);

  useLayoutEffect(() => {
    const reference = triggerRef?.current ?? null;
    const floating = contentContainerRef?.current ?? null;

    if (!open || !reference || !floating) return;

    const update = async () => {
      const res = await computePosition(reference, floating, {
        placement: "bottom-start",
        strategy: "absolute",
        middleware: [offset(8), flip(), shift({ padding: 8 })],
      });

      Object.assign(floating.style, {
        position: res.strategy,
        transform: `translate3d(${Math.round(res.x)}px, ${Math.round(
          res.y
        )}px, 0)`,
      });
    };

    const cleanup = autoUpdate(reference, floating, update, {
      ancestorScroll: true,
      ancestorResize: true,
      elementResize: true,
      layoutShift: true,
    });

    // do initial positioning immediately
    update();

    return () => cleanup();
  }, [open, triggerRef, contentContainerRef]);

  return (
    <Portal>
      <Presence
        present={open}
        animationName={{
          _open: "slide-from-top, fade-in",
          _closed: "slide-to-top, fade-out",
        }}
        animationDuration="moderate"
        pos={"absolute"}
        zIndex={10}
      >
        <CContainer
          ref={contentContainerRef}
          minW={"150px"}
          w={"fit"}
          bg={"body"}
          p={1}
          border={"1px solid"}
          borderColor={"border.muted"}
          rounded={themeConfig.radii.container}
          {...restProps}
        >
          {children}
        </CContainer>
      </Presence>
    </Portal>
  );
}
