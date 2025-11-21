"use client";

import { KMISCourseFilters } from "@/components/kmisSections/KMISCourseFilters";
import { CContainer } from "@/components/ui/c-container";
import SearchInput from "@/components/ui/search-input";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { KMISCourseItem } from "@/components/widget/KMISCourseItem";
import { Limitation } from "@/components/widget/Limitation";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { MiniProfile } from "@/components/widget/MiniProfile";
import { Pagination } from "@/components/widget/Pagination";
import { Interface__KMISTopic } from "@/constants/interfaces";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useDataState from "@/hooks/useDataState";
import { isEmptyArray } from "@/utils/array";
import { getAuthToken } from "@/utils/auth";
import {
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

interface Props extends StackProps {}

const Data = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Contexts
  const verifiedAuthToken = useAuthMiddleware((s) => s.verifiedAuthToken);
  const authToken = verifiedAuthToken || getAuthToken();

  // Hooks
  // const scrollTo = useScrollWithOffset();
  const searchParams = useSearchParams();

  // Refs
  const topicListContainerRef = useRef<HTMLDivElement>(null);

  // States
  const topicType = searchParams.get("topicType");
  // const [fr, setFr] = useState<boolean>(true);
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
      categoryId: filter.category,
      topicType: topicType?.split(", "),
    },
    dependencies: [filter, topicType],
  });
  const render = {
    loading: (
      <Skeleton
        rounded={"lg"}
        flex={1}
        minH={"calc(100vh - 37px - 140px - 64px - 200px)"}
      />
    ),
    error: (
      <FeedbackRetry
        onRetry={onRetry}
        minH={"calc(100vh - 37px - 140px - 64px - 200px)"}
      />
    ),
    empty: (
      <FeedbackNoData minH={"calc(100vh - 37px - 140px - 64px - 200px)"} />
    ),
    loaded: (
      <Stack flexDir={["column", null, "row"]} align={"stretch"} gap={4}>
        <CContainer flex={1} gap={4}>
          {authToken && <MiniProfile />}

          <KMISCourseFilters filter={filter} setFilter={setFilter} />
        </CContainer>

        <CContainer ref={topicListContainerRef} gap={4}>
          <SimpleGrid columns={[1, null, 2, 3, null, 4]} gap={4}>
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
    <CContainer flex={3.5} gap={4} {...restProps}>
      <CContainer gap={4}>
        <SearchInput
          inputValue={filter.search}
          onChange={(inputValue) => {
            setFilter({ ...filter, search: inputValue });
          }}
        />
      </CContainer>

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

export const KMISAllTopic = (props: Props) => {
  // Props
  const { ...restProps } = props;

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
      {...restProps}
    >
      {/* Content */}
      <Data filter={filter} setFilter={setFilter} />
    </LPSectionContainer>
  );
};
