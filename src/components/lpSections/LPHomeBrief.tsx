"use client";

import { CContainer } from "@/components/ui/c-container";
import { Demo } from "@/components/ui/demo";
import { P } from "@/components/ui/p";
import { StackProps } from "@chakra-ui/react";

export const LPHomeBrief = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <CContainer minH={"100dvh"} {...restProps}>
      <P></P>

      <Demo />
    </CContainer>
  );
};
