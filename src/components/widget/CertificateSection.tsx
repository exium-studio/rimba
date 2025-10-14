"use client";

import { ItemContainer } from "@/components/widget/ItemContainer";
import { PDFViewer } from "@/components/widget/PDFViewer";
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
      <PDFViewer
        fileUrl={fileUrl(
          courseDetail?.learningAttempt?.certificate?.[0]?.filePath
        )}
      />
    </ItemContainer>
  );
};
