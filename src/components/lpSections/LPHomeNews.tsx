"use client";

import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__CMSNews } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { SimpleGrid, StackProps } from "@chakra-ui/react";

const NewsItem = (props: any) => {
  // Props
  const { news: propsNews, ...restProps } = props;
  const news = propsNews as Interface__CMSNews;

  // Contexts
  const { lang } = useLang();

  return (
    <SimpleGrid columns={[1, null, 2]} gap={8} {...restProps}>
      <CContainer>
        <Img
          src={news?.thumbnail?.[0]?.fileUrl}
          w={"full"}
          aspectRatio={4 / 3}
          rounded={"3xl"}
        />
      </CContainer>

      <CContainer justify={"center"}>
        <P fontSize={"xl"} fontWeight={"semibold"}>
          {news.title[lang]}
        </P>
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

  return (
    <CContainer bg={"bg.subtle"} py={"80px"} {...restProps}>
      <LPSectionContainer>
        <EditableContentContainer content={staticContents[52]} mx={"auto"}>
          <H2
            className="section_title"
            fontWeight={"bold"}
            color={"p.200"}
            textAlign={"center"}
          >
            {staticContents[52]?.content[lang]}
          </H2>
        </EditableContentContainer>

        <CContainer mt={"80px"} gap={8}>
          {homeNews?.map((news: Interface__CMSNews) => {
            return <NewsItem key={news.id} news={news} />;
          })}
        </CContainer>
      </LPSectionContainer>
    </CContainer>
  );
};
