"use client";

import { CContainer } from "@/components/ui/c-container";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  topicId: string;
}

export const KMISLearningSection = (props: Props) => {
  // Props
  const { topicId, ...restProps } = props;

  return <CContainer {...restProps}></CContainer>;
};
