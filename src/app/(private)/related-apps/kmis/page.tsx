"use client";

import { KMISAllCourse } from "@/components/kmisSections/KMISAllCourse";
import { KMISHero } from "@/components/kmisSections/KMISHero";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

export default function Page() {
  return (
    <CContainer bg={"bgContent"} minH={"100dvh"}>
      <TopNav />

      <KMISHero />

      <KMISAllCourse />
    </CContainer>
  );
}
