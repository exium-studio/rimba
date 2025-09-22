"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { SVGS_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { Box, HStack, Icon, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconMapPin2, IconWorld } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const LOCATION_LIST = [
  {
    province: "Riau",
    list: ["Kampar", "Kuantan Singing", "Indagri Hulu", "Indagri Hilir"],
  },
  {
    province: "Sumatra Barat",
    list: ["Kampar", "Kuantan Singing", "Indagri Hulu", "Indagri Hilir"],
  },
  {
    province: "Jambi",
    list: ["Kampar", "Kuantan Singing", "Indagri Hulu", "Indagri Hilir"],
  },
];

const MapInfo = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <CContainer w={"fit"} {...restProps}>
      <HStack gap={4}>
        <Icon boxSize={8}>
          <IconWorld stroke={1.5} />
        </Icon>

        <CContainer>
          <P>Luas Kawasan</P>
          <P fontSize={"lg"} fontWeight={"semibold"}>
            3.8 Juta Ha
          </P>
        </CContainer>
      </HStack>

      <HStack gap={4}>
        <Icon boxSize={8}>
          <IconMapPin2 stroke={1.5} />
        </Icon>

        <CContainer>
          <P>Kawasan Lindung</P>
          <P fontSize={"lg"} fontWeight={"semibold"}>
            9 Area Unit Pengelolaan
          </P>
        </CContainer>
      </HStack>
    </CContainer>
  );
};
const LocationListItem = (props: any) => {
  // Props
  const { location, number, legendColor, ...restProps } = props;

  return (
    <CContainer
      id={`location_${number}`}
      className="ss"
      p={3}
      pl={2}
      bg={"light"}
      rounded={"xl"}
      minW={"240px"}
      border={"1px solid"}
      borderColor={"d1"}
      pos={"relative"}
      {...restProps}
    >
      <HStack align={"start"} gap={4}>
        <Box bg={legendColor} w={"6px"} h={"full"} rounded={"full"} />

        <CContainer>
          <HStack justify={"space-between"}>
            <P fontSize={"lg"} fontWeight={"medium"}>
              {location.province}
            </P>
          </HStack>

          <CContainer mt={2} gap={1}>
            {location.list.map((item: string, idx: number) => {
              return (
                <HStack key={`${idx}-${item}`}>
                  <DotIndicator ml={0} color={"dark"} />

                  <P>{item}</P>
                </HStack>
              );
            })}
          </CContainer>
        </CContainer>
      </HStack>

      <P
        fontSize={"4xl"}
        fontWeight={"bold"}
        pos={"absolute"}
        bottom={0}
        right={4}
        opacity={0.1}
      >{`${number}`}</P>
    </CContainer>
  );
};

export const LPHomeLocation = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.to(".sumatra-map", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: () => "bottom 80%",
          scrub: true,
        },
        y: "100px",
        ease: "none",
      });

      gsap.from("#location_1", {
        scrollTrigger: {
          trigger: "#location_1",
          start: "top 80%",
          end: () => "bottom 80%",
        },
        y: "50%",
        opacity: 0,
        duration: 1,
      });

      gsap.from("#location_2", {
        scrollTrigger: {
          trigger: "#location_2",
          start: "top 80%",
          end: () => "bottom 80%",
        },
        y: "50%",
        opacity: 0,
        duration: 1,
      });

      gsap.from("#location_3", {
        scrollTrigger: {
          trigger: "#location_3",
          start: "top 80%",
          end: () => "bottom 80%",
        },
        y: "50%",
        opacity: 0,
        duration: 1,
      });
    },
    { scope: containerRef }
  );

  return (
    <CContainer
      ref={containerRef}
      minH={"100vh"}
      bg={"light"}
      py={"80px"}
      pos={"relative"}
      {...restProps}
    >
      <LPSectionContainer flex={1} justify={"center"}>
        <H2
          className="section_title"
          fontWeight={"bold"}
          color={"p.700"}
          textAlign={"center"}
        >
          {staticContents[27].content[lang]}
        </H2>

        <CContainer
          h={"70vh"}
          w={"80%"}
          aspectRatio={1}
          bg={"p.100"}
          mt={"80px"}
          mx={"auto"}
        >
          <CContainer flex={1} gap={4} p={8} color={"p.700"}>
            <MapInfo ml={"auto"} />

            <Img
              src={`${SVGS_PATH}/sumatra-scale.svg`}
              aspectRatio={1}
              w={"150px"}
              objectFit="contain"
              opacity={0.3}
              mt={"auto"}
              ml={"auto"}
              mb={-3}
            />
          </CContainer>
        </CContainer>
      </LPSectionContainer>

      {/* Location list */}
      <LPSectionContainer
        minH={"70vh"}
        pos={"absolute"}
        top={"calc(50% + 64px)"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        wrapperProps={{
          flex: 1,
        }}
        zIndex={2}
      >
        <HStack
          flex={1}
          w={"full"}
          align={"stretch"}
          p={8}
          justify={"space-between"}
        >
          <CContainer w={"fit"} justify={"space-between"} gap={8}>
            <LocationListItem
              location={LOCATION_LIST[0]}
              number={1}
              legendColor={"p.500"}
            />

            <LocationListItem
              location={LOCATION_LIST[1]}
              number={2}
              legendColor={"p.400"}
            />
          </CContainer>

          <CContainer w={"fit"} justify={"center"}>
            <LocationListItem
              location={LOCATION_LIST[2]}
              number={3}
              legendColor={"p.300"}
            />
          </CContainer>
        </HStack>
      </LPSectionContainer>

      <Img
        className="sumatra-map"
        src={`${SVGS_PATH}/sumatra-map.svg`}
        h={"80vh"}
        aspectRatio={1}
        pos={"absolute"}
        top={"50%"}
        transform={"translateY(-50%)"}
        objectFit="contain"
      />
    </CContainer>
  );
};
