"use client";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { P } from "@/components/ui/p";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSFAQs } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const HelpDeskHelper = () => {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer gap={2} p={4} rounded={"xl"} bg={"body"} mt={"auto"}>
      <P fontSize={"lg"} fontWeight={"medium"}>
        {l.msg_still_have_question}
      </P>

      <P color={"fg.muted"}>{l.msg_ask_our_help_desk}</P>
    </CContainer>
  );
};

export const LPFAQs = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const FAQs = useContents((s) => s.FAQs);

  // Hooks
  const iss = useIsSmScreenWidth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation
  useGSAP(
    () => {
      gsap.from(".content_1", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
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
        },
        x: !iss ? "20%" : "",
        y: iss ? "20%" : "",
        opacity: 0,
        duration: 0.75,
      });
    },
    { scope: containerRef }
  );

  return (
    <CContainer ref={containerRef} roundedBottom={"3xl"} {...restProps}>
      <LPSectionContainer py={"80px"} gap={4}>
        <SimpleGrid columns={[1, null, 2]} gapX={"80px"} gapY={8}>
          <CContainer className="content_1" gap={4}>
            <H2
              className="section_title"
              fontWeight={"bold"}
              color={"p.700"}
              maxW={"400px"}
              textAlign={["center", null, "left"]}
            >
              Frequently Asked Questions
            </H2>

            {!iss && <HelpDeskHelper />}
          </CContainer>

          <CContainer className="content_2">
            <AccordionRoot multiple>
              <CContainer gap={4}>
                {FAQs.map((faq: Interface__CMSFAQs, idx: number) => {
                  return (
                    <AccordionItem
                      key={idx}
                      value={`${idx}`}
                      py={2}
                      pl={5}
                      pr={4}
                      bg={"body"}
                      border={"none"}
                      rounded={"xl"}
                    >
                      <AccordionItemTrigger py={4}>
                        <P fontSize={"lg"} fontWeight={"semibold"}>
                          {faq?.question?.[lang]}
                        </P>
                      </AccordionItemTrigger>

                      <AccordionItemContent>
                        <P color={"fg.muted"}>{faq?.answer?.[lang]}</P>
                      </AccordionItemContent>
                    </AccordionItem>
                  );
                })}
              </CContainer>
            </AccordionRoot>
          </CContainer>
        </SimpleGrid>

        {iss && <HelpDeskHelper />}
      </LPSectionContainer>
    </CContainer>
  );
};
