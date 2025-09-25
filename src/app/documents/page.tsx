"use client";

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
        titleContent={staticContents[65]}
        img={`${IMAGES_PATH}/lp/documents/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[65].content[lang], path: "/documents" },
        ]}
      />
    </CContainer>
  );
}
