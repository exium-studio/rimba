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
import {
  Box,
  Center,
  HStack,
  Icon,
  SimpleGrid,
  StackProps,
} from "@chakra-ui/react";
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
    <CContainer rounded={"4xl"} bg={"p.900"} p={2} {...restProps}>
      <CContainer>
        <Img src={activity.thumbnail} aspectRatio={1} rounded={"3xl"} />
      </CContainer>

      <CContainer
        flex={1}
        bg={"p.900"}
        color={"light"}
        roundedTopRight={"3xl"}
        roundedBottomLeft={"3xl"}
        roundedBottomRight={"3xl"}
        mt={"-40px"}
        pos={"relative"}
        zIndex={2}
      >
        <CContainer p={6}>
          <Box pos={"absolute"} top={"-29.5px"} left={0}>
            <FolderShape h={"30px"} color={"p.900"} />
          </Box>

          <P fontSize={"sm"} opacity={0.4}>
            {formatDate(activity.createdAt)}
          </P>

          <P fontSize={"lg"} fontWeight={"medium"} lineClamp={2} mt={2}>
            {activity.title[lang]}
          </P>

          <P opacity={0.6} mt={4} lineClamp={3}>
            {activity.description[lang]}
          </P>
        </CContainer>

        <HStack justify={"end"} p={4} mt={"auto"}>
          <Btn
            colorPalette={"p"}
            variant={"plain"}
            size={"md"}
            rounded={"3xl"}
            color={"p.300"}
            pr={3}
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
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(mainContentsRef.current, {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      if (!iss) {
        gsap.from("#activity_item_1", {
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 50%",
            // markers: true, // debug
          },
          x: "70%",
          delay: 0.5,
          duration: 1,
          ease: "power2.out",
        });

        gsap.from("#activity_item_3", {
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 50%",
            // markers: true, // debug
          },
          x: "-70%",
          delay: 0.5,
          duration: 1,
          ease: "power2.out",
        });
      }

      gsap.from(".bottom_content", {
        scrollTrigger: {
          trigger: bottomContentsRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        y: "100%",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
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
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.700"}
        textAlign={"center"}
      >
        {staticContents[24].content[lang]}
      </H2>

      <CContainer mt={"80px"}>
        <SimpleGrid ref={mainContentsRef} columns={[1, null, 2, 3]} gap={8}>
          {activities.map((activity: any, idx: number) => {
            return (
              <ActivityItem
                key={activity.id}
                activity={activity}
                id={`activity_item_${idx + 1}`}
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

        <Center className="bottom_content">
          <Btn
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
        </Center>
      </CContainer>
    </LPSectionContainer>
  );
};
