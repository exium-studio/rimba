"use client";

import { CContainer } from "@/components/ui/c-container";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { MiniProfile } from "@/components/widget/MiniProfile";
import { Stack, StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  topicId: string;
}

export const KMISLearningSection = (props: Props) => {
  // Props
  const { topicId, ...restProps } = props;

  return (
    <LPSectionContainer
      outerContainerProps={{
        flex: 1,
      }}
      flex={1}
      {...restProps}
    >
      <Stack flexDir={["column", null, "row"]}>
        <CContainer flex={1}>
          <MiniProfile />
        </CContainer>

        <CContainer flex={3.5}></CContainer>
      </Stack>
    </LPSectionContainer>
  );
};
