"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { LPHomeActivities } from "@/components/lpSections/LPHomeActivities";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { LPHomeImpact } from "@/components/lpSections/LPHomeImpact";
import { LPHomeLegalDocs } from "@/components/lpSections/LPHomeLegalDocs";
import { LPHomeLocation } from "@/components/lpSections/LPHomeLocation";
import { LPHomeNews } from "@/components/lpSections/LPHomeNews";
import { LPPartners } from "@/components/lpSections/LPPartners";
import { LPHomeStrategyValue } from "@/components/lpSections/LPHomeStrategyValue";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";
import { LPFAQs } from "@/components/lpSections/LPFAQs";

const IndexRoute = () => {
  return (
    <CContainer bg={"p.900"} overflowX={"clip"}>
      <TopNav />

      <CContainer zIndex={2} bg={"light"} roundedBottom={"3xl"}>
        <LPHomeHero />

        <LPHomeStrategyValue />

        <LPHomeLocation />

        <LPHomeActivities />

        <LPHomeImpact />

        <LPHomeLegalDocs />

        <LPHomeNews />

        <LPPartners bg={"bg.subtle"} />

        <LPFAQs bg={"bg.subtle"} />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
};

export default IndexRoute;
