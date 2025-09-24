"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { FileIcon } from "@/components/ui/file-icon";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const DocItem = (props: any) => {
  // Props
  const { doc, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  // States
  const file = doc.file?.[0];

  return (
    <CContainer
      bg={"light"}
      color={"dark"}
      rounded={"3xl"}
      border={"1px solid"}
      borderColor={"p.500"}
      {...restProps}
    >
      <CContainer flex={1} p={5} gap={4} align={"center"}>
        <FileIcon
          mimeType={file.fileMimeType}
          color={"fg.subtle"}
          boxSize={16}
          stroke={1.3}
        />

        <P
          fontSize={"lg"}
          fontWeight={"medium"}
          lineClamp={2}
          textAlign={"center"}
        >
          {doc.title[lang]}
        </P>

        <P color={"fg.subtle"} lineClamp={3} textAlign={"center"}>
          {doc.description[lang]}
        </P>
      </CContainer>

      <CContainer mt={"auto"} p={5} align={"center"}>
        <Btn w={"fit"} variant={"ghost"} colorPalette={"p"} pr={[5, null, 3]}>
          {l.see_document}

          <Icon boxSize={5}>
            <IconArrowUpRight stroke={1.5} />
          </Icon>
        </Btn>
      </CContainer>
    </CContainer>
  );
};

export const LPHomeLegalDocs = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const legalDocuments = useContents((s) => s.legalDocuments);

  // Hooks
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
        y: "100%",
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
        gsap.from(".doc_item_1", {
          scrollTrigger: {
            trigger: mainContentsRef.current,
            start: "top 65%",
            // markers: true, // debug
          },
          x: "70%",
          duration: 0.75,
        });

        gsap.from(".doc_item_3", {
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
          columns={[1, null, 3]}
          gap={8}
          mt={"80px"}
        >
          {legalDocuments?.map((doc: any, idx: number) => {
            return (
              <DocItem
                key={idx}
                doc={doc}
                className={`doc_item_${idx + 1}`}
                zIndex={idx === 1 ? 2 : 1}
              />
            );
          })}
        </SimpleGrid>

        <CContainer ref={bottomContentsRef} mt={"80px"}>
          <EditableContentContainer content={staticContents[25]} mx={"auto"}>
            <P textAlign={"center"} maxW={"500px"} mx={"auto"}>
              {staticContents[25]?.content[lang]}
            </P>
          </EditableContentContainer>

          <NavLink to={"/document"}>
            <Btn
              w={"fit"}
              pr={3}
              colorPalette={"p"}
              variant={"ghost"}
              mx={"auto"}
              mt={4}
            >
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
