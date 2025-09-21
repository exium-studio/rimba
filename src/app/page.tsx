"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { LPHomeActivity } from "@/components/lpSections/LPHomeActivity";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { LPHomeStrategyValue } from "@/components/lpSections/LPHomeStrategyValue";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <LPHomeHero />

      <LPHomeStrategyValue />

      <LPHomeActivity />

      <LPFooter />
    </CContainer>
  );
};

export default IndexRoute;
