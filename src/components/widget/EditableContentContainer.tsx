import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import { Props__EditableContentContainer } from "@/constants/props";
import useCMS from "@/context/useCMS";
import { Center } from "@chakra-ui/react";

export const EditableContentContainer = (
  props: Props__EditableContentContainer
) => {
  // Props
  const { children, content, ...restProps } = props;

  // Contexts
  const highlightedContentIds = useCMS((s) => s.highlightedContentIds);
  const isHighlighted = !highlightedContentIds.includes(content.id);

  return (
    <CContainer
      id={`content_${content.id}`}
      w={"fit"}
      pos={"relative"}
      {...restProps}
    >
      {children}

      <Center
        w={"full"}
        h={"full"}
        bg={isHighlighted ? "orange.400" : ""}
        // bg={isHighlighted ? "orange.400" : "orange.400"} //! debug
        opacity={0.8}
        pos={"absolute"}
      />

      {isHighlighted && (
        <P
          fontSize={"xl"}
          fontWeight={"bold"}
          whiteSpace={"nowrap"}
          color={"light"}
          pos={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
        >{`${content.id}`}</P>
      )}
    </CContainer>
  );
};
