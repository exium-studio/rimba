"use client";

import { CContainer } from "@/components/ui/c-container";
import { MAX_W_LP_SECTION_CONTAINER } from "@/constants/sizes";
import { StackProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export const LPSectionContainer = forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => {
    const { children, ...restProps } = props;

    return (
      <CContainer ref={ref} px={[4, null, 12]} overflow={"clip"} {...restProps}>
        <CContainer w="full" maxW={MAX_W_LP_SECTION_CONTAINER} mx="auto">
          {children}
        </CContainer>
      </CContainer>
    );
  }
);

LPSectionContainer.displayName = "LPSectionContainer";
