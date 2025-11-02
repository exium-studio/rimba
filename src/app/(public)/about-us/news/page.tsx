"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { CSpinner } from "@/components/ui/c-spinner";
import { NumInput } from "@/components/ui/number-input";
import SearchInput from "@/components/ui/search-input";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { NewsItem } from "@/components/widget/NewsItem";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { Interface__CMSNews } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { isEmptyArray } from "@/utils/array";
import { HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import { useState } from "react";

const ListSection = () => {
  // Contexts
  const { l } = useLang();

  // States
  const DEFAULT_FILTER = {
    search: "",
    year: null as number | null,
  };
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const { error, loading, data, makeRequest } = useDataState<
    Interface__CMSNews[]
  >({
    initialData: undefined,
    url: `/api/cms/public-request/get-all-news`,
    dependencies: [],
  });

  // render
  const render = {
    loading: <CSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <SimpleGrid columns={[1, null, 2, 4]} gap={6}>
        {data?.map((news) => {
          return (
            <NewsItem
              key={news.id}
              news={news}
              border={"1px solid"}
              borderColor={"border.muted"}
            />
          );
        })}
      </SimpleGrid>
    ),
  };

  return (
    <LPSectionContainer py={"80px"}>
      <Stack flexDir={["column", null, "row"]}>
        <SearchInput
          onChange={(inputValue) =>
            setFilter({ ...filter, search: inputValue })
          }
          inputValue={filter.search}
          w={["", null, "300px"]}
          debounceTime={0}
        />

        <HStack>
          <NumInput
            onChange={(inputValue) =>
              setFilter({ ...filter, year: inputValue })
            }
            inputValue={filter.year}
            formatted={false}
            placeholder={l.year}
            w={["", null, "110px"]}
          />

          <Btn
            variant={"outline"}
            onClick={() => setFilter(DEFAULT_FILTER)}
            size={"md"}
          >
            Reset
          </Btn>

          <Btn
            onClick={() => setFilter(DEFAULT_FILTER)}
            colorPalette={"p"}
            size={"md"}
          >
            {l.search}
          </Btn>
        </HStack>
      </Stack>

      <CContainer mt={12}>
        {loading && render.loading}
        {!loading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}
                {(!data || isEmptyArray(data)) && render.empty}
              </>
            )}
          </>
        )}
      </CContainer>
    </LPSectionContainer>
  );
};

export default function NewsPage() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[114]}
        img={`${IMAGES_PATH}/lp/about-us/news/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          {
            label: staticContents[114].content[lang],
            path: "/about-us/news",
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
        <ListSection />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
