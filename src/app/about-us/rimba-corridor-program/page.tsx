"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconTree } from "@tabler/icons-react";
import gsap from "gsap";
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
                gap={4}
                p={5}
                border={"1px solid"}
                borderColor={"d1"}
                rounded={"2xl"}
                bg={oddIdx ? "p.100" : "p.50"}
                mt={showAll ? 0 : firstIdx ? 0 : "-140px"}
                transition={"200ms"}
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

                <HStack align={"end"} justify={"space-between"}>
                  <P fontSize={"sm"}>{`${l.purpose} ${idx + 1}`}</P>

                  <Icon boxSize={8} color={"p.700"}>
                    <IconTree stroke={1.5} />
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

export default function DocumentsRoute() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
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

      <PurposeSection />
    </CContainer>
  );
}
