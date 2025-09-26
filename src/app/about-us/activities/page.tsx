"use client";

import { CContainer } from "@/components/ui/c-container";
import { PageHeader } from "@/components/widget/PageHeader";
import { TopNav } from "@/components/widget/TopNav";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";

export default function ActivitiesPage() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        titleContent={staticContents[66]}
        img={`${IMAGES_PATH}/lp/rimba-corridor-program/header-bg.png`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[66].content[lang], path: "/documents" },
        ]}
      />
    </CContainer>
  );
}
