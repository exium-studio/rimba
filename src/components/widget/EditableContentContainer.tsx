"use client";

import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import { Props__EditableContentContainer } from "@/constants/props";
import { Center } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

export function EditableContentContainer(
  props: Props__EditableContentContainer
) {
  // Props
  const { children, content, ...restProps } = props;

  // Hooks
  const searchParams = useSearchParams();

  // Parse `highlightedContentIds` from URL
  const highlightedContentIdsParam = searchParams.get("highlightedContentIds");
  const highlightedContentIds = highlightedContentIdsParam
    ? highlightedContentIdsParam.split(",").map((id) => id.trim())
    : [];

  const isHighlighted = highlightedContentIds.includes(String(content?.id));

  return (
    <CContainer
      id={`content_${content?.id}`}
      w="fit"
      pos="relative"
      {...restProps}
    >
      {children}

      {isHighlighted && (
        <>
          <Center
            w="full"
            h="full"
            bg="orange.400"
            opacity={0.8}
            pos="absolute"
          />

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
        </>
      )}
    </CContainer>
  );
}
