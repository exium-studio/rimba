"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { LogoImg } from "@/components/widget/LogoImg";
import { IMAGES_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { Box, StackProps } from "@chakra-ui/react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroMinH = "100lvh";

export const LPHomeHero = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom",
          scrub: true,
          pin: true,
          pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.to(".hero_bush", {
        scale: 1.8,
        ease: "none",
        duration: 2.5,
      })
        .to(
          ".hero_bg",
          {
            scale: 1.3,
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .to(
          ".hero_content",
          {
            opacity: 0,
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .to(
          ".hero_brief",
          {
            opacity: 1,
            ease: "none",
            delay: 0.2,
            duration: 2.5,
          },
          ">"
        )
        .to(
          ".hero_brief_line",
          {
            height: "100px",
            ease: "none",
            duration: 2.5,
          },
          ">"
        );
    },
    { scope: containerRef }
  );

  return (
    <CContainer
      ref={containerRef}
      minH={HeroMinH}
      pos={"relative"}
      overflow={"clip"}
      {...restProps}
    >
      <Img
        className="hero_bg"
        src={`${IMAGES_PATH}/hero_bg2.png`}
        alt="forest"
        minH={HeroMinH}
        pos={"absolute"}
        zIndex={1}
      />

      <CContainer
        flex={1}
        h={HeroMinH}
        gap={4}
        px={12}
        py={4}
        color={"light"}
        justify={"center"}
        align={"center"}
        zIndex={2}
      >
        <P
          className="hero_content"
          fontSize={"xl"}
          textAlign={"center"}
          letterSpacing={"1px"}
          mt={"60px"}
        >
          {l.lp_hero_subtitle}
        </P>

        <LogoImg
          className="hero_content"
          h={"auto"}
          w={"full"}
          maxW={"320px"}
        />

        <CContainer
          position={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
        >
          <CContainer
            className="hero_brief"
            h={HeroMinH}
            align={"center"}
            bg={"blackAlpha.600"}
            p={4}
            opacity={0}
            pos={"relative"}
            justify={"center"}
          >
            <P
              fontSize={"xl"}
              fontWeight={"medium"}
              color={"light"}
              textAlign={"center"}
              maxW={"600px"}
              zIndex={5}
            >
              {l.lp_hero_brief}
            </P>

            <Box
              className="hero_brief_line"
              bg={"light"}
              opacity={0.5}
              w={"2px"}
              h={"0"}
              pos={"absolute"}
              bottom={"50px"}
              zIndex={5}
            />
          </CContainer>
        </CContainer>
      </CContainer>

      <Img
        className="hero_bush"
        src={`${IMAGES_PATH}/hero_bush_2.png`}
        alt="bush"
        minH={HeroMinH}
        pos={"absolute"}
        zIndex={5}
      />

      <CContainer className="hero_content" p={4} align={"center"} zIndex={5}>
        <P maxW={"320px"} color={"light"} textAlign={"center"} opacity={0.6}>
          {l.lp_hero_description}
        </P>
      </CContainer>
    </CContainer>
  );
};
