"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import SearchInput from "@/components/ui/search-input";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { HStack } from "@chakra-ui/react";

const ListSection = () => {
  return (
    <LPSectionContainer py={"80px"}>
      <HStack wrap={"wrap"}>
        <SearchInput maxW={"400px"} />
      </HStack>
    </LPSectionContainer>
  );
};

export default function DocumentsPage() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[65]}
        img={`${IMAGES_PATH}/lp/documents/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[65].content[lang], path: "/documents" },
        ]}
      />

      <CContainer
        bg={"light"}
        rounded={"3xl"}
        mt={"-24px"}
        overflow={"clip"}
        zIndex={2}
      >
        <ListSection />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
