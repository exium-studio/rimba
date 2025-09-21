"use client";

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
    </CContainer>
  );
};

export default IndexRoute;
