"use client";

import { KMISCourseFilters } from "@/components/kmisSections/KMISCourseFilters";
import { CContainer } from "@/components/ui/c-container";
import { H3 } from "@/components/ui/heading";
import SearchInput from "@/components/ui/search-input";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { KMISTopicItem } from "@/components/widget/KMISTopicItem";
import { Limitation } from "@/components/widget/Limitation";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Pagination } from "@/components/widget/Pagination";
import { SelectCourseFinishedStatus } from "@/components/widget/SelectCourseFinishedStatus";
import { SelectKMISTopicType } from "@/components/widget/SelectKMISTopicType";
import { Interface__KMISLearningAttempt } from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { isEmptyArray } from "@/utils/array";
import { capitalizeWords } from "@/utils/string";
import {
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface Props extends StackProps {}

const Data = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Hooks
  // const scrollTo = useScrollWithOffset();

  // Refs
  const topicListContainerRef = useRef<HTMLDivElement>(null);

  // States
  // const [fr, setFr] = useState<boolean>(true);
  // const initialLoading = true;
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
  } = useDataState<Interface__KMISLearningAttempt[]>({
    initialData: undefined,
    url: `/api/kmis/learning-course/get-all-learning-attempt`,
    params: {
      search: filter.search,
      categoryId: filter.category,
      finishedStatus: filter.finishedStatus?.[0]?.id,
      topicType: filter.topicType,
    },
    dependencies: [filter],
  });
  const render = {
    loading: (
      <Skeleton rounded={"lg"} minH={"calc(100vh - 37px - 140px - 64px)"} />
    ),
    error: (
      <FeedbackRetry
        onRetry={onRetry}
        minH={"calc(100vh - 37px - 140px - 64px)"}
      />
    ),
    empty: <FeedbackNoData minH={"calc(100vh - 37px - 140px - 64px)"} />,
    loaded: (
      <Stack flexDir={["column", null, "row"]} align={"stretch"} gap={4}>
        <CContainer flex={1} gap={4}>
          {/* <MiniProfile /> */}

          <KMISCourseFilters filter={filter} setFilter={setFilter} />
        </CContainer>

        <CContainer ref={topicListContainerRef} gap={4}>
          <SimpleGrid columns={[1, null, 2, 3, null, 4]} gap={4}>
            {data?.map((item, idx) => {
              return (
                <KMISTopicItem
                  key={idx}
                  myCourse
                  learningAttempt={item}
                  topic={item.topic}
                  idx={idx}
                />
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
      </Stack>
    ),
  };

  // useEffect(() => {
  //   if (!fr) {
  //     if (data) {
  //       scrollTo(topicListContainerRef, 160);
  //     }
  //   } else {
  //     if (data) {
  //       setFr(false);
  //     }
  //   }
  // }, [data]);

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

export const KMISMyTopic = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const DEFAULT_FILTER: any = {
    search: "",
    finishedStatus: null,
    category: [],
    topicType: ["Pelatihan", "Pengetahuan"],
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
      <CContainer flex={3.5} gap={4}>
        <CContainer gap={4}>
          <CContainer w={"fit"} gap={1}>
            <H3 fontWeight={"semibold"}>{capitalizeWords(l.my_course)}</H3>
          </CContainer>

          <HStack>
            <SearchInput
              flex={"1 1 200px"}
              inputValue={filter.search}
              onChange={(inputValue) => {
                setFilter({ ...filter, search: inputValue });
              }}
            />

            <SelectKMISTopicType
              multiple
              inputValue={filter.topicType?.map((item: string) => {
                return {
                  id: item,
                  label: item,
                };
              })}
              onConfirm={(inputValue) => {
                setFilter({
                  ...filter,
                  topicType: inputValue?.map((item: any) => {
                    return item.id;
                  }),
                });
              }}
              placeholder={l.topic_type}
              w={"140px"}
            />

            <SelectCourseFinishedStatus
              inputValue={filter.finishedStatus}
              onConfirm={(inputValue) =>
                setFilter({ ...filter, finishedStatus: inputValue })
              }
              w={"140px"}
            />
          </HStack>
        </CContainer>

        <Data filter={filter} setFilter={setFilter} />
      </CContainer>
    </LPSectionContainer>
  );
};
