"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { Box, Center, HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight, IconTrees } from "@tabler/icons-react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";

const PurposeSection = () => {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const purposes = [
    {
      titleContent: staticContents[69],
      descriptionContent: staticContents[70],
    },
    {
      titleContent: staticContents[71],
      descriptionContent: staticContents[72],
    },
    {
      titleContent: staticContents[73],
      descriptionContent: staticContents[74],
    },
    {
      titleContent: staticContents[75],
      descriptionContent: staticContents[76],
    },
  ];
  const [showAll, setShowAll] = useState<boolean>(false);

  // Animation
  useGSAP(
    () => {
      gsap.from(".content_1", {
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

      gsap.from(".content_2", {
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
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <LPSectionContainer ref={containerRef} py={"80px"}>
      <SimpleGrid columns={[1, null, 2]} gapX={"80px"} gapY={8}>
        <CContainer className="content_1">
          <EditableContentContainer content={staticContents[67]} mt={"-12px"}>
            <H2 className="section_title" fontWeight={"bold"} color={"p.700"}>
              {staticContents[67]?.content[lang]}
            </H2>
          </EditableContentContainer>

          <EditableContentContainer content={staticContents[68]} mt={4}>
            <P>{staticContents[68]?.content[lang]}</P>
          </EditableContentContainer>
        </CContainer>

        <CContainer
          className="content_2"
          gap={4}
          cursor={"pointer"}
          onClick={() => {
            setShowAll((ps) => !ps);
          }}
        >
          {purposes.map((purpose, idx) => {
            const firstIdx = idx === 0;
            const oddIdx = idx % 2 === 1;

            return (
              <CContainer
                key={idx}
                minH={"180px"}
                gap={4}
                p={5}
                border={"1px solid"}
                borderColor={"d1"}
                rounded={"2xl"}
                bg={oddIdx ? "p.100" : "p.50"}
                mt={showAll ? 0 : firstIdx ? 0 : "-140px"}
                transition={"200ms"}
                _hover={{
                  borderColor: "p.500",
                }}
                zIndex={purposes.length - idx}
              >
                <HStack>
                  <EditableContentContainer content={purpose.titleContent}>
                    <P fontSize={"xl"} fontWeight={"semibold"}>
                      {purpose.titleContent?.content[lang]}
                    </P>
                  </EditableContentContainer>
                </HStack>

                <EditableContentContainer content={purpose.descriptionContent}>
                  <P>{purpose.descriptionContent?.content[lang]}</P>
                </EditableContentContainer>

                <HStack align={"end"} justify={"space-between"} mt={"auto"}>
                  <P fontSize={"sm"} opacity={0.6}>{`${l.purpose} ${
                    idx + 1
                  }`}</P>

                  <Icon boxSize={8} color={"p.700"}>
                    <IconTrees stroke={1.5} />
                  </Icon>
                </HStack>
              </CContainer>
            );
          })}
        </CContainer>
      </SimpleGrid>
    </LPSectionContainer>
  );
};
const StrategySection = () => {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentsRef = useRef<HTMLDivElement>(null);

  // States
  const strategies = [
    {
      imgContent: staticContents[78],
      titleContent: staticContents[79],
      descriptionContent: staticContents[80],
    },
    {
      imgContent: staticContents[81],
      titleContent: staticContents[82],
      descriptionContent: staticContents[83],
    },
    {
      imgContent: staticContents[84],
      titleContent: staticContents[85],
      descriptionContent: staticContents[86],
    },
  ];
  const [activeIdx, setActiveIdx] = useState<number>(0);

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

      gsap.from(".content_1", {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_2", {
        scrollTrigger: {
          trigger: mainContentsRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef, dependencies: [iss] }
  );

  return (
    <LPSectionContainer ref={containerRef} py={"80px"}>
      <EditableContentContainer
        className="section_title"
        content={staticContents[77]}
        mx={"auto"}
      >
        <EditableContentContainer content={staticContents[77]}>
          <H2 fontWeight={"bold"} color={"p.700"} textAlign={"center"}>
            {staticContents[77]?.content[lang]}
          </H2>
        </EditableContentContainer>
      </EditableContentContainer>

      <SimpleGrid
        ref={mainContentsRef}
        columns={[1, null, 2]}
        gapX={"80px"}
        gapY={8}
        mt={"80px"}
      >
        <AccordionRoot
          className="content_1"
          value={[`${activeIdx}`]}
          onValueChange={(e) => {
            setActiveIdx(parseInt(e.value[0]));
          }}
        >
          {strategies.map((strategy, idx) => {
            return (
              <AccordionItem key={idx} value={idx.toString()} p={5}>
                <AccordionItemTrigger p={0}>
                  <CContainer gap={2}>
                    <P fontSize={"sm"} opacity={0.6}>{`${l.component} ${
                      idx + 1
                    }/`}</P>

                    <EditableContentContainer content={strategy.titleContent}>
                      <P fontSize={"xl"} fontWeight={"semibold"}>
                        {strategy.titleContent?.content[lang]}
                      </P>
                    </EditableContentContainer>
                  </CContainer>
                </AccordionItemTrigger>

                <AccordionItemContent p={0} pt={4}>
                  <EditableContentContainer
                    content={strategy.descriptionContent}
                  >
                    <P maxW={"600px"}>
                      {strategy.descriptionContent?.content[lang]}
                    </P>
                  </EditableContentContainer>

                  {iss && (
                    <CContainer className="content_2" mt={4}>
                      <EditableContentContainer
                        content={strategy.imgContent}
                        w={"full"}
                        aspectRatio={5 / 3}
                      >
                        <Img
                          flex={1}
                          src={strategies[activeIdx].imgContent?.content}
                          rounded={"2xl"}
                        />
                      </EditableContentContainer>
                    </CContainer>
                  )}
                </AccordionItemContent>
              </AccordionItem>
            );
          })}
        </AccordionRoot>

        {!iss && (
          <CContainer className="content_2">
            <EditableContentContainer
              w={"full"}
              aspectRatio={5 / 3}
              content={strategies[activeIdx].imgContent}
            >
              <Img
                flex={1}
                src={strategies[activeIdx].imgContent?.content}
                rounded={"2xl"}
              />
            </EditableContentContainer>
          </CContainer>
        )}
      </SimpleGrid>
    </LPSectionContainer>
  );
};
const ProgressSection = () => {
  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // States
  const progresses = [
    {
      year: "2021",
      list: [
        {
          titleContent: staticContents[88],
          listContent: staticContents[89],
        },
      ],
    },
    {
      year: "2021-2023",
      list: [
        {
          titleContent: staticContents[90],
          listContent: staticContents[91],
        },
      ],
    },
    {
      year: "2024",
      list: [
        {
          titleContent: staticContents[92],
          listContent: staticContents[93],
        },
        {
          titleContent: staticContents[94],
          listContent: staticContents[95],
        },
      ],
    },
    {
      year: "2025-2028",
      list: [
        {
          titleContent: staticContents[96],
          listContent: staticContents[97],
        },
      ],
    },
  ];

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

      gsap.from(mainContentRef.current, {
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: "top 65%",
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
    <LPSectionContainer ref={containerRef} py={"80px"}>
      <EditableContentContainer
        className="section_title"
        content={staticContents[87]}
        mx={"auto"}
      >
        <H2 fontWeight={"bold"} color={"p.700"} textAlign={"center"}>
          {staticContents[87]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <CContainer ref={mainContentRef} gap={[0, null, 4]} mt={"80px"}>
        {progresses.map((progress, idx) => {
          const firstIdx = idx === 0;
          const lastIdx = idx === progresses.length - 1;
          const oddIdx = idx % 2 === 0;

          return (
            <CContainer
              key={idx}
              w={["full", null, "calc(50% - 32px)"]}
              h={"fit"}
              ml={oddIdx ? 0 : "auto"}
              pos={"relative"}
            >
              {!iss && (
                <Box
                  display={lastIdx ? "none" : "block"}
                  w={"full"}
                  minH={"full"}
                  h={"full"}
                  borderTop={"3px dashed"}
                  borderRight={oddIdx ? "3px dashed" : ""}
                  borderLeft={oddIdx ? "" : "3px dashed"}
                  borderColor={"border.emphasized"}
                  pos={"absolute"}
                  left={oddIdx ? "64%" : ""}
                  right={oddIdx ? "" : "64%"}
                  top={"50%"}
                  zIndex={1}
                />
              )}

              {iss && !firstIdx && (
                <Box
                  borderLeft={"3px dashed"}
                  borderColor={"border.emphasized"}
                  h={"40px"}
                  mx={"auto"}
                />
              )}

              <CContainer
                bg={"p.100"}
                p={4}
                border={"1px solid"}
                borderColor={"d1"}
                rounded={"2xl"}
                transition={"200ms"}
                _hover={{
                  borderColor: "p.500",
                }}
                zIndex={2}
              >
                <P opacity={0.6} mb={2}>
                  {progress.year}
                </P>

                <CContainer gap={4}>
                  {progress.list.map((p, pIdx) => {
                    return (
                      <CContainer key={pIdx} gap={2}>
                        <EditableContentContainer content={p.titleContent}>
                          <P fontSize={"xl"} fontWeight={"semibold"}>
                            {p.titleContent?.content[lang]}
                          </P>
                        </EditableContentContainer>

                        <EditableContentContainer content={p.listContent}>
                          <CContainer gap={1}>
                            {p.listContent.content.map((li: any) => {
                              return (
                                <HStack key={li[lang]} align={"start"}>
                                  <DotIndicator
                                    color={"fg.subtle"}
                                    ml={0}
                                    mt={"7px"}
                                  />

                                  <P opacity={0.6}>{li[lang]}</P>
                                </HStack>
                              );
                            })}
                          </CContainer>
                        </EditableContentContainer>
                      </CContainer>
                    );
                  })}
                </CContainer>
              </CContainer>
            </CContainer>
          );
        })}
      </CContainer>
    </LPSectionContainer>
  );
};
const TargetIndicatorSection = () => {
  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // States
  const indicators = [
    {
      imgContent: staticContents[99],
      titleContent: staticContents[100],
      descriptionContent: staticContents[101],
    },
    {
      imgContent: staticContents[102],
      titleContent: staticContents[103],
      descriptionContent: staticContents[104],
    },
    {
      imgContent: staticContents[105],
      titleContent: staticContents[106],
      descriptionContent: staticContents[107],
    },
    {
      imgContent: staticContents[108],
      titleContent: staticContents[109],
      descriptionContent: staticContents[110],
    },
  ];

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

      gsap.from(mainContentRef.current, {
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef }
  );

  return (
    <LPSectionContainer ref={containerRef} py={"80px"}>
      <EditableContentContainer
        className="section_title"
        content={staticContents[98]}
        mx={"auto"}
      >
        <H2 fontWeight={"bold"} color={"p.700"} textAlign={"center"}>
          {staticContents[98]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <SimpleGrid ref={mainContentRef} columns={[1, 2, 4]} gap={6} mt={"80px"}>
        {indicators.map((indicator, idx) => {
          const oddIdx = idx % 2 === 1;

          return (
            <CContainer
              key={idx}
              bg={oddIdx ? "p.50" : "p.100"}
              transition={"200ms"}
              border={"1px solid"}
              borderColor={"d1"}
              _hover={{
                borderColor: "p.500",
              }}
              rounded={"2xl"}
            >
              <CContainer p={2}>
                <EditableContentContainer
                  content={indicator.imgContent}
                  aspectRatio={1}
                  w={"full"}
                >
                  <Img
                    src={indicator.imgContent.content}
                    flex={1}
                    rounded={"xl"}
                  />
                </EditableContentContainer>
              </CContainer>

              <CContainer gap={4} p={4}>
                <EditableContentContainer content={indicator.titleContent}>
                  <P fontSize={"lg"} fontWeight={"semibold"}>
                    {indicator.titleContent?.content[lang]}
                  </P>
                </EditableContentContainer>

                <EditableContentContainer
                  content={indicator.descriptionContent}
                >
                  <P opacity={0.6}>
                    {indicator.descriptionContent?.content[lang]}
                  </P>
                </EditableContentContainer>
              </CContainer>
            </CContainer>
          );
        })}
      </SimpleGrid>
    </LPSectionContainer>
  );
};
const StructureSection = () => {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

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

      gsap.from(mainContentRef.current, {
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: "top 65%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef }
  );

  return (
    <LPSectionContainer ref={containerRef} py={"80px"}>
      <EditableContentContainer
        className="section_title"
        content={staticContents[111]}
        mx={"auto"}
      >
        <H2 fontWeight={"bold"} color={"p.700"} textAlign={"center"}>
          {staticContents[111]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <CContainer ref={mainContentRef} mt={"80px"}>
        <EditableContentContainer content={staticContents[112]} mx={"auto"}>
          <Img
            src={staticContents[112]?.content}
            alt="RIMBA organizational structure"
            fluid
          />
        </EditableContentContainer>

        <Center mt={8}>
          <Link href={staticContents[111]?.content} target="_blank">
            <Btn colorPalette={"p"} variant={"ghost"} pr={[5, null, 3]}>
              {l.view}

              <Icon>
                <IconArrowUpRight />
              </Icon>
            </Btn>
          </Link>
        </Center>
      </CContainer>
    </LPSectionContainer>
  );
};

export default function RimbaCorridorProgramPage() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"} bg={"p.900"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[66]}
        img={`${IMAGES_PATH}/lp/about-us/rimba-corridor-program/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          {
            label: staticContents[66].content[lang],
            path: "/about-us/rimba-corridor-program",
          },
        ]}
      />

      <CContainer
        bg={"light"}
        zIndex={2}
        mt={"-24px"}
        rounded={"3xl"}
        overflow={"clip"}
      >
        <PurposeSection />

        <StrategySection />

        <ProgressSection />

        <TargetIndicatorSection />

        <StructureSection />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
