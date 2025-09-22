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
import useScreen from "@/hooks/useScreen";
import { Box, HStack, Icon, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconMapPin2, IconWorld } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const LOCATION_list_LIST = [
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
    <CContainer w={"fit"} gap={4} {...restProps}>
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
  const { ciss, location, number, legendColor, ...restProps } = props;

  return (
    <CContainer
      className={`location-list ${ciss ? "" : "ss"}`}
      p={3}
      pl={2}
      bg={"light"}
      rounded={"xl"}
      minW={"240px"}
      border={"1px solid"}
      borderColor={ciss ? "border.muted" : "d1"}
      pos={"relative"}
      {...restProps}
    >
      <HStack align={"stretch"} gap={4}>
        <Box flexShrink={0} w={"4px"} bg={legendColor} rounded={"full"} />

        <CContainer>
          <P fontSize={"lg"} fontWeight={"medium"}>
            {location.province}
          </P>

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

  // Hooks
  const { sw } = useScreen();
  const ciss = sw < 1200;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.to("#sumatra-map, #riau-map, #sumatra-barat-map, #jambi-map", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
        },
        y: "200px",
        ease: "none",
      });

      gsap.from(".location-map", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom bottom",
          scrub: true,
        },
        opacity: 0,
        stagger: 0.5,
        ease: "none",
      });

      gsap.utils.toArray(".location-list").forEach((el) => {
        gsap.from(el as Element, {
          scrollTrigger: {
            trigger: el as Element,
            start: "top 80%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          y: "50%",
          opacity: 0,
          duration: 1,
          ease: "none",
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <CContainer
        ref={containerRef}
        maxH={ciss ? "" : "800px"}
        bg={"light"}
        pt={"80px"}
        pb={ciss ? 0 : "80px"}
        pos={"relative"}
        {...restProps}
      >
        <LPSectionContainer flex={1}>
          <H2
            className="section_title"
            fontWeight={"bold"}
            color={"p.700"}
            textAlign={"center"}
          >
            {staticContents[27].content[lang]}
          </H2>

          <CContainer
            h={ciss ? "700px" : "800px"}
            maxH={ciss ? "" : "500px"}
            w={"80%"}
            aspectRatio={1}
            bg={"p.100"}
            mt={"80px"}
            mx={"auto"}
          >
            <CContainer flex={1} gap={4} p={8} color={"p.700"}>
              <MapInfo ml={sw < 560 ? "" : "auto"} />

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
        {!ciss && (
          <LPSectionContainer
            h={"70vh"}
            maxH={"600px"}
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
              <CContainer
                w={"fit"}
                justify={"space-between"}
                gap={8}
                py={"50px"}
              >
                <LocationListItem
                  ciss={ciss}
                  location={LOCATION_list_LIST[0]}
                  number={1}
                  legendColor={"p.500"}
                />

                <LocationListItem
                  ciss={ciss}
                  location={LOCATION_list_LIST[1]}
                  number={2}
                  legendColor={"p.400"}
                />
              </CContainer>

              <CContainer w={"fit"} justify={"center"}>
                <LocationListItem
                  ciss={ciss}
                  location={LOCATION_list_LIST[2]}
                  number={3}
                  legendColor={"p.300"}
                />
              </CContainer>
            </HStack>
          </LPSectionContainer>
        )}

        {/* Sumatra */}
        <Img
          id="sumatra-map"
          src={`${SVGS_PATH}/sumatra-map.svg`}
          h={"80vh"}
          maxH={"600px"}
          aspectRatio={1}
          pos={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          objectFit="contain"
        />

        {/* Riau */}
        <Img
          id="riau-map"
          className="location-map"
          src={`${SVGS_PATH}/riau-map.svg`}
          h={"80vh"}
          maxH={"600px"}
          aspectRatio={1}
          pos={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          objectFit="contain"
        />

        {/* Sumatra Barat */}
        <Img
          id="sumatra-barat-map"
          className="location-map"
          src={`${SVGS_PATH}/sumatra-barat-map.svg`}
          h={"80vh"}
          maxH={"600px"}
          aspectRatio={1}
          pos={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          objectFit="contain"
        />

        {/* Jambi */}
        <Img
          id="jambi-map"
          className="location-map"
          src={`${SVGS_PATH}/jambi-map.svg`}
          h={"80vh"}
          maxH={"600px"}
          aspectRatio={1}
          pos={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          objectFit="contain"
        />
      </CContainer>

      {ciss && (
        <LPSectionContainer zIndex={2} pb={"80px"}>
          <CContainer gap={8}>
            <LocationListItem
              location={LOCATION_list_LIST[0]}
              number={1}
              legendColor={"p.500"}
            />

            <LocationListItem
              location={LOCATION_list_LIST[1]}
              number={2}
              legendColor={"p.400"}
            />

            <LocationListItem
              location={LOCATION_list_LIST[2]}
              number={3}
              legendColor={"p.300"}
            />
          </CContainer>
        </LPSectionContainer>
      )}
    </>
  );
};
