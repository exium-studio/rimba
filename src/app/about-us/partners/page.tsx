"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { LPPartners } from "@/components/lpSections/LPPartners";
import { CContainer } from "@/components/ui/c-container";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";

export default function DocumentsRoute() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[115]}
        img={`${IMAGES_PATH}/lp/about-us/partners/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          {
            label: staticContents[115].content[lang],
            path: "/about-us/partners",
          },
        ]}
      />

      <CContainer
        bg={"light"}
        zIndex={2}
        mt={"-24px"}
        rounded={"3xl"}
        overflow={"clip"}
      >
        <LPPartners />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
