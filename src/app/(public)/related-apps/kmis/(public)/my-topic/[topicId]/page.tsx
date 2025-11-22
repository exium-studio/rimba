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
import { Skeleton, Stack } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
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

  // Hooks
  const searchParams = useSearchParams();

  // States
  const isPublicTopic = searchParams.get("isPublic") === "1";
  const { error, initialLoading, data, onRetry, makeRequest } =
    useDataState<any>({
      initialData: undefined,
      url: isPublicTopic
        ? `/api/kmis/learning-course/show/${topicId}`
        : `/api/kmis/learning-course/detail/${topicId}`,
      dependencies: [],
      dataResource: false,
    });
  const links: { label: string; path: string }[] = [
    {
      label: "KMIS",
      path: "/related-apps/kmis",
    },
  ];

  if (!data?.topic?.title) {
    links.push({
      label: l.my_course,
      path: "/related-apps/kmis/my-topic",
    });
  }

  links.push({
    label: data?.learningAttempt?.topic?.title || data?.topic?.title,
    path: "",
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
              path: "/related-apps/kmis/my-topic",
            },
            {
              label: "Loading...",
              path: "",
            },
          ]}
          mb={4}
        />

        <Stack
          flexDir={["column", null, "row"]}
          flex={1}
          gap={4}
          w={"full"}
          align={"stretch"}
        >
          <CContainer flex={1} gap={4}>
            <Skeleton flex={1} rounded={"xl"} />
          </CContainer>

          <Skeleton flex={3.5} rounded={"xl"} minH={"400px"} />
        </Stack>
      </LPSectionContainer>
    ),
    error: <FeedbackRetry onRetry={onRetry} minH={"400px"} />,
    empty: <FeedbackNoData minH={"400px"} />,
    loaded: (
      <>
        <LPSectionContainer mb={4}>
          <Breadcrumbs links={links} />
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
        bg={"bgContent"}
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
