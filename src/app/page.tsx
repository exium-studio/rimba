"use client";

import { LPHomeOverviewGallery } from "@/components/lpSections/LPHomeOverviewGallery";
import { LPHomeHero } from "@/components/lpSections/LPHomeHero";
import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

const IndexRoute = () => {
  return (
    <CContainer>
      <TopNav />

      <LPHomeHero />

      <LPHomeOverviewGallery />
    </CContainer>
  );
};

export default IndexRoute;
