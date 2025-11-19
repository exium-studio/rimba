"use client";

import { ItemContainer } from "@/components/widget/ItemContainer";
import { SimplePDFViewer } from "@/components/widget/SimplePDFViewer";
import { fileUrl } from "@/utils/url";
import { StackProps } from "@chakra-ui/react";

interface Props extends StackProps {
  courseDetail: any;
}

export const CertificateSection = (props: Props) => {
  // Props
  const { courseDetail, ...restProps } = props;

  return (
    <ItemContainer p={4} justify={"center"} {...restProps}>
      <SimplePDFViewer
        fileUrl={
          fileUrl(
            courseDetail?.learningAttempt?.certificate?.[0]?.filePath
          ) as string
        }
        aspectRatio={16 / 11}
      />
    </ItemContainer>
  );
};
