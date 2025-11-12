"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { DocumentItem } from "@/components/widget/DocumentItem";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSDocument } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useScreen from "@/hooks/useScreen";
import { isEmptyArray } from "@/utils/array";
import { Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export const LPHomeLegalDocs = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const homeLegalDocuments = useContents((s) => s.homeLegalDocuments);

  // Hooks
  const { sw } = useScreen();

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
    { scope: containerRef }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [sw]);

  return (
    <CContainer
      ref={containerRef}
      py={"80px"}
      // bg={"bg.subtle"}
      color={"dark"}
      pos={"relative"}
      {...restProps}
    >
      <Img
        src={`${IMAGES_PATH}/lp/home/legal-docs-bg.png`}
        h={"full"}
        w={"full"}
        objectFit={"contain"}
        pos={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        opacity={0.05}
      />

      <LPSectionContainer zIndex={2}>
        <EditableContentContainer content={staticContents[50]} mx={"auto"}>
          <H2
            className="section_title"
            fontWeight={"bold"}
            textAlign={"center"}
            color={"p.700"}
          >
            {staticContents[50]?.content[lang]}
          </H2>
        </EditableContentContainer>

        <SimpleGrid
          ref={mainContentsRef}
          columns={[1, null, 2, 4]}
          gap={6}
          mt={"100px"}
        >
          {isEmptyArray(homeLegalDocuments) && <FeedbackNoData />}

          {homeLegalDocuments?.map(
            (doc: Interface__CMSDocument, idx: number) => {
              return (
                idx < 4 && (
                  <DocumentItem
                    key={idx}
                    document={doc}
                    className={`doc_item_${idx + 1}`}
                  />
                )
              );
            }
          )}
        </SimpleGrid>

        <CContainer ref={bottomContentsRef} mt={"80px"}>
          <EditableContentContainer content={staticContents[51]} mx={"auto"}>
            <P textAlign={"center"} maxW={"500px"} mx={"auto"}>
              {staticContents[51]?.content[lang]}
            </P>
          </EditableContentContainer>

          <NavLink to={"/document"} w={"fit"} mx={"auto"}>
            <Btn pr={3} colorPalette={"p"} variant={"outline"} mt={4}>
              {l.all_document}

              <Icon boxSize={5}>
                <IconArrowUpRight stroke={1.5} />
              </Icon>
            </Btn>
          </NavLink>
        </CContainer>
      </LPSectionContainer>
    </CContainer>
  );
};
