"use client";

import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import { EditContentTrigger } from "@/components/widget/StaticContentEditor";
import { Props__EditableContentContainer } from "@/constants/props";
import { useCMS } from "@/context/useCMS";
import { Center } from "@chakra-ui/react";
import { useState } from "react";

export function EditableContentContainer(
  props: Props__EditableContentContainer
) {
  // Props
  const { children, content, ...restProps } = props;

  // Contexts
  const cmsAuthToken = useCMS((s) => s.CMSAuthToken);
  const highlightedContentIds = useCMS((s) => s.highlightedContentIds);
  const isHighlighted = highlightedContentIds.includes(String(content?.id));

  const [hover, setHover] = useState<boolean>(false);

  return (
    <CContainer
      id={`content_${content?.id}`}
      w="fit"
      pos="relative"
      {...restProps}
    >
      {children}

      <EditContentTrigger content={content} pos="absolute" w="full" h="full">
        <CContainer
          onMouseEnter={() => {
            if (cmsAuthToken) setHover(true);
          }}
          onMouseLeave={() => {
            if (cmsAuthToken) setHover(false);
          }}
          cursor={cmsAuthToken ? "pointer" : ""}
          w="full"
          h="full"
        >
          <Center
            w="full"
            h="full"
            bg="orange.400"
            opacity={isHighlighted || hover ? 0.8 : 0}
          />

          {hover && (
            <P
              fontSize="xl"
              fontWeight="bold"
              whiteSpace="nowrap"
              color="light"
              pos="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              {`${content.id}`}
            </P>
          )}
        </CContainer>
      </EditContentTrigger>
    </CContainer>
  );
}
