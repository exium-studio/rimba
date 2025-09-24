"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import { HStack, Image, SimpleGrid, StackProps } from "@chakra-ui/react";

export const LPHomePartners = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <LPSectionContainer
      py={"80px"}
      outerContainerProps={{
        bg: "bg.subtle",
      }}
      {...restProps}
    >
      <SimpleGrid columns={[1, null, 2]} gap={8}>
        <HStack gap={8}>
          <Image src={`${IMAGES_PATH}/atrbpn-logo.png`} h={"100px"} />
          <Image src={`${IMAGES_PATH}/gef-logo.png`} h={"100px"} />
          <Image src={`${IMAGES_PATH}/unep-logo.png`} h={"100px"} />
        </HStack>

        <CContainer>
          <H2 className="section_title" fontWeight={"bold"}></H2>
        </CContainer>
      </SimpleGrid>
    </LPSectionContainer>
  );
};
