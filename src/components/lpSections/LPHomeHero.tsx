"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { LogoImg } from "@/components/widget/LogoImg";
import { Interface__Content } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import { Props__Img } from "@/constants/props";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { Box, HStack, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const HeroMinH = "100lvh";

const GalleryImg = (props: Props__Img) => {
  // Props
  const { ...restProps } = props;

  return (
    <Img h={"100%"} aspectRatio={Math.random() < 0.5 ? 1 : 2} {...restProps} />
  );
};
const OverviewGallery = () => {
  // Contexts
  const contents = useContents((s) => s.contents);

  // States
  const galleryTop = [
    contents[5],
    contents[6],
    contents[7],
    contents[8],
    contents[9],
  ];
  const galleryBottom = [
    contents[10],
    contents[11],
    contents[12],
    contents[13],
    contents[14],
  ];

  return (
    <CContainer
      className="overview_gallery"
      h={"100lvh"}
      bg={"p.900"}
      pos={"absolute"}
      justify={"center"}
      zIndex={6}
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
          end: "bottom+=2000",
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
        .from(
          ".overview_gallery",
          {
            bottom: "-100%",
            ease: "none",
            duration: 2.5,
          },
          ">"
        )
        .to(
          ".overview_gallery_top",
          {
            x: "-40%",
            ease: "none",
            duration: 10,
          },
          ">"
        )
        .to(
          ".overview_gallery_bottom",
          {
            x: "40%",
            ease: "none",
            duration: 10,
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
      bg={"p.900"}
      {...restProps}
    >
      <Img
        className="hero_bg"
        src={`${IMAGES_PATH}/lp/home/hero_bg.jpg`}
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
            bg={"blackAlpha.700"}
            color={"light"}
            p={4}
            opacity={0}
            pos={"relative"}
            justify={"center"}
          >
            <P
              fontSize={"lg"}
              // fontWeight={"medium"}
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
        src={`${IMAGES_PATH}/lp/home/hero_bush.png`}
        alt="bush"
        minH={HeroMinH}
        pos={"absolute"}
        pointerEvents={"none"}
        zIndex={5}
      />

      <CContainer className="hero_content" p={4} align={"center"} zIndex={5}>
        <P maxW={"320px"} color={"light"} textAlign={"center"} opacity={0.6}>
          {l.lp_hero_description}
        </P>
      </CContainer>

      <OverviewGallery />
    </CContainer>
  );
};
