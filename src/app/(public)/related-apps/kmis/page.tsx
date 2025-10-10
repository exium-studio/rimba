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
        bg={"bgContent"}
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
