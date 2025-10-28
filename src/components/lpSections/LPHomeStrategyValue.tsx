"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { Circle, HStack, Icon, Stack, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCalendar,
  IconCoin,
  IconHeartHandshake,
} from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const ValueItem = (props: any) => {
  // Props
  const { value, ...restProps } = props;

  // Contexts
  const { lang } = useLang();

  return (
    <CContainer
      className="value_item ss"
      bg={"blackAlpha.500"}
      color={"light"}
      backdropFilter={"blur(5px)"}
      border={"1px solid"}
      borderColor={"d1"}
      p={5}
      rounded={"3xl"}
      {...restProps}
    >
      <HStack align={"start"} gap={6}>
        <CContainer gap={4}>
          <EditableContentContainer content={value.titleContent}>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {value.titleContent?.content[lang]}
            </P>
          </EditableContentContainer>

          <EditableContentContainer content={value.descriptionContent}>
            <P opacity={0.8}>{value.descriptionContent?.content[lang]}</P>
          </EditableContentContainer>
        </CContainer>

        <Circle bg={"p.500"} p={2}>
          <Icon boxSize={6} color={"light"}>
            <value.icon stroke={1.5} />
          </Icon>
        </Circle>
      </HStack>
    </CContainer>
  );
};

export const LPHomeStrategyValue = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);

  // States
  const values = [
    {
      titleContent: staticContents[18],
      descriptionContent: staticContents[19],
      icon: IconCoin,
    },
    {
      titleContent: staticContents[20],
      descriptionContent: staticContents[21],
      icon: IconHeartHandshake,
    },
    {
      titleContent: staticContents[22],
      descriptionContent: staticContents[23],
      icon: IconCalendar,
    },
  ];

  // Anmation
  useGSAP(
    () => {
      gsap.from(".section_title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_1", {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_2", {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.to(".compass", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <LPSectionContainer
      ref={containerRef}
      pt={"100px"}
      pb={["60px", null, 0]}
      bgPos={"top"}
      bgSize={"cover"}
      color={"light"}
      mt={"-4px"}
      outerContainerProps={{
        bg: "p.900",
        bgImage: `url(${IMAGES_PATH}/lp/home/strategy-value-bg.png)`,
      }}
      overflow={"clip"}
      {...restProps}
    >
      <EditableContentContainer content={staticContents[15]} mx={"auto"}>
        <H2
          className="section_title"
          fontWeight={"bold"}
          color={"p.200"}
          textAlign={"center"}
        >
          {staticContents[15]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <CContainer mt={"80px"} pos={"relative"}>
        <Stack
          ref={mainContentsRef}
          flexDir={iss ? "column" : "row"}
          justify={"center"}
          gapX={"80px"}
          gapY={0}
          zIndex={2}
          // align={"stretch"}
        >
          {/* iphone mockup */}
          <CContainer
            className={"content_1"}
            flex={"0 1 330px"}
            maxW={"330px"}
            mx={["auto", null, 0]}
            h={"580px"}
            overflow={"clip"}
            aspectRatio={1 / 2}
            pos={"relative"}
            px={2}
          >
            <Img
              src={`${IMAGES_PATH}/iphone-frame.png`}
              alt="iphone mockup"
              w={"full"}
              aspectRatio={1 / 2}
              pointerEvents={"none"}
              pos={"absolute"}
              top={0}
              left={0}
              zIndex={2}
            />

            <CContainer
              flex={1}
              p={3}
              bg={"light"}
              bgSize={"cover"}
              rounded={"60px"}
              aspectRatio={1 / 2}
            >
              <CContainer flex={1} overflow={"clip"} p={3} mt={"64px"}>
                <CContainer
                  flex={1}
                  bg={"light"}
                  color={"dark"}
                  rounded={"3xl"}
                  overflowY={"auto"}
                  mb={"42px"}
                  pos={"relative"}
                >
                  <HStack w={"full"} justify={"space-between"} p={4}>
                    <EditableContentContainer content={staticContents[16]}>
                      <P fontSize={"xl"} fontWeight={"semibold"}>
                        {staticContents[16]?.content[lang]}
                      </P>
                    </EditableContentContainer>
                  </HStack>

                  <CContainer className="scrollY" flex={1} p={4}>
                    <EditableContentContainer content={staticContents[17]}>
                      <P>{staticContents[17]?.content[lang]}</P>
                    </EditableContentContainer>
                  </CContainer>

                  <HStack justify={"end"} p={3} mt={"auto"}>
                    <NavLink to="/about-us/rimba-corridor-program" w={"fit"}>
                      <Btn
                        colorPalette={"p"}
                        variant={"outline"}
                        size={"md"}
                        pr={3}
                      >
                        {l.learn_more}

                        <Icon boxSize={5}>
                          <IconArrowUpRight stroke={1.5} />
                        </Icon>
                      </Btn>
                    </NavLink>
                  </HStack>
                </CContainer>
              </CContainer>
            </CContainer>
          </CContainer>

          <CContainer
            className="content_2"
            flex={"0 1 450px"}
            gap={8}
            minH={"max"}
            justify={["", null, "center"]}
            zIndex={2}
            pt={[0, null, "80px"]}
            pb={"80px"}
          >
            <CContainer gap={6} zIndex={2}>
              {values.map((value, idx) => {
                return <ValueItem key={idx} value={value} />;
              })}
            </CContainer>
          </CContainer>
        </Stack>

        <Img
          className={"compass"}
          src={`${IMAGES_PATH}/compass.png`}
          pos={"absolute"}
          alt={"compass"}
          aspectRatio={1}
          w={["100%", null, "40%"]}
          objectFit={"contain"}
          opacity={0.2}
          bottom={"-250px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          zIndex={1}
        />
      </CContainer>
    </LPSectionContainer>
  );
};
