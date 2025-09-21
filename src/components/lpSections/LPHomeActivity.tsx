"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { SimpleGrid, StackProps } from "@chakra-ui/react";
import { useRef } from "react";

export const LPHomeActivity = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const contents = useContents((s) => s.contents);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <LPSectionContainer ref={containerRef} py={"80px"} {...restProps}>
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.700"}
        textAlign={"center"}
      >
        {contents[24].content[lang]}
      </H2>

      <CContainer mt={"80px"}>
        <SimpleGrid columns={[1, null, 3]}></SimpleGrid>
      </CContainer>
    </LPSectionContainer>
  );
};
