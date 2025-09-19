"use client";

import { LPHomeBrief } from "@/components/lpSections/LPHomeBrief";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <LPHomeHero />

      <LPHomeBrief />
    </CContainer>
  );
};

export default IndexRoute;
