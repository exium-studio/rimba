"use client";

import { CContainer } from "@/components/ui/c-container";
import { MAX_W_LP_SECTION_CONTAINER } from "@/constants/sizes";
import { StackProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface Props__LPSectionContainer extends StackProps {
  outerContainerProps?: StackProps;
}

export const LPSectionContainer = forwardRef<
  HTMLDivElement,
  Props__LPSectionContainer
>((props, ref) => {
  const { children, outerContainerProps, ...restProps } = props;

  return (
    <CContainer ref={ref} px={[4, null, 12]} {...outerContainerProps}>
      <CContainer
        w="full"
        maxW={MAX_W_LP_SECTION_CONTAINER}
        mx="auto"
        {...restProps}
      >
        {children}
      </CContainer>
    </CContainer>
  );
});

LPSectionContainer.displayName = "LPSectionContainer";
