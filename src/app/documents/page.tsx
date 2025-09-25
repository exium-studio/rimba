"use client";

import { CContainer } from "@/components/ui/c-container";
import { TopNav } from "@/components/widget/TopNav";

export default function DocumentsRoute() {
  return (
    <CContainer bg={"p.900"} overflowX={"clip"}>
      <TopNav />

      <CContainer
        minH={"500px"}
        bg={"p.900"}
        roundedBottom={"3xl"}
      ></CContainer>
    </CContainer>
  );
}
