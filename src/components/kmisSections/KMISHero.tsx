"use client";

import { CContainer } from "@/components/ui/c-container";
import { H1 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {}

export const KMISHero = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  return (
    <LPSectionContainer
      mt={"90px"}
      py={8}
      outerContainerProps={{
        px: [2, null, 12],
      }}
      {...restProps}
    >
      <CContainer
        p={5}
        pt={20}
        pos={"relative"}
        bg={"p.900"}
        color={"light"}
        rounded={"xl"}
        overflow={"clip"}
      >
        <Img
          src={`${IMAGES_PATH}/kmis/bookshelf.jpg`}
          h={"full"}
          w={"full"}
          opacity={0.5}
          pos={"absolute"}
          top={0}
          left={0}
        />

        <EditableContentContainer content={staticContents[116]}>
          <H1 fontWeight={"bold"} lineHeight={1.2}>
            {staticContents[116]?.content[lang]}
          </H1>
        </EditableContentContainer>

        <EditableContentContainer content={staticContents[117]} mt={4}>
          <P>{staticContents[117]?.content[lang]}</P>
        </EditableContentContainer>
      </CContainer>
    </LPSectionContainer>
  );
};
