"use client";

import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import useLang from "@/context/useLang";
import { HStack, StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  courseDetail?: any;
}

export const FeedbackSession = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  return (
    <CContainer p={4} rounded={"xl"} bg={"body"} {...restProps}>
      <P fontSize={"xl"} fontWeight={"semibold"} textAlign={"center"}>
        {l.quiz_finished}
      </P>

      <HStack>
        <CContainer></CContainer>

        <CContainer>
          <P></P>
        </CContainer>
      </HStack>
    </CContainer>
  );
};
