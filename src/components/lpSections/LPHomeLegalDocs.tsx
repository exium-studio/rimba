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
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { formatDate } from "@/utils/formatter";
import {
  Box,
  BoxProps,
  HStack,
  Icon,
  SimpleGrid,
  StackProps,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight, IconFileTypePdf } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef, useState } from "react";

const DocPaper = (props: BoxProps) => {
  return (
    <Box
      w={"90%"}
      h={"200px"}
      border={"1px solid"}
      borderColor={"d4"}
      rounded={"2xl"}
      pos={"absolute"}
      left={"50%"}
      bottom={-20}
      transition={"200ms"}
      {...props}
    >
      <Box pos={"relative"}>
        <Icon
          boxSize={8}
          color={"fg.subtle"}
          pos={"absolute"}
          top={4}
          right={4}
        >
          <IconFileTypePdf stroke={1.5} />
        </Icon>
      </Box>
    </Box>
  );
};
const DocItem = (props: any) => {
  // Props
  const { doc, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  // States
  const [hover, setHover] = useState<boolean>(false);

  return (
    <CContainer rounded={"3xl"} bg={"p.900"} color={"light"} {...restProps}>
      <CContainer
        h={"140px"}
        pos={"relative"}
        p={2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DocPaper
          bg={"bg.emphasized"}
          transform={
            hover
              ? "rotate(15deg) translateX(-50%) translateY(-10px)"
              : "rotate(10deg) translateX(-50%)"
          }
          zIndex={1}
        />

        <DocPaper
          bg={"bg.muted"}
          transform={
            hover
              ? "rotate(10deg)  translateX(-50%) translateY(5px)"
              : "rotate(5deg)  translateX(-50%)"
          }
          zIndex={2}
        />

        <DocPaper
          bg={"light"}
          transform={
            hover ? "translateX(-50%) translateY(-5px)" : "translateX(-50%)"
          }
          zIndex={3}
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
        zIndex={4}
      >
        <CContainer p={5}>
          <Box pos={"absolute"} top={"-29.5px"} left={0}>
            <FolderShape h={"30px"} color={"p.900"} />
          </Box>

          <P opacity={0.8} pos={"absolute"} top={"-20px"} left={4} zIndex={2}>
            {formatDate(doc.createdAt, {
              variant: "year",
            })}
          </P>

          <P fontSize={"xl"} fontWeight={"medium"} lineClamp={1} mt={2}>
            {doc.title[lang]}
          </P>

          <P lineClamp={2} opacity={0.4} mt={4} mb={8}>
            {doc.description[lang]}
          </P>
        </CContainer>

        <HStack justify={"space-between"} p={3} mt={"auto"}>
          <HStack align={"end"}>
            <P fontSize={"xl"} fontWeight={"semibold"} lineHeight={1.2} ml={1}>
              {formatDate(doc.createdAt, {
                variant: "day",
              })}
            </P>

            <P>
              {formatDate(doc.createdAt, {
                variant: "shortMonth",
              })}
            </P>
          </HStack>

          <NavLink w={"fit"} to={`/document/${doc.id}`}>
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
          </NavLink>
        </HStack>
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
                zIndex={!iss ? (idx === 1 ? 2 : 1) : idx}
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
              variant={"outline"}
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
