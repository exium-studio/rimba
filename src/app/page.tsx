"use client";

import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <LPHomeHero />

      <LPHomeHero />
    </CContainer>
  );
};

export default IndexRoute;
