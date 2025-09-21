"use client";

import { CContainer } from "@/components/ui/c-container";
import { HStack, StackProps } from "@chakra-ui/react";
import { useRef } from "react";

export const LPHomeOverviewGallery = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CContainer
      ref={containerRef}
      minH={"100lvh"}
      overflow={"clip"}
      bg={"red"}
      {...restProps}
    >
      <CContainer className="overview_gallery">
        <HStack w={"max"}></HStack>
      </CContainer>
    </CContainer>
  );
};
