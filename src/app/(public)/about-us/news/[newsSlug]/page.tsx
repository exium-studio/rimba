"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { CContainer } from "@/components/ui/c-container";
import { CSpinner } from "@/components/ui/c-spinner";
import { P } from "@/components/ui/p";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { Interface__CMSNews } from "@/constants/interfaces";
import { R_SPACING } from "@/constants/sizes";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { isEmptyArray } from "@/utils/array";
import { formatDate } from "@/utils/formatter";
import { Badge, HStack, Icon, Stack } from "@chakra-ui/react";
import { IconArticleOff, IconCircleFilled } from "@tabler/icons-react";
import parse from "html-react-parser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  level: number;
  text: string;
};

export default function Page() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const { newsSlug } = useParams<{ newsSlug: string }>();

  // States
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__CMSNews>({
      initialData: undefined,
      url: `/api/cms/public-request/get-news-by-slug/${newsSlug}`,
      dependencies: [],
      dataResource: false,
    });
  const [toc, setToc] = useState<TocItem[]>([]);
  const [html, setHtml] = useState("");
  const render = {
    loading: <CSpinner />,
    error: <FeedbackRetry onRetry={onRetry} my={"80px"} />,
    empty: <FeedbackNoData my={"80px"} />,
    loaded: (
      <LPSectionContainer py={"80px"} overflowY={"auto"}>
        <Stack flexDir={["column", null, "row"]} gap={R_SPACING}>
          <CContainer
            w={["full", null, "30%"]}
            bg={"bg.subtle"}
            rounded={"lg"}
            h={"fit"}
            pos={["", null, "sticky"]}
            top={"0"}
          >
            <CContainer
              bg={"p.500"}
              color={"white"}
              p={4}
              fontSize={"lg"}
              fontWeight={"bold"}
              rounded={"lg"}
            >
              {l.table_of_content}
            </CContainer>

            <CContainer p={4} pl={0}>
              <AccordionRoot multiple defaultValue={["toc"]}>
                <AccordionItem value="toc" border={"none"}>
                  <AccordionItemTrigger indicatorPlacement="start" ml={2} p={0}>
                    <CContainer>
                      <P>{formatDate(data?.updatedAt || Date())}</P>
                    </CContainer>
                  </AccordionItemTrigger>

                  <AccordionItemContent p={0}>
                    <CContainer pl={4} pt={4} overflow={"visible"}>
                      {isEmptyArray(toc) && (
                        <FeedbackNoData
                          icon={<IconArticleOff />}
                          title=""
                          description={l.table_of_content}
                        />
                      )}

                      {!isEmptyArray(toc) &&
                        toc?.map((item) => (
                          <HStack
                            key={item.id}
                            pos={"relative"}
                            borderLeft={"1px solid"}
                            borderColor={"p.500"}
                            pl={4}
                            py={2}
                            cursor={"pointer"}
                            onClick={() =>
                              document
                                .getElementById(item.id)
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                          >
                            <Icon
                              boxSize={3}
                              color={"p.500"}
                              zIndex={2}
                              pos={"absolute"}
                              left={"-6px"}
                              top={"50%"}
                              transform={"translateY(-50%)"}
                            >
                              <IconCircleFilled />
                            </Icon>
                            <P key={item?.id} fontWeight={"medium"}>
                              {item?.text}
                            </P>
                          </HStack>
                        ))}
                    </CContainer>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </CContainer>
          </CContainer>

          <CContainer gap={8}>
            <Badge size={"lg"} w={"fit"}>
              {data ? data?.newsCategory?.name?.[lang] : ""}
            </Badge>

            <P fontSize={"lg"} color={"fg.muted"}>
              {data ? data?.description?.[lang] : ""}
            </P>

            {parse(html || "")}
          </CContainer>
        </Stack>
      </LPSectionContainer>
    ),
  };

  // initialize content
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      data?.newsContent?.[lang] || "",
      "text/html"
    );

    const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));

    const items: TocItem[] = headings.map((el, idx) => {
      const id = `heading-${idx}`;
      el.setAttribute("id", id);
      return {
        id,
        level: Number(el.tagName.replace("H", "")),
        text: el.textContent || "",
      };
    });

    setToc(items);
    setHtml(doc.body.innerHTML);
  }, [data]);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        title={data ? data?.title?.[lang] : "Loading..."}
        img={data ? data?.thumbnail?.[0]?.fileUrl : ``}
        links={[
          { label: l.lp_navs.home, path: "/" },
          {
            label: staticContents[114].content[lang],
            path: "/about-us/news",
          },
          {
            label: data ? data?.title?.[lang] : "Loading...",
            path: `/document/${data?.id}`,
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
        {initialLoading && render.loading}
        {!initialLoading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}
                {!data && render.empty}
              </>
            )}
          </>
        )}
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
