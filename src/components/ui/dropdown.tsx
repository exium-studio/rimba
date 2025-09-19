"use client";

import { CContainer } from "@/components/ui/c-container";
import { useThemeConfig } from "@/context/useThemeConfig";
import useClickOutside from "@/hooks/useClickOutside";
import { Portal, Presence, StackProps, useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useRef } from "react";

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

export function DropdownContent(props: any) {
  // Props
  const { children, ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { open, onClose, triggerRef } = useDropdownCtx();

  // Refs
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Hooks
  useClickOutside([contentContainerRef], onClose);

  return (
    <Portal container={triggerRef}>
      <Presence
        present={open}
        animationName={{
          _open: "slide-from-top, fade-in",
          _closed: "slide-to-top, fade-out",
        }}
        animationDuration="moderate"
        pos={"absolute"}
      >
        <CContainer
          ref={contentContainerRef}
          minW={"150px"}
          bg={"body"}
          p={1}
          rounded={themeConfig.radii.container}
          mt={12}
          {...restProps}
        >
          {children}
        </CContainer>
      </Presence>
    </Portal>
  );
}
