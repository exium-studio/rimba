"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { CSpinner } from "@/components/ui/c-spinner";
import SearchInput from "@/components/ui/search-input";
import { DocumentItem } from "@/components/widget/DocumentItem";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { SelectCMSLegalDocsCategory } from "@/components/widget/SelectCMSLegalDocsCategory";
import { TopNav } from "@/components/widget/TopNav";
import {
  Interface__CMSDocument,
  Interface__SelectOption,
} from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import useDataState from "@/hooks/useDataState";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import { isEmptyArray } from "@/utils/array";
import { HStack, SimpleGrid, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ListSection = () => {
  // Contexts
  const { rt, setRt } = useRenderTrigger();

  // Hooks
  const debounced = useDebouncedCallback(() => {
    setRt((rt) => !rt);
  }, 200);

  // States
  const DEFAULT_FILTER = {
    search: "",
    year: null as number | null,
    category: [] as Interface__SelectOption[] | null,
  };
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const { error, loading, data, makeRequest } = useDataState<
    Interface__CMSDocument[]
  >({
    initialData: undefined,
    url: `/api/cms/public-request/get-all-legal-document`,
    params: {
      search: filter.search,
      year: filter.year,
      categoryIds: filter.category && filter.category.map((c) => c.id),
    },
    dependencies: [rt],
  });

  useEffect(() => {
    debounced();
  }, [filter]);

  // render
  const render = {
    loading: <CSpinner />,
    error: <FeedbackRetry onRetry={makeRequest} />,
    empty: <FeedbackNoData />,
    loaded: (
      <SimpleGrid columns={[1, null, 2, 4]} gap={6} mt={"32px"}>
        {data?.map((doc: Interface__CMSDocument) => {
          return <DocumentItem key={doc.id} document={doc} zIndex={2} />;
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
          {/* <NumInput
            onChange={(inputValue) =>
              setFilter({ ...filter, year: inputValue })
            }
            inputValue={filter.year}
            formatted={false}
            placeholder={l.year}
            w={["", null, "110px"]}
          /> */}

          <SelectCMSLegalDocsCategory
            multiple
            inputValue={filter.category}
            onConfirm={(inputValue: any) => {
              setFilter({ ...filter, category: inputValue });
            }}
          />

          <Btn
            variant={"outline"}
            onClick={() => setFilter(DEFAULT_FILTER)}
            size={"md"}
          >
            Reset
          </Btn>
          {/* 
          <Btn
            onClick={() => setRt((rt) => !rt)}
            colorPalette={"p"}
            size={"md"}
          >
            {l.search}
          </Btn> */}
        </HStack>
      </Stack>

      <CContainer mt={8}>
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

export default function DocumentsPage() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[65]}
        img={`${IMAGES_PATH}/lp/documents/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[65].content[lang], path: "/document" },
        ]}
      />

      <CContainer
        bg={"light"}
        rounded={"3xl"}
        mt={"-24px"}
        overflow={"clip"}
        zIndex={2}
      >
        <ListSection />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
