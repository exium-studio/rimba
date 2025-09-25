"use client";

import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { RimbaLetterArt } from "@/components/widget/RimbaLetterArt";
import { Interface_CMSContent } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { Box, HStack, Icon, Stack, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconChevronDown } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const HeroH = "100vh";
const HeroW = "100vw";

const GalleryImg = (props: any) => {
  // Props
  const { content, ...restProps } = props;

  // States
  const rotation = Math.random() * 6 - 3;

  return (
    <EditableContentContainer
      content={content}
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
        alt="nature"
        src={content?.content}
        // transform={`rotate(${rotation}deg)`}
        {...restProps}
      />
    </EditableContentContainer>
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
      h={HeroH}
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
          {galleryTop.map((content: Interface_CMSContent) => {
            return <GalleryImg key={content?.content} content={content} />;
          })}
          {galleryTop.map((content: Interface_CMSContent) => {
            return <GalleryImg key={content?.content} content={content} />;
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
          {galleryBottom.map((content: Interface_CMSContent) => {
            return <GalleryImg key={content?.content} content={content} />;
          })}
          {galleryBottom.map((content: Interface_CMSContent) => {
            return <GalleryImg key={content?.content} content={content} />;
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
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.to(".hero_chevron_down", {
        y: 20,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + containerRef.current!.offsetHeight * 6,
          scrub: true,
          pin: true,
          pinSpacing: true,
          // markers: true, // debug
        },
      });

      tl.fromTo(
        ".hero_bush",
        {
          scale: 1.5,
          ease: "none",
          duration: 2.5,
        },
        {
          scale: 3,
          ease: "none",
          duration: 2.5,
        }
      )
        .to(
          ".hero_bush_2",
          {
            scale: 1.8,
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
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
          ".hero_content_1",
          {
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .to(
          ".hero_content_2",
          {
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .to(
          ".hero_container",
          {
            opacity: 0,
            ease: "none",
            duration: 2.5,
          },
          ">"
        )
        .to(
          ".hero_chevron_down",
          {
            opacity: 0,
            ease: "none",
            duration: 2.5,
          },
          "<"
        )
        .to(
          ".hero_brief_container",
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
          ".hero_brief_content",
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
            duration: 5,
            delay: 0.2,
          },
          "<"
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
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <CContainer
      ref={containerRef}
      h={HeroH}
      pos={"relative"}
      bg={"p.900"}
      overflow={"clip"}
      {...restProps}
    >
      <Img
        className="hero_bg"
        src={`${IMAGES_PATH}/lp/home/hero-bg.jpg`}
        alt="forest"
        h={HeroH}
        pos={"absolute"}
        imageProps={{
          unoptimized: true,
        }}
        zIndex={1}
      />

      <Img
        className="hero_bush_2"
        src={`${IMAGES_PATH}/lp/home/hero-bush.png`}
        alt="bush"
        h={HeroH}
        pos={"absolute"}
        pointerEvents={"none"}
        zIndex={4}
      />

      <CContainer h={HeroH} w={HeroW} pos={"absolute"}>
        <Stack
          className="hero_container"
          h={`calc(${HeroH} - 72px)`}
          flexDir={["column", null, "row"]}
          flex={1}
          gap={12}
          justify={"center"}
          p={[8, null, 20]}
          color={"light"}
          zIndex={5}
        >
          <CContainer
            className="hero_content_1"
            maxW={["220px", null, "320px"]}
            gap={4}
            mt={"auto"}
            ml={[0, null, "12px"]}
            mr={"auto"}
          >
            <EditableContentContainer
              content={staticContents[2]}
              h={"auto"}
              w={"full"}
            >
              <RimbaLetterArt src={staticContents[2]?.content} />
            </EditableContentContainer>
          </CContainer>

          <CContainer
            className="hero_content_2"
            maxW={"320px"}
            gap={4}
            mt={[0, null, "auto"]}
          >
            <EditableContentContainer content={staticContents[1]}>
              <P
                fontSize={["lg", null, "xl"]}
                fontWeight={"medium"}
                lineHeight={1.2}
              >
                {staticContents[1]?.content[lang]}
              </P>
            </EditableContentContainer>

            <EditableContentContainer content={staticContents[3]}>
              <P color={"light"} opacity={0.8}>
                {staticContents[3]?.content[lang]}
              </P>
            </EditableContentContainer>
          </CContainer>
        </Stack>

        <Icon
          className="hero_chevron_down"
          boxSize={5}
          color={"light"}
          opacity={0.8}
          mb={4}
          mx={"auto"}
          zIndex={6}
        >
          <IconChevronDown />
        </Icon>
      </CContainer>

      <CContainer
        position={"absolute"}
        top={"50%"}
        transform={"translateY(-50%)"}
        zIndex={6}
      >
        <CContainer
          className="hero_brief_container"
          h={HeroH}
          align={"center"}
          bg={"blackAlpha.800"}
          color={"light"}
          p={8}
          opacity={0}
          pos={"relative"}
          justify={"center"}
        >
          <EditableContentContainer content={staticContents[4]}>
            <P
              className="hero_brief_content"
              fontSize={"18px"}
              textAlign={"center"}
              maxW={"600px"}
              // zIndex={2}
            >
              {staticContents[4]?.content[lang]}
            </P>
          </EditableContentContainer>

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

      <Img
        className="hero_bush"
        src={`${IMAGES_PATH}/lp/home/hero-bush.png`}
        alt="bush"
        h={HeroH}
        pos={"absolute"}
        pointerEvents={"none"}
        zIndex={5}
      />

      <OverviewGallery zIndex={6} />
    </CContainer>
  );
};
