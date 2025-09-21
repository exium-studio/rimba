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
import { Circle, HStack, Icon, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  IconArrowUpRight,
  IconCalendar,
  IconCoin,
  IconHeartHandshake,
  IconX,
} from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const ValueItem = (props: any) => {
  // Props
  const { value, ...restProps } = props;

  return (
    <CContainer
      className="value_item ss"
      bg={"light"}
      color={"dark"}
      border={"1px solid"}
      borderColor={"d1"}
      p={5}
      rounded={"2xl"}
      {...restProps}
    >
      <HStack align={"start"} gap={6}>
        <CContainer gap={4}>
          <P fontSize={"lg"} fontWeight={"semibold"}>
            {value.title}
          </P>

          <P>{value.description}</P>
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
  const contents = useContents((s) => s.contents);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);

  // States
  const values = [
    {
      title: contents[18].content[lang],
      description: contents[19].content[lang],
      icon: IconCoin,
    },
    {
      title: contents[20].content[lang],
      description: contents[21].content[lang],
      icon: IconHeartHandshake,
    },
    {
      title: contents[22].content[lang],
      description: contents[23].content[lang],
      icon: IconCalendar,
    },
  ];

  // Anmation
  useGSAP(
    () => {
      gsap.to(".compass", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });

      gsap.from(".section_title", {
        y: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });

      gsap.from(".strategy_value_content_1", {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentsRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });

      gsap.from(".strategy_value_content_2", {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentsRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <LPSectionContainer
      ref={containerRef}
      pt={"100px"}
      pb={0}
      bg={"p.900"}
      color={"light"}
      {...restProps}
    >
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.200"}
        textAlign={"center"}
      >
        {contents[15].content[lang]}
      </H2>

      <CContainer mt={"80px"} pos={"relative"}>
        <HStack
          ref={contentsRef}
          wrap={"wrap"}
          justify={"center"}
          gapX={"80px"}
          zIndex={2}
          // align={"stretch"}
        >
          <CContainer
            className={"strategy_value_content_1"}
            flex={"0 1 350px"}
            aspectRatio={1 / 2}
            pos={"relative"}
            px={2}
            mb={"-100px"}
          >
            {/* iphone frame */}
            <Img
              src={`${IMAGES_PATH}/iphone_frame.png`}
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
              bg={"p.500"}
              bgImage={`url(${IMAGES_PATH}/lp/home/strategy_value_phone_header.png)`}
              bgSize={"cover"}
              rounded={"60px"}
              aspectRatio={1 / 2}
            >
              <CContainer flex={1} overflow={"clip"} p={3} mt={"64px"}>
                <CContainer
                  bg={"light"}
                  color={"dark"}
                  rounded={"2xl"}
                  overflowY={"auto"}
                  mb={"80px"}
                  pos={"relative"}
                >
                  <HStack w={"full"} justify={"space-between"} p={4}>
                    <P fontSize={"lg"} fontWeight={"medium"}>
                      {contents[16].content[lang]}
                    </P>

                    <Icon boxSize={5}>
                      <IconX />
                    </Icon>
                  </HStack>

                  <CContainer className="scrollY" p={4}>
                    <P>{contents[17].content[lang]}</P>
                  </CContainer>

                  <HStack justify={"end"} p={3}>
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
            <CContainer gap={8} zIndex={2}>
              {values.map((value) => {
                return <ValueItem key={value.title} value={value} />;
              })}
            </CContainer>
          </CContainer>
        </HStack>

        <Img
          className="compass"
          src={`${IMAGES_PATH}/compass.png`}
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
