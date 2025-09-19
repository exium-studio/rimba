"use client";

import { Img } from "@/components/ui/img";
import { IMAGES_PATH } from "@/constants/paths";
import { HStack, StackProps } from "@chakra-ui/react";

export const PartnersLogo = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <HStack {...restProps}>
      <Img
        src={`${IMAGES_PATH}/atrbpn_logo.png`}
        alt="ATR BPN Logo"
        h={"20px"}
        w={"20px"}
      />
      <Img
        src={`${IMAGES_PATH}/unep_logo.png`}
        alt="UNEP Logo"
        h={"20px"}
        w={"20px"}
      />
      <Img
        src={`${IMAGES_PATH}/gef_logo.png`}
        alt="gef Logo"
        h={"20px"}
        w={"20px"}
      />
    </HStack>
  );
};
