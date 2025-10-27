"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { ActivityItem } from "@/components/widget/ActivityItem";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSActivity } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { isEmptyArray } from "@/utils/array";
import { HStack, Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const ActivityItemFull = (props: any) => {
  // Props
  const { activity: acttivityProps, ...restProps } = props;
  const activity = acttivityProps as Interface__CMSActivity;

  return (
    <CContainer
      w="100vw"
      h="700px"
      bgImage={`url(${activity.thumbnail?.[0]?.fileUrl})`}
      bgSize="cover"
      bgPos="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      pos={"relative"}
      {...restProps}
    >
      <ActivityItem activity={activity} thumbnailFill={true} w={"300px"} />
    </CContainer>
  );
};

export const LPHomeActivities = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const homeActivities = useContents((s) => s.homeActivities);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Utils
  function prev(): void {
    const el = carouselContainerRef.current;
    if (!el) return;
    const step = el.clientWidth;
    el.scrollBy({ left: -step, behavior: "smooth" });
  }
  function next(): void {
    const el = carouselContainerRef.current;
    if (!el) return;
    const step = el.clientWidth;
    el.scrollBy({ left: step, behavior: "smooth" });
  }

  // Animation
  useGSAP(
    () => {
      gsap.from(".content_1", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_2", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          // markers: true, // debug
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
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
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <CContainer>
      <LPSectionContainer
        ref={containerRef}
        py={"80px"}
        bg={"light"}
        {...restProps}
      >
        <SimpleGrid columns={[1, null, 2]} gapX={"80px"} gapY={8}>
          <EditableContentContainer
            className="content_1"
            content={staticContents[24]}
            mt={"-12px"}
          >
            <H2 fontWeight={"bold"} color={"p.700"}>
              {staticContents[24]?.content[lang]}
            </H2>
          </EditableContentContainer>

          <CContainer className="content_2" justify={"end"}>
            <EditableContentContainer content={staticContents[25]}>
              <P maxW={"500px"}>{staticContents[25]?.content[lang]}</P>
            </EditableContentContainer>

            <NavLink to={"/about-us/activities"} w={"fit"}>
              <Btn
                pr={[5, null, 3]}
                colorPalette={"p"}
                variant={"outline"}
                mt={4}
              >
                {l.all_activities}

                <Icon boxSize={5}>
                  <IconArrowUpRight stroke={1.5} />
                </Icon>
              </Btn>
            </NavLink>
          </CContainer>
        </SimpleGrid>
      </LPSectionContainer>

      <CContainer pos={"relative"} mb={"80px"}>
        <CContainer
          ref={carouselContainerRef}
          className="noScroll"
          scrollSnapType={"x mandatory"}
          overflowX={"auto"}
        >
          <HStack ref={mainContentsRef} w={"max"} gap={0}>
            {isEmptyArray(homeActivities) && <FeedbackNoData />}

            {homeActivities.map((activity: any, idx: number) => {
              return (
                <ActivityItemFull
                  key={activity.id}
                  activity={activity}
                  className={`event_item_${idx + 1}`}
                  scrollSnapAlign={"center"}
                />
              );
            })}
          </HStack>
        </CContainer>

        <LPSectionContainer
          w={"full"}
          mx={"auto"}
          outerContainerProps={{
            pos: "absolute",
            bottom: 0,
          }}
        >
          <HStack justify={"space-between"} py={4}>
            <Btn
              variant={"ghost"}
              colorPalette={"light"}
              size={"md"}
              onClick={prev}
            >
              <Icon>
                <IconArrowLeft stroke={1.5} />
              </Icon>

              {l.previous}
            </Btn>

            <Btn
              variant={"ghost"}
              colorPalette={"light"}
              size={"md"}
              onClick={next}
            >
              {l.next}

              <Icon>
                <IconArrowRight stroke={1.5} />
              </Icon>
            </Btn>
          </HStack>
        </LPSectionContainer>
      </CContainer>
    </CContainer>
  );
};
