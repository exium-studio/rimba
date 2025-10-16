"use client";

import { KMISAllCourses } from "@/components/kmisSections/KMISAllCourses";
import { KMISHero } from "@/components/kmisSections/KMISHero";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

export default function Page() {
  return (
    <CContainer bg={"bgContent"} minH={"100dvh"}>
      <TopNav />

      <CContainer
        flex={1}
        bg={"bgContent"}
        pb={[4, null, 12]}
        rounded={"3xl"}
        mt={"-24px"}
        overflow={"clip"}
        zIndex={2}
      >
        <KMISHero />

        <KMISAllCourses />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
