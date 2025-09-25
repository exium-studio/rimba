"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSActivity } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { formatDate } from "@/utils/formatter";
import { Center, HStack, Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const ActivityItem = (props: any) => {
  // Props
  const { activity: acttivityProps, ...restProps } = props;
  const activity = acttivityProps as Interface__CMSActivity;

  // Contexts
  const { l, lang } = useLang();

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
      {/* <LPSectionContainer
        w={"full"}
        mx={"auto"}
        outerContainerProps={{
          pos: "absolute",
          top: 0,
        }}
      >
        <HStack color={"light"} justify={"space-between"} p={4} mt={4}>
          <P>{formatDate(activity.plannedDate, { variant: "dayMonth" })}</P>

          <P>{formatDate(activity.plannedDate, { variant: "year" })}</P>
        </HStack>
      </LPSectionContainer> */}

      <CContainer w={"300px"} bg={"light"} rounded="xl">
        <Center aspectRatio={1} w="full" p={2}>
          <Center
            aspectRatio={1}
            w="full"
            rounded={"lg"}
            overflow={"clip"}
            pos={"relative"}
          >
            <Img
              src={activity.thumbnail?.[0]?.fileUrl}
              aspectRatio={1}
              w={"100vw"}
              h={"700px"}
              rounded="lg"
              pos={"absolute"}
              mt={"188px"}
              transition={"200ms"}
              _hover={{
                transform: "scale(1.1)",
              }}
            />
          </Center>
        </Center>

        <CContainer h={"188px"}>
          <CContainer gap={4} px={4} pt={3}>
            <P fontSize={"lg"} fontWeight={"semibold"} lineClamp={1}>
              {activity.title[lang]}
            </P>

            <P color={"fg.subtle"} lineClamp={3}>
              {activity.description[lang]}
            </P>
          </CContainer>

          <CContainer p={2} mt={"auto"}>
            <HStack justify={"space-between"}>
              <P color={"fg.subtle"} ml={2}>
                {formatDate(activity.plannedDate, { variant: "numeric" })}
              </P>

              <NavLink to={`/activities/${activity.id}`} w={"fit"} ml={"auto"}>
                <Btn
                  colorPalette={"p"}
                  variant={"ghost"}
                  size={"md"}
                  pr={3}
                  mt={"auto"}
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
  // const iss = useIsSmScreenWidth();
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);
  const descContentRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.from(".section_title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(descContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
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
          <EditableContentContainer content={staticContents[24]} mt={"-12px"}>
            <H2 className="section_title" fontWeight={"bold"} color={"p.700"}>
              {staticContents[24]?.content[lang]}
            </H2>
          </EditableContentContainer>

          <CContainer ref={descContentRef} justify={"end"}>
            <EditableContentContainer content={staticContents[25]}>
              <P maxW={"500px"}>{staticContents[25]?.content[lang]}</P>
            </EditableContentContainer>

            <NavLink to={"/about-us/activities"} w={"fit"}>
              <Btn pr={3} colorPalette={"p"} variant={"outline"} mt={4}>
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
            {homeActivities.map((activity: any, idx: number) => {
              return (
                <ActivityItem
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
              onClick={() =>
                carouselContainerRef.current!.scrollBy({
                  left: -400,
                  behavior: "smooth",
                })
              }
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
              onClick={() =>
                carouselContainerRef.current!.scrollBy({
                  left: 400,
                  behavior: "smooth",
                })
              }
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
