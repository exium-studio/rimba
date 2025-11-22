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
import { Interface__CMSLegalDocs } from "@/constants/interfaces";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { formatDate } from "@/utils/formatter";
import { SimpleGrid } from "@chakra-ui/react";
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
    useDataState<Interface__CMSLegalDocs>({
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
        <CContainer>
          <P>{doc?.fileSize}</P>
          <P fontSize={"sm"} color={"fg.subtle"}>
            {`${l.last_updated} ${formatDate(doc?.updatedAt, {
              variant: "dayShortMonthYear",
            })}`}
          </P>
        </CContainer>

        <SimpleGrid columns={[1, null, 1]} gap={8} overflowY={"auto"}>
          {/* <CContainer className="scrollY" maxH={"600px"} gap={4}>
            <CContainer gap={1}>
              <P fontSize={"lg"} fontWeight={"semibold"}>
                {l.all_document}
              </P>
              <P color={"fg.subtle"}>{l.select_document_to_view}</P>
            </CContainer>

            <SimpleGrid columns={[2]} gap={4}>
              {data?.document?.map((doc, idx: number) => {
                const isActive = activeDoc?.id === doc?.id;

                return (
                  <CContainer
                    key={idx}
                    rounded={"lg"}
                    border={"1px solid"}
                    borderColor={"border.muted"}
                    p={4}
                    gap={8}
                    cursor={"pointer"}
                    onClick={() => {
                      setActiveDoc(doc);
                    }}
                    _hover={{
                      bg: "d1",
                    }}
                  >
                    <CContainer gap={2}>
                      <HStack>
                        <Icon color={"fg.muted"}>
                          <IconFileTypePdf stroke={1.5} />
                        </Icon>

                        {isActive && <DotIndicator ml={"auto"} mr={2} />}
                      </HStack>

                      <P>{doc?.fileName}</P>
                    </CContainer>

                    <CContainer>
                      <P>{doc?.fileSize}</P>
                      <P fontSize={"sm"} color={"fg.subtle"}>
                        {`${l.last_updated} ${formatDate(doc?.updatedAt, {
                          variant: "dayShortMonthYear",
                        })}`}
                      </P>
                    </CContainer>
                  </CContainer>
                );
              })}
            </SimpleGrid>
          </CContainer> */}

          <CContainer bg={"d1"} rounded={"lg"}>
            {/* {!activeDoc && (
              <FeedbackNoData
                icon={<IconFileOff />}
                title={l.alert_no_document_selected.title}
                description={l.alert_no_document_selected.description}
              />
            )} */}

            {doc?.fileUrl && <PDFViewer fileUrl={doc?.fileUrl} />}
          </CContainer>
        </SimpleGrid>
      </LPSectionContainer>
    ),
  };

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      <PageHeader
        title={data ? data?.title?.[lang] : "Loading..."}
        description={data ? data?.description?.[lang] : ""}
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
