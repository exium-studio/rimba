"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
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

const ActivityItem = (props: any) => {
  // Props
  const { activity, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  return (
    <CContainer
      rounded={"4xl"}
      bg={"p.900"}
      border={"1px solid"}
      borderColor={"p.100"}
      p={2}
      {...restProps}
    >
      <CContainer>
        <Img src={activity.thumbnail} aspectRatio={2.5} rounded={"3xl"} />
      </CContainer>

      <CContainer
        flex={1}
        bg={"light"}
        p={6}
        // roundedTopLeft={"2xl"}
        roundedTopRight={"2xl"}
        roundedBottomLeft={"2xl"}
        roundedBottomRight={"2xl"}
        mt={"-20px"}
        pos={"relative"}
        zIndex={2}
      >
        <Box pos={"absolute"} top={"-29.5px"} left={0}>
          <FolderShape h={"30px"} />
        </Box>

        <P fontSize={"sm"} opacity={0.4}>
          {formatDate(activity.createdAt)}
        </P>

        <P fontSize={"lg"} fontWeight={"medium"} mt={2}>
          {activity.title[lang]}
        </P>

        <P opacity={0.6} mt={4}>
          {activity.description[lang]}
        </P>
      </CContainer>

      <HStack justify={"end"} mt={"auto"} pt={2}>
        <Btn
          colorPalette={"p"}
          variant={"plain"}
          size={"md"}
          rounded={"3xl"}
          pr={3}
          color={"p.300"}
        >
          {l.learn_more}

          <Icon boxSize={5}>
            <IconArrowUpRight stroke={1.5} />
          </Icon>
        </Btn>
      </HStack>
    </CContainer>
  );
};

export const LPHomeActivity = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const activities = useContents((s) => s.activities);

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

      gsap.from(mainContentsRef.current, {
        y: !iss ? "-40%" : "20%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
      });

      if (!iss) {
        gsap.from("#activity_item_1", {
          x: "70%",
          delay: 0.5,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 50%",
            // markers: true, // debug
          },
        });

        gsap.from("#activity_item_3", {
          x: "-70%",
          delay: 0.5,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 50%",
            // markers: true, // debug
          },
        });
      }

      gsap.from(".bottom_content", {
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bottomContentsRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
      });
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <LPSectionContainer ref={containerRef} py={"80px"} {...restProps}>
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.700"}
        textAlign={"center"}
      >
        {staticContents[24].content[lang]}
      </H2>

      <CContainer mt={"80px"}>
        <SimpleGrid ref={mainContentsRef} columns={[1, null, 3]} gap={4}>
          {activities.map((activity: any, idx: number) => {
            return (
              <ActivityItem
                key={activity.id}
                id={`activity_item_${idx + 1}`}
                activity={activity}
                zIndex={idx === 1 ? 2 : 1}
              />
            );
          })}
        </SimpleGrid>
      </CContainer>

      <CContainer ref={bottomContentsRef}>
        <P
          className="bottom_content"
          textAlign={"center"}
          mt={"80px"}
          maxW={"500px"}
          mx={"auto"}
        >
          {staticContents[25].content[lang]}
        </P>

        <Btn
          className="bottom_content"
          w={"fit"}
          pr={3}
          colorPalette={"p"}
          variant={"ghost"}
          mx={"auto"}
          mt={4}
        >
          {l.all_activities}

          <Icon boxSize={5}>
            <IconArrowUpRight stroke={1.5} />
          </Icon>
        </Btn>
      </CContainer>
    </LPSectionContainer>
  );
};
