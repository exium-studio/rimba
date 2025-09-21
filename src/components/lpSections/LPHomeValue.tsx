"use client";

import { CContainer } from "@/components/ui/c-container";
import { HStack, StackProps } from "@chakra-ui/react";
import { useRef } from "react";

export const LPHomeValue = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <CContainer
      ref={containerRef}
      minH={"100lvh"}
      overflow={"clip"}
      {...restProps}
    >
      <CContainer className="overview_gallery">
        <HStack w={"max"}></HStack>
      </CContainer>
    </CContainer>
  );
};
