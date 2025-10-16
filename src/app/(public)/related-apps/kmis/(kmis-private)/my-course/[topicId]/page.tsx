"use client";

import { KMISLearningSection } from "@/components/kmisSections/KMISLearningSection";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { TopNav } from "@/components/widget/TopNav";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { HStack, Skeleton } from "@chakra-ui/react";
import React from "react";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
}

export default function Page(props: Props) {
  // Props
  const { topicId } = React.use<{ topicId: string }>(props.params);

  // Contexts
  const { l } = useLang();

  // States
  const { error, initialLoading, data, onRetry, makeRequest } =
    useDataState<any>({
      initialData: undefined,
      url: `/api/kmis/learning-course/detail/${topicId}`,
      dependencies: [],
      dataResource: false,
    });
  const render = {
    loading: (
      <LPSectionContainer flex={1} minH={"400px"}>
        <Breadcrumbs
          links={[
            {
              label: "KMIS",
              path: "/related-apps/kmis",
            },
            {
              label: l.my_course,
              path: "/related-apps/kmis/my-course",
            },
            {
              label: "Loading...",
              path: "",
            },
          ]}
          mb={4}
        />

        <HStack flex={1} gap={4} w={"full"} align={"stretch"}>
          <CContainer flex={1} gap={4}>
            <Skeleton flex={1} rounded={"xl"} />
          </CContainer>

          <Skeleton flex={3.5} rounded={"xl"} minH={"400px"} />
        </HStack>
      </LPSectionContainer>
    ),
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <>
        <LPSectionContainer mb={4}>
          <Breadcrumbs
            links={[
              {
                label: "KMIS",
                path: "/related-apps/kmis",
              },
              {
                label: l.my_course,
                path: "/related-apps/kmis/my-course",
              },
              {
                label: data?.learningAttempt?.topic?.title,
                path: "",
              },
            ]}
          />
        </LPSectionContainer>

        <KMISLearningSection
          courseDetail={data}
          getCourseDetail={makeRequest}
        />
      </>
    ),
  };

  return (
    <CContainer minH={"100dvh"}>
      <TopNav />

      <CContainer
        flex={1}
        // border={"2px solid red"}
        bg={"body"}
        rounded={"3xl"}
        overflow={"clip"}
        zIndex={2}
        pt={"120px"}
        pb={[4, null, 12]}
      >
        {initialLoading && render.loading}
        {!initialLoading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}
                {!data && render.empty}
              </>
            )}
          </>
        )}
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
