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
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import SearchInput from "@/components/ui/search-input";
import { Tooltip } from "@/components/ui/tooltip";
import BackButton from "@/components/widget/BackButton";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
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
import { formatDate } from "@/utils/formatter";
import { capitalizeWords } from "@/utils/string";
import { imgUrl } from "@/utils/url";
import {
  Badge,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import { IconEye, IconRefresh, IconRocket } from "@tabler/icons-react";
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

const DetailTopic = (props: any) => {
  // Props
  const { topic, idx, ...restProps } = props;
  const resolvedTopic: Interface__KMISTopic = topic;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`topic-detail-${topic.id}-${idx}`, open, onOpen, onClose);

  // States
  const { error, loading, data, onRetry } = useDataState<any>({
    initialData: undefined,
    url: `/api/kmis/public-request/get-topic/${resolvedTopic.id}`,
    conditions: open,
    dependencies: [open],
  });
  const render = {
    loading: <Skeleton minH={"400px"} />,
    error: <FeedbackRetry onRetry={onRetry} minH={"400px"} />,
    empty: <FeedbackNoData minH={"400px"} />,
    loaded: (
      <CContainer gap={8}>
        <HStack gapX={8} gapY={4}>
          <Img
            src={imgUrl(data?.topicCover?.[0]?.filePath)}
            aspectRatio={1.1}
            fluid
            rounded={"lg"}
          />

          <CContainer gap={2}>
            <Badge w={"fit"}>{data?.category.title}</Badge>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {data?.title}
            </P>

            <HStack color={"fg.subtle"}>
              <Icon>
                <IconRocket stroke={1.5} />
              </Icon>

              <P>{formatDate(data?.createdAt)}</P>
            </HStack>

            <HStack color={"fg.subtle"}>
              <Icon>
                <IconRefresh stroke={1.5} />
              </Icon>

              <P>{formatDate(data?.updatedAt as string)}</P>
            </HStack>

            <HStack gap={4} align={"end"} mt={"auto"}>
              <HStack align={"end"}>
                <P fontSize={"lg"}>123</P>
                <P>{l.student}</P>
              </HStack>

              <Btn colorPalette={"p"}>{l.start_learning}</Btn>
            </HStack>
          </CContainer>
        </HStack>

        <P>{data?.description}</P>

        <CContainer>
          <P fontWeight={"semibold"}>Terstimonial</P>

          <CContainer>
            <HStack w={"max"}></HStack>
          </CContainer>
        </CContainer>
      </CContainer>
    ),
  };

  return (
    <>
      <Btn
        colorPalette={"p"}
        variant={"outline"}
        onClick={onOpen}
        {...restProps}
      >
        <Icon>
          <IconEye stroke={1.5} />
        </Icon>
        {l.view}
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xl"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={`Detail ${topic.title}`} />
          </DisclosureHeader>

          <DisclosureBody>
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
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
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
            return (
              <CContainer
                className="ss"
                key={topic.id}
                rounded={"lg"}
                overflow={"clip"}
                border={"1px solid"}
                borderColor={"d1"}
              >
                <Img
                  key={topic?.topicCover?.[0]?.filePath}
                  src={imgUrl(topic?.topicCover?.[0]?.filePath)}
                  aspectRatio={1.1}
                  rounded={"lg"}
                />

                <CContainer p={4} gap={2} pos={"relative"}>
                  <Badge pos={"absolute"} top={"-28px"} left={2}>
                    <P fontSize={"xs"} lineClamp={1} maxW={"100px"}>
                      {topic.category.title}
                    </P>
                  </Badge>

                  <P fontSize={"lg"} fontWeight={"semibold"} lineClamp={1}>
                    {topic.title}
                  </P>

                  <P color={"fg.subtle"} lineClamp={1}>
                    {topic.description}
                  </P>
                </CContainer>

                <CContainer p={2} pt={0}>
                  <DetailTopic topic={topic} idx={idx} />
                </CContainer>
              </CContainer>
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
