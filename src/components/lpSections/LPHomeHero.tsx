"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { RimbaLetterArt } from "@/components/widget/RimbaLetterArt";
import { Interface__Content } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import { Props__Img } from "@/constants/props";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { Box, Center, HStack, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const HeroMinH = "100dvh";

const GalleryImg = (props: Props__Img) => {
  // Props
  const { ...restProps } = props;

  // States
  const rotation = Math.random() * 6 - 3;

  return (
    <Center
      className="ss"
      h={"100%"}
      p={2}
      bg={"light"}
      border={"2px solid"}
      borderColor={"border.muted"}
      transform={`rotate(${rotation}deg)`}
    >
      <Img
        h={"100%"}
        aspectRatio={Math.random() < 0.5 ? 1 : 2}
        // transform={`rotate(${rotation}deg)`}
        {...restProps}
      />
    </Center>
  );
};
const OverviewGallery = (props: StackProps) => {
  // Contexts
  const staticContents = useContents((s) => s.staticContents);

  // States
  const galleryTop = [
    staticContents[5],
    staticContents[6],
    staticContents[7],
    staticContents[8],
    staticContents[9],
  ];
  const galleryBottom = [
    staticContents[10],
    staticContents[11],
    staticContents[12],
    staticContents[13],
    staticContents[14],
  ];

  return (
    <CContainer
      className="overview_gallery"
      h={"100dvh"}
      pb={"20px"}
      pos={"absolute"}
      justify={"center"}
      bgGradient={"to-b"}
      gradientFrom={"transparent"}
      gradientTo={"p.900"}
      {...props}
    >
      <CContainer h={"50%"}>
        <HStack
          className="overview_gallery_top"
          minW={"full"}
          w={"max"}
          h={"full"}
          gap={0}
        >
          {galleryTop.map((item: Interface__Content) => {
            return <GalleryImg key={item.content} src={item.content} />;
          })}
          {galleryTop.map((item: Interface__Content) => {
            return <GalleryImg key={item.content} src={item.content} />;
          })}
        </HStack>
      </CContainer>

      <CContainer h={"50%"} align={"end"}>
        <HStack
          className="overview_gallery_bottom"
          minW={"full"}
          w={"max"}
          h={"full"}
          gap={0}
        >
          {galleryBottom.map((item: Interface__Content) => {
            return <GalleryImg key={item.content} src={item.content} />;
          })}
          {galleryBottom.map((item: Interface__Content) => {
            return <GalleryImg key={item.content} src={item.content} />;
          })}
        </HStack>
      </CContainer>
    </CContainer>
  );
};

export const LPHomeHero = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + containerRef.current!.offsetHeight * 3,
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
          ".hero_brief_contents",
          {
            opacity: 1,
            ease: "none",
            duration: 2.5,
          },
          ">+0.2"
        )
        .to(
          ".hero_brief_line",
          {
            height: "100px",
            ease: "none",
            duration: 2.5,
          },
          ">"
        )
        .to(
          ".hero_brief",
          {
            opacity: 0,
            ease: "none",
            duration: 2.5,
          },
          ">"
        )
        .to(
          ".hero_brief_line",
          {
            opacity: 0,
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .from(
          ".overview_gallery",
          {
            bottom: "-120%",
            ease: "none",
            duration: 10,
            delay: 0.2,
          },
          "<"
        )
        .to(
          ".overview_gallery_top",
          {
            x: "-40%",
            ease: "none",
            duration: 20,
          },
          ">"
        )
        .to(
          ".overview_gallery_bottom",
          {
            x: "40%",
            ease: "none",
            duration: 20,
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  return (
    <CContainer
      ref={containerRef}
      h={HeroMinH}
      pos={"relative"}
      bg={"p.900"}
      overflow={"clip"}
      {...restProps}
    >
      <Img
        className="hero_bg"
        src={`${IMAGES_PATH}/lp/home/hero-bg.jpg`}
        alt="forest"
        h={HeroMinH}
        pos={"absolute"}
        zIndex={1}
      />

      <CContainer
        flex={1}
        h={HeroMinH}
        gap={4}
        px={"60px"}
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
          mt={"60px"}
          lineHeight={1.2}
        >
          {l.lp_hero_subtitle}
        </P>

        <RimbaLetterArt
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
            className="hero_brief_contents"
            h={HeroMinH}
            align={"center"}
            bg={"blackAlpha.800"}
            color={"light"}
            p={4}
            opacity={0}
            pos={"relative"}
            justify={"center"}
          >
            <P
              className="hero_brief"
              fontSize={"xl"}
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
        src={`${IMAGES_PATH}/lp/home/hero-bush.png`}
        alt="bush"
        h={HeroMinH}
        pos={"absolute"}
        pointerEvents={"none"}
        zIndex={5}
      />

      <CContainer className="hero_content" p={4} align={"center"} zIndex={5}>
        <P maxW={"320px"} color={"light"} textAlign={"center"} opacity={0.6}>
          {l.lp_hero_description}
        </P>
      </CContainer>

      <OverviewGallery zIndex={6} />
    </CContainer>
  );
};
