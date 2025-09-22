"use client";

import { CContainer } from "@/components/ui/c-container";
import { StackProps } from "@chakra-ui/react";

export const LPHomeLocation = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return <CContainer minH={"100vh"} bg={"light"} {...restProps}></CContainer>;
};
