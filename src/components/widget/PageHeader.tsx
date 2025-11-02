"use client";

import { CContainer } from "@/components/ui/c-container";
import { H1 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import useLang from "@/context/useLang";
import { StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface Props extends StackProps {
  titleContent?: any;
  title?: string;
  descriptionContent?: any;
  img?: string;
  links?: { label: string; path: string }[];
}

export const PageHeader = (props: Props) => {
  // Props
  const { titleContent, title, descriptionContent, img, links, ...restProps } =
    props;

  // Contexts
  const { lang } = useLang();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.to(".header-bg", {
        scrollTrigger: {
          trigger: ".header-bg",
          start: "top top",
          scrub: true,
          pin: true,
          // markers: true, // debug
        },
        y: "-30%",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef }
  );

  return (
    <CContainer
      ref={containerRef}
      minH={["100vh", null, "600px"]}
      overflow={"clip"}
      zIndex={2}
      {...restProps}
    >
      <LPSectionContainer
        outerContainerProps={{
          flex: 1,
          bg: "p.900",
          pt: "96px",
          pos: "relative",
          overflow: "clip",
        }}
        flex={1}
        color={"light"}
      >
        {img && (
          <Img
            className="header-bg"
            src={img}
            h={"full"}
            w={"full"}
            opacity={0.5}
            pos={"absolute"}
            top={0}
            left={0}
          />
        )}

        <CContainer mt={"auto"} gap={4} py={12} mb={"48px"} zIndex={2}>
          {links && (
            <Breadcrumbs links={links} justify={["center", null, "start"]} />
          )}

          {titleContent && (
            <EditableContentContainer content={titleContent}>
              <H1 fontWeight={"semibold"} lineHeight={1.4}>
                {titleContent.content[lang]}
              </H1>
            </EditableContentContainer>
          )}

          {title && (
            <H1 fontWeight={"semibold"} lineHeight={1.4}>
              {title}
            </H1>
          )}

          {descriptionContent && (
            <EditableContentContainer content={descriptionContent}>
              <P fontSize={"lg"}>{descriptionContent.content[lang]}</P>
            </EditableContentContainer>
          )}
        </CContainer>
      </LPSectionContainer>
    </CContainer>
  );
};
