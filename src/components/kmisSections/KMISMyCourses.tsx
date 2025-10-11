"use client";

import { KMISCourseFilters } from "@/components/kmisSections/KMISCourseFilters";
import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import SearchInput from "@/components/ui/search-input";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { KMISCourseItem } from "@/components/widget/KMISCourseItem";
import { Limitation } from "@/components/widget/Limitation";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { MiniProfile } from "@/components/widget/MiniProfile";
import { Pagination } from "@/components/widget/Pagination";
import { Interface__KMISQuizAssessment } from "@/constants/interfaces";
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
  } = useDataState<Interface__KMISQuizAssessment[]>({
    initialData: undefined,
    url: `/api/kmis/learning-course/get-all-learning-attempt`,
    params: {
      search: filter.search,
      categoryId: filter.category,
    },
    dependencies: [filter],
  });
  const render = {
    loading: <Skeleton rounded={"lg"} h={"full"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer ref={topicListContainerRef} gap={4}>
        <SimpleGrid columns={[1, null, 2, 3, null, 4]} gap={4}>
          {data?.map((item, idx) => {
            return (
              <KMISCourseItem key={idx} myCourse topic={item.topic} idx={idx} />
            );
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

export const KMISMyCourses = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const DEFAULT_FILTER = {
    search: "",
    isCompleted: null,
    category: [],
  };
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  return (
    <LPSectionContainer
      outerContainerProps={{
        flex: 1,
      }}
      flex={1}
      {...restProps}
    >
      {/* Content */}
      <Stack flexDir={["column", null, "row"]} align={"stretch"} gap={4}>
        <CContainer flex={1} gap={4}>
          <MiniProfile />

          <KMISCourseFilters filter={filter} setFilter={setFilter} />
        </CContainer>

        <CContainer flex={3.5} gap={4}>
          <HStack wrap={"wrap"} gap={4}>
            <CContainer flex={"2 0 300px"} gap={1}>
              <P fontSize={"lg"} fontWeight={"semibold"}>
                {l.my_course}
              </P>
            </CContainer>

            <SearchInput
              flex={"1 1 200px"}
              inputValue={filter.search}
              onChange={(inputValue) => {
                setFilter({ ...filter, search: inputValue });
              }}
            />
          </HStack>

          <Data filter={filter} />
        </CContainer>
      </Stack>
    </LPSectionContainer>
  );
};
