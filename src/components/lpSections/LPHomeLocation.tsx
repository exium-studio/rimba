"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
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

const MapInfo = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer w={"fit"} gap={4} {...restProps}>
      <HStack gap={4}>
        <Icon boxSize={8}>
          <IconWorld stroke={1.5} />
        </Icon>

        <CContainer>
          <P>{l.lp_home_location_area_size}</P>
          <EditableContentContainer content={staticContents[28]}>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {staticContents[28]?.content[lang]}
            </P>
          </EditableContentContainer>
        </CContainer>
      </HStack>

      <HStack gap={4}>
        <Icon boxSize={8}>
          <IconMapPin2 stroke={1.5} />
        </Icon>

        <CContainer>
          <P>{l.lp_home_location_protected_areas}</P>
          <EditableContentContainer content={staticContents[29]}>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {staticContents[29]?.content[lang]}
            </P>
          </EditableContentContainer>
        </CContainer>
      </HStack>
    </CContainer>
  );
};
const LocationListItem = (props: any) => {
  // Props
  const {
    ciss,
    number,
    legendColor,
    provinceContent,
    locationListContent,
    ...restProps
  } = props;

  // Contexts
  const { lang } = useLang();

  // States
  const province = provinceContent?.content[lang];
  const locationList = locationListContent?.content.map(
    (location: any) => location[lang]
  );

  return (
    <CContainer
      className={`location-list ${ciss ? "" : "ss"} `}
      w={"240px"}
      maxH={"240px"}
      bg={"light"}
      py={3}
      rounded={"xl"}
      border={"1px solid"}
      borderColor={ciss ? "border.muted" : "d1"}
      overflowY={"auto"}
      pos={"relative"}
      transition={"200ms"}
      _hover={{
        borderColor: "p.400",
      }}
      {...restProps}
    >
      <HStack flex={1} align={"stretch"} gap={4} overflowY={"auto"}>
        <Box
          flexShrink={0}
          w={"4px"}
          bg={legendColor}
          rounded={"full"}
          ml={2}
        />

        <CContainer overflowY={"auto"}>
          <EditableContentContainer content={provinceContent}>
            <P fontSize={"lg"} fontWeight={"semibold"} color={"p.700"}>
              {province}
            </P>
          </EditableContentContainer>

          <EditableContentContainer
            className="scrollY"
            content={locationListContent}
            mt={2}
          >
            <CContainer gap={1} pr={2}>
              {locationList?.map((location: string, idx: number) => {
                return (
                  <HStack key={`${idx}-${location}`} align={"start"}>
                    <DotIndicator color={"fg.subtle"} ml={0} mt={"7px"} />

                    <P>{location}</P>
                  </HStack>
                );
              })}
            </CContainer>
          </EditableContentContainer>
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
      gsap.from(".section_title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
      });

      gsap.to("#sumatra-map, #riau-map, #sumatra-barat-map, #jambi-map", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 20%",
          scrub: true,
        },
        y: "20%",
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
        pb={ciss ? "" : "80px"}
        mb={ciss ? 0 : "80px"}
        pos={"relative"}
        {...restProps}
      >
        <LPSectionContainer flex={1}>
          <EditableContentContainer
            content={staticContents[27]}
            w={"fit"}
            mx={"auto"}
          >
            <H2
              className="section_title"
              fontWeight={"bold"}
              color={"p.700"}
              textAlign={"center"}
            >
              {staticContents[27]?.content[lang]}
            </H2>
          </EditableContentContainer>

          <CContainer
            h={sw < 560 ? "560px" : ciss ? "700px" : "800px"}
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
            flex={1}
            h={"70vh"}
            maxH={"600px"}
            pos={"absolute"}
            top={"calc(50% + 64px)"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
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
                  provinceContent={staticContents[30]}
                  locationListContent={staticContents[31]}
                  number={1}
                  legendColor={"p.500"}
                />

                <LocationListItem
                  ciss={ciss}
                  provinceContent={staticContents[32]}
                  locationListContent={staticContents[33]}
                  number={2}
                  legendColor={"p.400"}
                />
              </CContainer>

              <CContainer w={"fit"} justify={"center"}>
                <LocationListItem
                  ciss={ciss}
                  provinceContent={staticContents[34]}
                  locationListContent={staticContents[35]}
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
          mt={ciss ? 20 : 0}
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
          mt={ciss ? 20 : 0}
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
          mt={ciss ? 20 : 0}
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
          mt={ciss ? 20 : 0}
          pos={"absolute"}
          top={"50%"}
          transform={"translateY(-50%)"}
          objectFit="contain"
        />
      </CContainer>

      {ciss && (
        <LPSectionContainer zIndex={2} pb={"80px"}>
          <CContainer>
            <LocationListItem
              provinceContent={staticContents[30]}
              locationListContent={staticContents[31]}
              number={1}
              legendColor={"p.500"}
              w={"full"}
            />

            <LocationListItem
              provinceContent={staticContents[32]}
              locationListContent={staticContents[33]}
              number={2}
              legendColor={"p.400"}
              w={"full"}
            />

            <LocationListItem
              provinceContent={staticContents[34]}
              locationListContent={staticContents[35]}
              number={3}
              legendColor={"p.300"}
              w={"full"}
            />
          </CContainer>
        </LPSectionContainer>
      )}
    </>
  );
};
