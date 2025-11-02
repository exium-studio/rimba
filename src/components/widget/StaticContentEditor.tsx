"use client";

import { CContainer } from "@/components/ui/c-container";

interface Props {}

export const StaticContentEditor = (props: Props) => {
  // Props
  const { ...restProps } = props;

  return <CContainer {...restProps}></CContainer>;
};
