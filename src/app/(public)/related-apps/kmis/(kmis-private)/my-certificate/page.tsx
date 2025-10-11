"use client";

import { KMISMyCertificate } from "@/components/kmisSections/KMISMyCertificate";
import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { TopNav } from "@/components/widget/TopNav";
import useLang from "@/context/useLang";

export default function Page() {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer>
      <TopNav />

      <CContainer
        bg={"bgContent"}
        rounded={"3xl"}
        overflow={"clip"}
        zIndex={2}
        pt={"120px"}
        pb={[4, null, 12]}
      >
        <LPSectionContainer mb={4}>
          <Breadcrumbs
            links={[
              {
                label: "KMIS",
                path: "/related-apps/kmis",
              },
              {
                label: l.my_cerficate,
                path: "/related-apps/kmis/my-certificate",
              },
            ]}
          />
        </LPSectionContainer>

        <KMISMyCertificate />
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
