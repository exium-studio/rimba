"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { CSpinner } from "@/components/ui/c-spinner";
import { P } from "@/components/ui/p";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PageHeader } from "@/components/widget/PageHeader";
import { PDFViewer } from "@/components/widget/PDFViewer";
import { TopNav } from "@/components/widget/TopNav";
import { Interface__CMSDocument } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { formatDate } from "@/utils/formatter";
import { Badge } from "@chakra-ui/react";
import { useParams } from "next/navigation";

export default function Page() {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // Hooks
  const { docsId } = useParams<{ docsId: string }>();

  // States
  // const [activeDoc, setActiveDoc] = useState<Interface__StorageFile | null>(
  //   null
  // );
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__CMSDocument>({
      initialData: undefined,
      url: `/api/cms/public-request/get-legal-document/${docsId}`,
      dependencies: [],
      dataResource: false,
    });
  const doc = data?.document?.[0];
  const render = {
    loading: <CSpinner />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <LPSectionContainer py={"80px"} overflowY={"auto"} gap={4}>
        <CContainer gap={8} overflowY={"auto"}>
          <CContainer rounded={"lg"} gap={8}>
            <Badge size={"lg"} w={"fit"}>
              {data ? data?.documentCategory?.name?.[lang] : ""}
            </Badge>

            <P fontSize={"lg"} color={"fg.muted"}>
              {data ? data?.description?.[lang] : ""}
            </P>

            <CContainer>
              <P>{doc?.fileSize}</P>
              <P fontSize={"sm"} color={"fg.subtle"}>
                {`${l.last_updated} ${formatDate(doc?.updatedAt, {
                  variant: "dayShortMonthYear",
                })}`}
              </P>
            </CContainer>

            <CContainer bg={"d1"}>
              {doc?.fileUrl && <PDFViewer fileUrl={doc?.fileUrl} />}
            </CContainer>
          </CContainer>
        </CContainer>
      </LPSectionContainer>
    ),
  };

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        title={data ? data?.title?.[lang] : "Loading..."}
        img={`${IMAGES_PATH}/lp/documents/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          { label: staticContents[65].content[lang], path: "/document" },
          {
            label: data ? data?.title?.[lang] : "Loading...",
            path: `/document/${data?.id}`,
          },
        ]}
      />

      <CContainer
        bg={"light"}
        zIndex={2}
        mt={"-24px"}
        rounded={"3xl"}
        overflow={"clip"}
      >
        {initialLoading && render.loading}
        {!initialLoading && (
          <>
            {error && render.error}
            {!error && (
              <>
                {data && render.loaded}
                {!data && render.empty}
              </>
            )}
          </>
        )}
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
