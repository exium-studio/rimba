"use client";

import {
  Popover as ChakraPopover,
  PopoverRootProps,
  Portal,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { CloseButton } from "./close-button";
import { useThemeConfig } from "@/context/useThemeConfig";
import { CContainer } from "@/components/ui/c-container";

interface PopoverContentProps extends ChakraPopover.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
}

export const PopoverRoot = (props: PopoverRootProps) => {
  const { children, ...restProps } = props;

  return (
    <ChakraPopover.Root autoFocus={false} {...restProps}>
      {children}
    </ChakraPopover.Root>
  );
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(props, ref) {
    // Contexts
    const { themeConfig } = useThemeConfig();
    const { children, portalled = true, portalRef, ...restProps } = props;

    return (
      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            ref={ref}
            p={"0!important"}
            bg={"d1"}
            border={"1px solid"}
            borderColor={"d1"}
            rounded={themeConfig.radii.container}
            shadow={"none"}
            className="ss"
            {...restProps}
          >
            <CContainer
              flex={1}
              p={4}
              bg={"body"}
              rounded={themeConfig.radii.container}
            >
              {children}
            </CContainer>
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    );
  }
);

export const PopoverArrow = forwardRef<
  HTMLDivElement,
  ChakraPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopover.Arrow ref={ref}>
      <ChakraPopover.ArrowTip
        bg={"body !important"}
        // backdropFilter={"blur(5px)"}
        // bg={"darktrans !important"}
        // borderColor={"transparent"}
        {...props}
      />
    </ChakraPopover.Arrow>
  );
});

export const PopoverCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopover.CloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ChakraPopover.CloseTrigger>
  );
});

export const PopoverTitle = ChakraPopover.Title;
export const PopoverDescription = ChakraPopover.Description;
export const PopoverFooter = ChakraPopover.Footer;
export const PopoverHeader = ChakraPopover.Header;
export const PopoverBody = ChakraPopover.Body;
export const PopoverTrigger = ChakraPopover.Trigger;
