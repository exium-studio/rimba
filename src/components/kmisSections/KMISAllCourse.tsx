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
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { Interface__KMISTopicCategory } from "@/constants/interfaces";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import { isEmptyArray } from "@/utils/array";
import { capitalizeWords } from "@/utils/string";
import { HStack, Skeleton, StackProps, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

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
    loading: <Skeleton rounded={"lg"} minH={"176px"} />,
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
      rounded={"lg"}
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

export const KMISAllCourse = (props: Props) => {
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
    <LPSectionContainer {...restProps}>
      <HStack>
        <CContainer flex={2} gap={1}>
          <EditableContentContainer content={staticContents[118]} w={"fit"}>
            <P fontSize={"lg"} fontWeight={"semibold"}>
              {staticContents[118]?.content[lang]}
            </P>
          </EditableContentContainer>

          <EditableContentContainer content={staticContents[119]} w={"fit"}>
            <P color={"fg.subtle"}>{staticContents[119]?.content[lang]}</P>
          </EditableContentContainer>
        </CContainer>

        <SearchInput flex={1} />
      </HStack>

      <HStack mt={4}>
        <CContainer flex={1}>
          <CategoryFilter filter={filter} setFilter={setFilter} />
        </CContainer>

        <CContainer flex={3}></CContainer>
      </HStack>
    </LPSectionContainer>
  );
};
