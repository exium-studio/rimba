"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { CContainer } from "@/components/ui/c-container";
import { CSpinner } from "@/components/ui/c-spinner";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { TopNav } from "@/components/widget/TopNav";
import { Interface__CMSLegalDocs } from "@/constants/interfaces";
import useDataState from "@/hooks/useDataState";

interface Props {
  params: {
    docsId: string;
  };
}
export default function Page(props: Props) {
  // Props
  const { params } = props;
  const { docsId } = params;

  // States
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__CMSLegalDocs>({
      initialData: undefined,
      url: `/api/cms/public-request/get-legal-document/${docsId}`,
      dependencies: [],
      dataResource: false,
    });
  const render = {
    loading: <CSpinner />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: <CContainer></CContainer>,
  };

  return (
    <CContainer overflowX={"clip"}>
      <TopNav />

      {/* <PageHeader
        titleContent={staticContents[114]}
        img={`${IMAGES_PATH}/lp/about-us/news/header-bg.jpg`}
        links={[
          { label: l.lp_navs.home, path: "/" },
          {
            label: staticContents[114].content[lang],
            path: "/about-us/news",
          },
        ]}
      /> */}

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
