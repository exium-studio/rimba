"use client";

import { KMISLearningSection } from "@/components/kmisSections/KMISLearningSection";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { TopNav } from "@/components/widget/TopNav";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
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
  const { error, initialLoading, data, onRetry } = useDataState<any>({
    initialData: undefined,
    url: `/api/kmis/learning-course/show/${topicId}`,
    dependencies: [],
    dataResource: false,
  });

  console.debug(data);

  return (
    <CContainer>
      <TopNav />

      <CContainer
        bg={"bgContent"}
        rounded={"3xl"}
        overflow={"clip"}
        zIndex={2}
        pt={"120px"}
        pb={[4, null, 12]}
      >
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
                label: data?.topic?.title,
                path: "",
              },
            ]}
          />
        </LPSectionContainer>

        <KMISLearningSection topicId={topicId} />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
