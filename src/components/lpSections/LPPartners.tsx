"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { HStack, Image, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const LPPartners = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const partnerLogos1Ref = useRef<HTMLDivElement>(null);
  const partnerLogos2Ref = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      if (!partnerLogos1Ref.current || !partnerLogos2Ref.current) return;

      gsap.from(".content_container_1", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        x: !iss ? "-20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });

      gsap.from(".content_container_2", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef }
  );

  const partnerLogos1 = staticContents[55]?.content || [];
  const resolvedParterLogos1 = Array(6).fill(partnerLogos1).flat();
  const partnerLogos2 = staticContents[56]?.content || [];
  const resolvedParterLogos2 = Array(6).fill(partnerLogos2).flat();

  return (
    <CContainer bg={"bg.subtle"} roundedBottom={"3xl"} {...restProps}>
      <LPSectionContainer ref={containerRef} py={"80px"}>
        <SimpleGrid columns={[1, null, 2]} gap={8}>
          <HStack className="content_container_1" gap={8} align={"start"}>
            <Image
              src={`${IMAGES_PATH}/atrbpn-logo.png`}
              h={"full"}
              maxH={["64px", null, "80px"]}
            />
            <Image
              src={`${IMAGES_PATH}/gef-logo.png`}
              h={"full"}
              maxH={["64px", null, "80px"]}
            />
            <Image
              src={`${IMAGES_PATH}/unep-logo.png`}
              h={"full"}
              maxH={["64px", null, "80px"]}
            />
          </HStack>

          <CContainer className="content_container_2">
            <EditableContentContainer content={staticContents[53]}>
              <H2
                className="section_title"
                fontWeight={"bold"}
                color={"p.700"}
                textAlign={"center"}
              >
                {staticContents[53]?.content[lang]}
              </H2>
            </EditableContentContainer>

            <EditableContentContainer content={staticContents[54]} mt={4}>
              <P>{staticContents[54]?.content[lang]}</P>
            </EditableContentContainer>
          </CContainer>
        </SimpleGrid>
      </LPSectionContainer>

      <CContainer gap={"80px"} mb={"80px"} overflow={"hidden"}>
        <EditableContentContainer w={"full"} content={staticContents[55]}>
          <CContainer>
            <HStack
              className="partners_logos"
              animation={`i-scroll-left-partner-logos ${
                resolvedParterLogos1.length + 20
              }s linear infinite`}
              ref={partnerLogos1Ref}
              w="max"
              gap={"80px"}
            >
              {resolvedParterLogos1.map((imgUrl: string, idx: number) => (
                <Image key={`${idx}-${imgUrl}`} src={imgUrl} h={"40px"} />
              ))}
            </HStack>
          </CContainer>
        </EditableContentContainer>

        <EditableContentContainer
          w={"full"}
          content={staticContents[56]}
          align={"end"}
        >
          <CContainer align={"end"}>
            <HStack
              className="partners_logos"
              animation={`i-scroll-right-partner-logos ${
                resolvedParterLogos1.length + 20
              }s linear infinite`}
              ref={partnerLogos2Ref}
              w="max"
              gap={"80px"}
            >
              {resolvedParterLogos2.map((imgUrl: string, idx: number) => (
                <Image key={`${idx}-${imgUrl}`} src={imgUrl} h={"40px"} />
              ))}
            </HStack>
          </CContainer>
        </EditableContentContainer>
      </CContainer>
    </CContainer>
  );
};
