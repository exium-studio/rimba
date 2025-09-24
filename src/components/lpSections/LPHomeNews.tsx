"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSNews } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { formatDate } from "@/utils/formatter";
import { Center, Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import gsap from "gsap";
import { useRef } from "react";

const NewsItem = (props: any) => {
  // Props
  const { news: propsNews, idx, ...restProps } = props;
  const news = propsNews as Interface__CMSNews;

  // Contexts
  const { l, lang } = useLang();

  // Refs
  const itemContainerRef = useRef<HTMLDivElement>(null);

  // States
  const oddIdx = idx % 2 === 1;

  // Animation
  useGSAP(
    () => {
      gsap.from(".news_date", {
        scrollTrigger: {
          trigger: itemContainerRef.current,
          start: "top bottom",
          scrub: true,
          // markers: true, // debug
        },
        y: "100%",
        duration: 0.75,
        stagger: 0.2,
      });
    },
    {
      scope: itemContainerRef,
    }
  );

  return (
    <SimpleGrid
      ref={itemContainerRef}
      className="news_item"
      columns={[1, null, 2]}
      gapX={"80px"}
      gapY={8}
      {...restProps}
    >
      <Center order={oddIdx ? 2 : 1} pos={"relative"}>
        <Img
          src={news?.thumbnail?.[0]?.fileUrl}
          w={"full"}
          aspectRatio={1}
          rounded={"3xl"}
        />

        <CContainer
          className="news_date ss"
          bg={"light"}
          w={"fit"}
          p={4}
          rounded={"xl"}
          border={"1px solid"}
          borderColor={"d1"}
          pos={"absolute"}
          top={8}
          left={-4}
        >
          <P fontSize={"lg"} fontWeight={"medium"} lineHeight={1}>
            {formatDate(news.createdAt, { variant: "year" })}
          </P>
        </CContainer>

        <CContainer
          className="news_date ss"
          bg={"p.500"}
          color={"light"}
          w={"fit"}
          p={4}
          rounded={"xl"}
          border={"1px solid"}
          borderColor={"d1"}
          pos={"absolute"}
          bottom={0}
          right={8}
        >
          <P fontSize={"xl"} fontWeight={"semibold"} lineHeight={1}>
            {formatDate(news.createdAt, { variant: "day" })}
          </P>
          <P>{formatDate(news.createdAt, { variant: "shortMonth" })}</P>
        </CContainer>
      </Center>

      <CContainer justify={"center"} gap={4} p={2} order={oddIdx ? 1 : 2}>
        <P fontSize={"xl"} fontWeight={"semibold"} lineClamp={2}>
          {news.title[lang]}
        </P>

        <P lineClamp={2}>{news.description[lang]}</P>

        <Btn
          w={"fit"}
          colorPalette={"p"}
          variant={"ghost"}
          pr={[5, null, 3]}
          ml={"auto"}
          mt={4}
        >
          {l.learn_more}
          <Icon>
            <IconArrowUpRight />
          </Icon>
        </Btn>
      </CContainer>
    </SimpleGrid>
  );
};

export const LPHomeNews = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const homeNews = useContents((s) => s.homeNews);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

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

      gsap.from(".news_item", {
        scrollTrigger: {
          trigger: ".news_item",
          start: "top 80%",
          // markers: true, // debug
        },
        y: "20%",
        opacity: 0,
        duration: 0.75,
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <LPSectionContainer
      ref={containerRef}
      py={"80px"}
      wrapperProps={{
        bg: "bg.subtle",
      }}
      {...restProps}
    >
      <EditableContentContainer content={staticContents[52]} mx={"auto"}>
        <H2
          className="section_title"
          fontWeight={"bold"}
          color={"p.700"}
          textAlign={"center"}
        >
          {staticContents[52]?.content[lang]}
        </H2>
      </EditableContentContainer>

      <CContainer mt={"80px"} gap={"80px"}>
        {homeNews?.map((news: Interface__CMSNews, idx: number) => {
          return <NewsItem key={news.id} news={news} idx={idx} />;
        })}
      </CContainer>
    </LPSectionContainer>
  );
};
