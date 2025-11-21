"use client";

import { KMISMyTopic } from "@/components/kmisSections/KMISMyTopic";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { TopNav } from "@/components/widget/TopNav";
import useLang from "@/context/useLang";

export default function Page() {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer minH={"100dvh"}>
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
                path: "/related-apps/kmis?topicType=Pelatihan, Pengetahuan",
              },
              {
                label: l.my_course,
                path: "/related-apps/kmis/my-topic",
              },
            ]}
          />
        </LPSectionContainer>

        <KMISMyTopic />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
