"use client";

import { CContainer } from "@/components/ui/c-container";
import { MAX_W_LP_SECTION_CONTAINER } from "@/constants/sizes";
import { StackProps } from "@chakra-ui/react";

export const LPSectionContainer = (props: StackProps) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <CContainer
      w={"full"}
      maxW={MAX_W_LP_SECTION_CONTAINER}
      mx={"auto"}
      {...restProps}
    >
      {children}
    </CContainer>
  );
};
