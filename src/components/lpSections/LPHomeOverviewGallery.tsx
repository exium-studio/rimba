"use client";

import { CContainer } from "@/components/ui/c-container";
import { HStack, StackProps } from "@chakra-ui/react";

export const LPHomeOverviewGallery = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <CContainer minH={"100lvh"} overflow={"clip"} {...restProps}>
      <CContainer>
        <HStack w={"max"}></HStack>
      </CContainer>
    </CContainer>
  );
};
