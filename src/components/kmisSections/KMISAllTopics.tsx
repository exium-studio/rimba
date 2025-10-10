"use client";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui/disclosure";
import { DisclosureHeaderContent } from "@/components/ui/disclosure-header-content";
import { P } from "@/components/ui/p";
import SearchInput from "@/components/ui/search-input";
import { Tooltip } from "@/components/ui/tooltip";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { KMISTopicItem } from "@/components/widget/KMISTopicItem";
import { Limitation } from "@/components/widget/Limitation";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Pagination } from "@/components/widget/Pagination";
import {
  Interface__KMISTopic,
  Interface__KMISTopicCategory,
} from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import { useScrollWithOffset } from "@/hooks/useScrollWithOffset";
import { isEmptyArray } from "@/utils/array";
import { capitalizeWords } from "@/utils/string";
import {
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props extends StackProps {}

const AllCategory = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`all-category-filter`, open, onOpen, onClose);

  // States
  const { error, initialLoading, data, onRetry } = useDataState<
    Interface__KMISTopicCategory[]
  >({
    initialData: undefined,
    url: `/api/kmis/public-request/get-all-category`,
    params: {
      limit: Infinity,
    },
    dependencies: [],
  });
  const render = {
    loading: <Skeleton rounded={"lg"} minH={"176px"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4}>
        {data?.map((category) => {
          const isChecked = filter.category.includes(category.id);

          return (
            <Checkbox
              key={category.id}
              checked={isChecked}
              onCheckedChange={(e) => {
                setFilter({
                  ...filter,
                  category: e
                    ? [...filter.category, category.id]
                    : filter.category.filter(
                        (id: string) => id !== category.id
                      ),
                });
              }}
            >
              <Tooltip content={category.title}>
                <P fontWeight={"normal"} lineClamp={1}>
                  {category.title}
                </P>
              </Tooltip>
            </Checkbox>
          );
        })}
      </CContainer>
    ),
  };

  return (
    <>
      <Btn variant={"ghost"} colorPalette={"p"} onClick={onOpen} {...restProps}>
        {l.all_categories}
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={`${capitalizeWords(l.all_categories)}`}
            />
          </DisclosureHeader>

          <DisclosureBody>
            <CContainer gap={4}>
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
          </DisclosureBody>

          <DisclosureFooter>
            <Btn variant={"outline"}>Reset</Btn>
            <Btn colorPalette={"p"}>{l.apply}</Btn>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};
const CategoryFilter = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const { error, initialLoading, data, onRetry } = useDataState<
    Interface__KMISTopicCategory[]
  >({
    initialData: undefined,
    url: `/api/kmis/public-request/get-all-category`,
    params: {
      limit: 5,
    },
    dependencies: [],
  });
  const render = {
    loading: (
      <CContainer px={4}>
        <Skeleton rounded={"lg"} minH={"176px"} />
      </CContainer>
    ),
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4} px={4}>
        {data?.map((category) => {
          const isChecked = filter.category.includes(category.id);

          return (
            <Checkbox
              key={category.id}
              checked={isChecked}
              onCheckedChange={(e) => {
                setFilter({
                  ...filter,
                  category: e
                    ? [...filter.category, category.id]
                    : filter.category.filter(
                        (id: string) => id !== category.id
                      ),
                });
              }}
            >
              <Tooltip content={category.title}>
                <P fontWeight={"normal"} lineClamp={1}>
                  {category.title}
                </P>
              </Tooltip>
            </Checkbox>
          );
        })}
      </CContainer>
    ),
  };

  return (
    <AccordionRoot
      multiple
      defaultValue={["category_filter"]}
      border={"1px solid"}
      borderColor={"d1"}
      rounded={"xl"}
      bg={"body"}
      {...restProps}
    >
      <AccordionItem value="category_filter" border={"none"}>
        <AccordionItemTrigger px={4}>
          <P>{l.category}</P>
        </AccordionItemTrigger>

        <AccordionItemContent p={0} pt={4}>
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

          <CContainer p={2} pt={0}>
            <AllCategory w={"full"} mt={4} filter={filter} setFilter={filter} />
          </CContainer>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
const Filters = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  return (
    <CContainer flex={1} {...restProps}>
      <CategoryFilter filter={filter} setFilter={setFilter} />
    </CContainer>
  );
};

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
    dependencies: [],
  });
  const render = {
    loading: <Skeleton rounded={"lg"} h={"full"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer ref={topicListContainerRef} gap={4}>
        <SimpleGrid columns={[1, 2, 3, null, 4]} gap={4}>
          {data?.map((topic, idx) => {
            return <KMISTopicItem key={idx} topic={topic} idx={idx} />;
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
    setFr(false);
  }, []);
  useEffect(() => {
    if (!fr) {
      if (data) {
        scrollTo(topicListContainerRef, 122);
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

export const KMISAllTopics = (props: Props) => {
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
      {/* Filters */}
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

        <SearchInput flex={"1 1 200px"} />
      </HStack>

      {/* Content */}
      <Stack
        flexDir={["column", null, "row"]}
        mt={4}
        align={"stretch"}
        gapX={8}
        gapY={4}
      >
        <Filters filter={filter} setFilter={setFilter} />

        <Data filter={filter} />
      </Stack>
    </LPSectionContainer>
  );
};
