"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { LogoImg } from "@/components/widget/LogoImg";
import { IMAGES_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { StackProps } from "@chakra-ui/react";

const HeroMinH = "100dvh";

export const LPHomeHero = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  return (
    <CContainer
      minH={HeroMinH}
      pos={"relative"}
      overflow={"clip"}
      {...restProps}
    >
      <Img
        src={`${IMAGES_PATH}/hero_bg.jpg`}
        alt="forest"
        minH={HeroMinH}
        pos={"absolute"}
        zIndex={1}
      />

      <CContainer
        id="hero_lettering_container"
        flex={1}
        gap={4}
        p={4}
        color={"light"}
        justify={"center"}
        align={"center"}
        mt={"96px"}
        zIndex={2}
      >
        <LogoImg />

        <P fontSize={"xl"} textAlign={"center"}>
          {l.lp_hero_subtitle}
        </P>
      </CContainer>

      <Img
        src={`${IMAGES_PATH}/hero_bush_2.png`}
        alt="bush"
        minH={HeroMinH}
        pos={"absolute"}
        transform={"scale(1)"}
        zIndex={3}
      />

      <CContainer p={4} align={"center"}>
        <P
          color={"light"}
          textAlign={"center"}
          zIndex={4}
          maxW={"320px"}
          opacity={0.8}
        >
          {l.lp_hero_description}
        </P>
      </CContainer>
    </CContainer>
  );
};
