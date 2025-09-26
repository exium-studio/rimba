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
        titleContent={staticContents[66]}
        img={`${IMAGES_PATH}/lp/about-us/partners/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[66].content[lang], path: "/documents" },
        ]}
      />

      <CContainer
        bg={"light"}
        zIndex={2}
        mt={"-24px"}
        rounded={"3xl"}
        overflow={"clip"}
      >
        <LPPartners bg={"light"} />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
