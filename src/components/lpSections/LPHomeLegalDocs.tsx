"use client";

import { CContainer } from "@/components/ui/c-container";
import { StackProps } from "@chakra-ui/react";

export const LPHomeLegalDocs = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return <CContainer py={"80px"} {...restProps}></CContainer>;
};
