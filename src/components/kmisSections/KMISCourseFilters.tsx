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
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackNotFound from "@/components/widget/FeedbackNotFound";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { Interface__KMISTopicCategory } from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { isEmptyArray } from "@/utils/array";
import { back } from "@/utils/client";
import { capitalizeWords } from "@/utils/string";
import { Icon, Skeleton, useDisclosure } from "@chakra-ui/react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AllCategory = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`all-category-filter`, open, onOpen, onClose);

  // States
  const [search, setSearch] = useState<string>("");
  const { error, initialLoading, data, onRetry } = useDataState<
    Interface__KMISTopicCategory[]
  >({
    url: `/api/kmis/public-request/get-all-category`,
    params: {
      limit: "all",
    },
    dependencies: [],
  });
  const resolvedData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const render = {
    loading: <Skeleton rounded={"lg"} minH={"176px"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4}>
        <SearchInput
          queryKey="all-category-search"
          inputProps={{
            variant: "flushed",
            rounded: 0,
          }}
          inputValue={search}
          onChange={(inputValue) => {
            setSearch(inputValue);
          }}
        />

        {isEmptyArray(resolvedData) && <FeedbackNotFound />}

        {resolvedData?.map((category) => {
          const isChecked = filter.category.includes(category.id);

          return (
            <Checkbox
              key={category.id}
              checked={isChecked}
              onCheckedChange={() => {
                setFilter({
                  ...filter,
                  category: !isChecked
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
      <Btn
        variant={"outline"}
        onClick={onOpen}
        justifyContent={"space-between"}
        {...restProps}
      >
        {l.all_categories}

        <Icon color={"fg.subtle"} boxSize={4} mr={"-2px"}>
          <IconCaretDownFilled stroke={1.5} />
        </Icon>
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent
              title={`${capitalizeWords(l.all_categories)}`}
            />
          </DisclosureHeader>

          <DisclosureBody pt={2}>
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
            <Btn
              variant={"outline"}
              onClick={() => {
                setFilter({ ...filter, category: [] });
              }}
            >
              Reset
            </Btn>
            <Btn colorPalette={"p"} onClick={back}>
              {l.confirm}
            </Btn>
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

  // Hooks
  const iss = useIsSmScreenWidth();
  const pathname = usePathname();

  // States
  const isMyCourse = pathname === `/related-apps/kmis/my-topic`;
  const { error, initialLoading, data, onRetry } = useDataState<
    Interface__KMISTopicCategory[]
  >({
    initialData: undefined,
    url: `/api/kmis/public-request/get-all-category`,
    params: {
      limit: isMyCourse ? 10 : 5,
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
              onCheckedChange={() => {
                setFilter({
                  ...filter,
                  category: !isChecked
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
      defaultValue={iss ? [] : ["category_filter"]}
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

        <AccordionItemContent p={0} pt={2}>
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
            <AllCategory
              w={"full"}
              mt={4}
              filter={filter}
              setFilter={setFilter}
            />
          </CContainer>
        </AccordionItemContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
export const KMISCourseFilters = (props: any) => {
  // Props
  const { filter, setFilter, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const [localFilter, setLocalFilter] = useState(filter);

  // Utils
  function onConfirm() {
    setFilter(localFilter);
  }

  useEffect(() => {
    setLocalFilter(filter);
  }, [filter]);

  return (
    <CContainer flex={1} gap={4} {...restProps}>
      <CategoryFilter filter={localFilter} setFilter={setLocalFilter} />

      <Btn colorPalette={"p"} variant={"outline"} onClick={onConfirm}>
        {l.apply} filter
      </Btn>
    </CContainer>
  );
};
