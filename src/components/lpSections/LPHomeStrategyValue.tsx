"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { Circle, HStack, Icon, StackProps } from "@chakra-ui/react";
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
          <P fontSize={"lg"} fontWeight={"semibold"}>
            {value.title}
          </P>

          <P opacity={0.8}>{value.description}</P>
        </CContainer>

        <Circle bg={"p.700"} p={2}>
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
  const contentsRef = useRef<HTMLDivElement>(null);

  // States
  const values = [
    {
      title: staticContents[18].content[lang],
      description: staticContents[19].content[lang],
      icon: IconCoin,
    },
    {
      title: staticContents[20].content[lang],
      description: staticContents[21].content[lang],
      icon: IconHeartHandshake,
    },
    {
      title: staticContents[22].content[lang],
      description: staticContents[23].content[lang],
      icon: IconCalendar,
    },
  ];

  // Anmation
  useGSAP(
    () => {
      gsap.from(".section_title", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });

      gsap.from(".strategy_value_content_1", {
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentsRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });

      gsap.from(".strategy_value_content_2", {
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentsRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
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
      pb={0}
      bg={"p.900"}
      bgImage={`url(${IMAGES_PATH}/lp/home/strategy-value-bg.png)`}
      bgPos={"top"}
      bgSize={"cover"}
      color={"light"}
      mt={"-1px"}
      {...restProps}
    >
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.200"}
        textAlign={"center"}
      >
        {staticContents[15].content[lang]}
      </H2>

      <CContainer mt={"80px"} pos={"relative"}>
        <HStack
          ref={contentsRef}
          wrap={"wrap"}
          justify={"center"}
          gapX={"80px"}
          gapY={0}
          zIndex={2}
          // align={"stretch"}
        >
          <CContainer
            className={"strategy_value_content_1"}
            flex={"0 1 330px"}
            h={"580px"}
            overflow={"clip"}
            aspectRatio={1 / 2}
            pos={"relative"}
            px={2}
          >
            {/* iphone mockup */}
            <Img
              src={`${IMAGES_PATH}/iphone-frame.png`}
              alt="iphone mockup"
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
                  mb={"58px"}
                  pos={"relative"}
                >
                  <HStack w={"full"} justify={"space-between"} p={4}>
                    <P fontSize={"lg"} fontWeight={"medium"}>
                      {staticContents[16].content[lang]}
                    </P>
                  </HStack>

                  <CContainer className="scrollY" flex={1} p={4}>
                    <P>{staticContents[17].content[lang]}</P>
                  </CContainer>

                  <HStack justify={"end"} p={3} mt={"auto"}>
                    <NavLink to="/about-us/rimba-corridor-program" w={"fit"}>
                      <Btn
                        colorPalette={"p"}
                        variant={"ghost"}
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
            className="strategy_value_content_2"
            flex={"0 1 450px"}
            gap={8}
            pb={["80px", null, 0]}
            minH={"full"}
            zIndex={2}
          >
            <CContainer gap={6} zIndex={2}>
              {values.map((value) => {
                return <ValueItem key={value.title} value={value} />;
              })}
            </CContainer>
          </CContainer>
        </HStack>

        <Img
          className="compass"
          src={`${IMAGES_PATH}/compass.png`}
          alt="compass"
          aspectRatio={1}
          h={"500px"}
          objectFit="contain"
          opacity={0.2}
          pos={"absolute"}
          bottom={"-250px"}
          right={0}
          zIndex={1}
        />
      </CContainer>
    </LPSectionContainer>
  );
};
