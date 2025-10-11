"use client";

import { KMISCourseFilters } from "@/components/kmisSections/KMISCourseFilters";
import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import SearchInput from "@/components/ui/search-input";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { KMISCourseItem } from "@/components/widget/KMISCourseItem";
import { Limitation } from "@/components/widget/Limitation";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Pagination } from "@/components/widget/Pagination";
import { Interface__KMISTopic } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { useScrollWithOffset } from "@/hooks/useScrollWithOffset";
import { isEmptyArray } from "@/utils/array";
import {
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props extends StackProps {}

const Data = (props: any) => {
  // Props
  const { filter, ...restProps } = props;

  // Hooks
  const scrollTo = useScrollWithOffset();

  // Refs
  const topicListContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [fr, setFr] = useState<boolean>(true);
  const {
    error,
    initialLoading,
    data,
    onRetry,
    limit,
    setLimit,
    page,
    setPage,
    pagination,
  } = useDataState<Interface__KMISTopic[]>({
    initialData: undefined,
    url: `/api/kmis/public-request/get-all-topic`,
    params: {
      search: filter.search,
      category: filter.category,
    },
    dependencies: [filter],
  });
  const render = {
    loading: <Skeleton rounded={"lg"} h={"full"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer ref={topicListContainerRef} gap={4}>
        <SimpleGrid columns={[1, null, 2, 3, 4]} gap={4}>
          {data?.map((topic, idx) => {
            return <KMISCourseItem key={idx} topic={topic} idx={idx} />;
          })}
        </SimpleGrid>

        <HStack justify={"space-between"}>
          <Limitation limit={limit} setLimit={setLimit} />

          <Pagination
            page={page}
            setPage={setPage}
            totalPage={pagination?.meta?.last_page}
          />
        </HStack>
      </CContainer>
    ),
  };

  useEffect(() => {
    if (!fr) {
      if (data) {
        scrollTo(topicListContainerRef, 122);
      }
    } else {
      if (data) {
        setFr(false);
      }
    }
  }, [data]);

  return (
    <CContainer flex={3} {...restProps}>
      {initialLoading && render.loading}
      {!initialLoading && (
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
  );
};

export const KMISAllCourses = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // States
  const DEFAULT_FILTER = {
    search: "",
    category: [],
  };
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  return (
    <LPSectionContainer
      outerContainerProps={{
        flex: 1,
      }}
      flex={1}
      pb={[4, null, 12]}
      {...restProps}
    >
      <HStack wrap={"wrap"} gap={4}>
        <CContainer flex={"2 0 300px"} gap={1}>
          <EditableContentContainer content={staticContents[118]} w={"fit"}>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {staticContents[118]?.content[lang]}
            </P>
          </EditableContentContainer>

          <EditableContentContainer content={staticContents[119]} w={"fit"}>
            <P color={"fg.subtle"}>{staticContents[119]?.content[lang]}</P>
          </EditableContentContainer>
        </CContainer>

        <SearchInput
          flex={"1 1 200px"}
          inputValue={filter.search}
          onChange={(inputValue) => {
            setFilter({ ...filter, search: inputValue });
          }}
        />
      </HStack>

      {/* Content */}
      <Stack
        flexDir={["column", null, "row"]}
        mt={4}
        align={"stretch"}
        gapX={8}
        gapY={4}
      >
        <KMISCourseFilters filter={filter} setFilter={setFilter} />

        <Data filter={filter} />
      </Stack>
    </LPSectionContainer>
  );
};
