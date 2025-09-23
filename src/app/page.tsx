"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { LPHomeActivity } from "@/components/lpSections/LPHomeActivity";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { LPHomeImpact } from "@/components/lpSections/LPHomeImpact";
import { LPHomeLocation } from "@/components/lpSections/LPHomeLocation";
import { LPHomeStrategyValue } from "@/components/lpSections/LPHomeStrategyValue";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <CContainer zIndex={2}>
        <LPHomeHero />

        <LPHomeStrategyValue />

        <LPHomeActivity />

        <LPHomeLocation />

        <LPHomeImpact />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
};

export default IndexRoute;
