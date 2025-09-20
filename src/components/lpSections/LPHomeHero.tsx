"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { LogoImg } from "@/components/widget/LogoImg";
import { IMAGES_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { StackProps } from "@chakra-ui/react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroMinH = "100dvh";

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
          markers: true,
        },
      });

      tl.to(".hero_bush", {
        scale: 1.5,
        ease: "none",
      })
        .to(
          ".hero_bg",
          {
            scale: 1.1,
            ease: "none",
          },
          "<"
        )
        .to(
          ".hero_content",
          {
            opacity: 0,
            scale: 1.1,
            ease: "none",
          },
          "<"
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
        src={`${IMAGES_PATH}/hero_bg.jpg`}
        alt="forest"
        minH={HeroMinH}
        pos={"absolute"}
        zIndex={1}
      />

      <CContainer
        className="hero_content"
        flex={1}
        h={"100dvh"}
        gap={4}
        px={12}
        py={4}
        color={"light"}
        justify={"center"}
        align={"center"}
        zIndex={2}
      >
        <LogoImg h={"auto"} w={"full"} maxW={"320px"} mt={20} />

        <P fontSize={"xl"} textAlign={"center"}>
          {l.lp_hero_subtitle}
        </P>
      </CContainer>

      <Img
        className="hero_bush"
        src={`${IMAGES_PATH}/hero_bush_2.png`}
        alt="bush"
        minH={HeroMinH}
        pos={"absolute"}
        transform={"scale(1)"}
        zIndex={5}
      />

      <CContainer className="hero_content" p={4} align={"center"} zIndex={5}>
        <P color={"light"} textAlign={"center"} maxW={"320px"}>
          {l.lp_hero_description}
        </P>
      </CContainer>
    </CContainer>
  );
};
