"use client";

import { KMISAllCourses } from "@/components/kmisSections/KMISAllCourses";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";

export default function Page() {
  // Contexts
  const { l } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer bg={"bgContent"} minH={"100dvh"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[118]}
        descriptionContent={staticContents[119]}
        img={`${IMAGES_PATH}/kmis/bookshelf.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: "KMIS", path: "/kmis" },
        ]}
      />

      <CContainer
        flex={1}
        bg={"bgContent"}
        py={"80px"}
        rounded={"3xl"}
        mt={"-24px"}
        overflow={"clip"}
        zIndex={2}
      >
        {/* <KMISHero /> */}

        <KMISAllCourses />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
