"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FolderShape from "@/components/widget/FolderShape";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { formatDate } from "@/utils/formatter";
import { Box, HStack, Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const EventItem = (props: any) => {
  // Props
  const { event, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  return (
    <CContainer
      rounded={"3xl"}
      bg={"p.900"}
      color={"light"}
      p={2}
      {...restProps}
    >
      <CContainer>
        <Img
          src={event.thumbnail?.[0]?.fileUrl}
          aspectRatio={1}
          rounded={"2xl"}
        />
      </CContainer>

      <CContainer
        flex={1}
        bg={"p.900"}
        roundedTopRight={"2xl"}
        roundedBottomLeft={"2xl"}
        roundedBottomRight={"2xl"}
        mt={"-40px"}
        pos={"relative"}
        zIndex={2}
      >
        <CContainer p={4}>
          <Box pos={"absolute"} top={"-29.5px"} left={0}>
            <FolderShape h={"30px"} color={"p.900"} />
          </Box>

          <P opacity={0.8} pos={"absolute"} top={"-20px"} left={4} zIndex={2}>
            {formatDate(event.createdAt, {
              variant: "year",
            })}
          </P>

          <P fontSize={"lg"} fontWeight={"medium"} lineClamp={1} mt={2}>
            {event.title[lang]}
          </P>

          <P lineClamp={2} opacity={0.6} mt={4} mb={8}>
            {event.description[lang]}
          </P>
        </CContainer>

        <HStack justify={"space-between"} p={3} mt={"auto"}>
          <HStack align={"end"}>
            <P fontSize={"xl"} fontWeight={"semibold"} lineHeight={1.2} ml={1}>
              {formatDate(event.createdAt, {
                variant: "day",
              })}
            </P>

            <P>
              {formatDate(event.createdAt, {
                variant: "shortMonth",
              })}
            </P>
          </HStack>

          <Btn
            colorPalette={"p"}
            color={"p.300"}
            variant={"ghost"}
            size={"md"}
            pr={3}
            mt={"auto"}
            _hover={{
              bg: "blackAlpha.300",
            }}
          >
            {l.learn_more}

            <Icon boxSize={5}>
              <IconArrowUpRight stroke={1.5} />
            </Icon>
          </Btn>
        </HStack>
      </CContainer>
    </CContainer>
  );
};

export const LPHomeEvents = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const homeEvents = useContents((s) => s.homeEvents);

  // Hooks
  // const iss = useIsSmScreenWidth();
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);
  const bottomContentsRef = useRef<HTMLDivElement>(null);

  // Animation
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

      gsap.from(mainContentsRef.current, {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
      });

      if (!iss) {
        gsap.from(".event_item_1", {
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 65%",
            // markers: true, // debug
          },
          x: "70%",
          duration: 0.75,
        });

        gsap.from(".event_item_3", {
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 65%",
            // markers: true, // debug
          },
          x: "-70%",
          duration: 0.75,
        });
      }

      gsap.from(bottomContentsRef.current, {
        scrollTrigger: {
          trigger: bottomContentsRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        y: "100%",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <LPSectionContainer
      ref={containerRef}
      py={"80px"}
      bg={"light"}
      {...restProps}
    >
      <EditableContentContainer content={staticContents[24]} mx={"auto"}>
        <H2
          className="section_title"
          fontWeight={"bold"}
          color={"p.700"}
          textAlign={"center"}
        >
          {staticContents[24]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <CContainer mt={"80px"}>
        <SimpleGrid ref={mainContentsRef} columns={[1, null, 3]} gap={8}>
          {homeEvents.map((event: any, idx: number) => {
            return (
              <EventItem
                key={event.id}
                event={event}
                className={`event_item_${idx + 1}`}
                zIndex={idx === 1 ? 2 : 1}
              />
            );
          })}
        </SimpleGrid>
      </CContainer>

      <CContainer ref={bottomContentsRef} mt={"80px"}>
        <EditableContentContainer content={staticContents[25]} mx={"auto"}>
          <P textAlign={"center"} maxW={"500px"} mx={"auto"}>
            {staticContents[25]?.content[lang]}
          </P>
        </EditableContentContainer>

        <NavLink to={"/about-us/homeEvents"}>
          <Btn
            w={"fit"}
            pr={3}
            colorPalette={"p"}
            variant={"ghost"}
            mx={"auto"}
            mt={4}
          >
            {l.all_events}

            <Icon boxSize={5}>
              <IconArrowUpRight stroke={1.5} />
            </Icon>
          </Btn>
        </NavLink>
      </CContainer>
    </LPSectionContainer>
  );
};
