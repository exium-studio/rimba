"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { LPHomeEvents } from "@/components/lpSections/LPHomeEvents";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { LPHomeImpact } from "@/components/lpSections/LPHomeImpact";
import { LPHomeLegalDocs } from "@/components/lpSections/LPHomeLegalDocs";
import { LPHomeLocation } from "@/components/lpSections/LPHomeLocation";
import { LPHomeNews } from "@/components/lpSections/LPHomeNews";
import { LPHomeStrategyValue } from "@/components/lpSections/LPHomeStrategyValue";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <CContainer zIndex={2}>
        <LPHomeHero />

        <LPHomeStrategyValue />

        <LPHomeLocation />

        <LPHomeEvents />

        <LPHomeImpact />

        <LPHomeLegalDocs />

        <LPHomeNews />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
};

export default IndexRoute;
