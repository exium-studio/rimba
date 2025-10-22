"use client";

import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import { StackProps } from "@chakra-ui/react";

export const PartnersLogo = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <CContainer color={"orange.300"} {...restProps}>
      <P>Program Koridor</P>
      <P>{`Ekosistem <b>RIMBA</b>`}</P>
    </CContainer>

    // <HStack {...restProps}>
    //   <Img
    //     src={`${IMAGES_PATH}/atrbpn-logo.png`}
    //     alt="ATR BPN Logo"
    //     w={"auto"}
    //     h={restProps?.h || "30px"}
    //     aspectRatio={1}
    //     objectFit="contain"
    //   />
    //   <Img
    //     src={`${IMAGES_PATH}/unep-logo.png`}
    //     alt="UNEP Logo"
    //     w={"auto"}
    //     h={restProps?.h || "30px"}
    //     aspectRatio={1}
    //     objectFit="contain"
    //     ml={"6px"}
    //   />
    //   <Img
    //     src={`${IMAGES_PATH}/gef-logo.png`}
    //     alt="gef Logo"
    //     w={"auto"}
    //     h={restProps?.h || "30px"}
    //     aspectRatio={1}
    //     objectFit="contain"
    //   />
    // </HStack>
  );
};
