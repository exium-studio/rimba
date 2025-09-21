"use client";

import { LPHomeActivity } from "@/components/lpSections/LPHomeActivity";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { LPHomeValue } from "@/components/lpSections/LPHomeValue";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <LPHomeHero />

      <LPHomeValue />

      <LPHomeActivity />
    </CContainer>
  );
};

export default IndexRoute;
