"use client";

import { CContainer } from "@/components/ui/c-container";
import { StackProps } from "@chakra-ui/react";

export const LPHomeBrief = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return <CContainer {...restProps}></CContainer>;
};
