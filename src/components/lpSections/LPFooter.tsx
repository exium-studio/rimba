"use client";

import { CContainer } from "@/components/ui/c-container";
import { IMAGES_PATH } from "@/constants/paths";
import { StackProps } from "@chakra-ui/react";

export const LPFooter = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <CContainer
      minH={"500px"}
      bg={"p.900"}
      bgImage={`url(${IMAGES_PATH}/lp/footer-bg.png)`}
      zIndex={1}
      {...restProps}
    ></CContainer>
  );
};
