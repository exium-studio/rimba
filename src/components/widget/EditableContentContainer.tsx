import { CContainer } from "@/components/ui/c-container";
import { Props__EditableContentContainer } from "@/constants/props";
import useCMS from "@/context/useCMS";

export const EditableContentContainer = (
  props: Props__EditableContentContainer
) => {
  // Props
  const { children, content, ...restProps } = props;

  // Contexts
  const highlightedContentIds = useCMS((s) => s.highlightedContentIds);
  const isHighlighted = highlightedContentIds.includes(content.id);

  return (
    <CContainer
      id={`content_${content.id}`}
      w={"fit"}
      pos={"relative"}
      {...restProps}
    >
      {children}

      <CContainer
        w={"full"}
        h={"full"}
        bg={isHighlighted ? "orange.400" : ""}
        opacity={0.5}
        pos={"absolute"}
      />
    </CContainer>
  );
};
