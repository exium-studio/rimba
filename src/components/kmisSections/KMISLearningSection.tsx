"use client";

import { Btn, BtnProps } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import FeedbackState from "@/components/widget/FeedbackState";
import { DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import VideoPlayer from "@/components/widget/VideoPlayer";
import {
  Interface__KMISMaterial,
  Interface__StorageFile,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import { imgUrl } from "@/utils/url";
import { Center, Icon, Skeleton, Stack, StackProps } from "@chakra-ui/react";
import {
  IconBook,
  IconBooks,
  IconFile,
  IconHelpHexagon,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
import { useState } from "react";

const MATERIAL_REGISTRY = {
  text: {
    icon: <IconBook stroke={1.5} />,
    minimalStudyTime: 5,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} {...restProps}>
          <H2 fontWeight={"semibold"}>{resolvedMaterial.title}</H2>

          <P>{resolvedMaterial?.description}</P>
        </CContainer>
      );
    },
  },
  video: {
    icon: <IconVideo stroke={1.5} />,
    minimalStudyTime: 30,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} {...restProps}>
          <H2 fontWeight={"semibold"}>{resolvedMaterial.title}</H2>
          <VideoPlayer src={`https://www.youtube.com/embed/45I4Eu9zSb8`} />

          <P>{resolvedMaterial?.description}</P>
        </CContainer>
      );
    },
  },
  document: {
    icon: <IconFile stroke={1.5} />,
    minimalStudyTime: 10,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} {...restProps}>
          <H2 fontWeight={"semibold"}>{resolvedMaterial.title}</H2>

          {resolvedMaterial?.materialFile?.map(
            (item: Interface__StorageFile) => {
              const url = imgUrl(item.filePath);

              return <Img key={url} fluid w={"full"} src={url} />;
            }
          )}
        </CContainer>
      );
    },
  },
  gambar: {
    icon: <IconPhoto stroke={1.5} />,
    minimalStudyTime: 5,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} {...restProps}>
          <H2 fontWeight={"semibold"}>{resolvedMaterial.title}</H2>

          {resolvedMaterial?.materialFile?.map(
            (item: Interface__StorageFile) => {
              const url = imgUrl(item.filePath);

              return <Img key={url} fluid w={"full"} src={url} />;
            }
          )}
        </CContainer>
      );
    },
  },
};

const ListItemContainer = (props: BtnProps) => {
  // Props
  const { children, ...restProps } = props;
  return (
    <Btn
      justifyContent={"start"}
      textAlign={"left"}
      gap={4}
      p={2}
      h={"55px"}
      rounded={"lg"}
      variant={"ghost"}
      {...restProps}
    >
      {children}
    </Btn>
  );
};
const MaterialList = (props: any) => {
  // Props
  const { topicDetail, activeMaterialId, setActiveMaterialId, ...restProps } =
    props;

  // Contexts
  const { l } = useLang();

  // States
  const materials = topicDetail.material;

  return (
    <CContainer bg={"body"} rounded={"xl"} {...restProps}>
      <CContainer p={4}>
        <P fontWeight={"medium"}>{l.learning_material}</P>
        <P fontSize={"sm"} color={"fg.subtle"}>
          {`${topicDetail?.totalMaterial} ${l.learning_material.toLowerCase()}`}
        </P>
      </CContainer>

      <CContainer gap={1} px={2} pb={2}>
        {materials.map((material: Interface__KMISMaterial) => {
          const materialProps =
            MATERIAL_REGISTRY[
              (material?.materialType ||
                "text") as keyof typeof MATERIAL_REGISTRY
            ];
          const isActive = activeMaterialId === material.id;

          return (
            <ListItemContainer
              key={material.id}
              onClick={() => {
                setActiveMaterialId(material.id);
              }}
            >
              <Icon>{materialProps.icon}</Icon>

              <CContainer>
                <P fontWeight={"medium"}>{material.title}</P>
                <P fontSize={"sm"} color={"fg.subtle"}>
                  {`${
                    materialProps.minimalStudyTime
                  } ${l.minutes.toLowerCase()}`}
                </P>
              </CContainer>

              {isActive && <DotIndicator ml={"auto"} mr={1} />}
            </ListItemContainer>
          );
        })}

        <ListItemContainer>
          <Icon>
            <IconHelpHexagon stroke={1.5} />
          </Icon>

          <CContainer>
            <P fontWeight={"medium"}>Quiz</P>
            <P fontSize={"sm"} color={"fg.subtle"}>
              {`${topicDetail?.topic?.totalQuiz} ${l.question}`}
            </P>
          </CContainer>
        </ListItemContainer>
      </CContainer>
    </CContainer>
  );
};
const ActiveMaterial = (props: any) => {
  // Props
  const { activeMaterialId, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__KMISMaterial>({
      url: ``,
      conditions: activeMaterialId,
      dependencies: [activeMaterialId],
    });
  const render = {
    loading: <Skeleton />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: MATERIAL_REGISTRY?.[
      data?.materialType as keyof typeof MATERIAL_REGISTRY
    ]?.render({ material: data }),
  };

  return (
    <CContainer minH={"500px"} {...restProps}>
      {activeMaterialId && (
        <>
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
        </>
      )}

      {!activeMaterialId && (
        <Center flex={1} bg={"body"} p={4} rounded={"xl"}>
          <FeedbackState
            icon={<IconBooks />}
            title={l.learning_material}
            description={l.msg_select_material_first}
            m={"auto"}
          />
        </Center>
      )}
    </CContainer>
  );
};

interface Props extends StackProps {
  topicDetail: any;
}
export const KMISLearningSection = (props: Props) => {
  // Props
  const { topicDetail, ...restProps } = props;

  // States
  const [activeMaterialId, setActiveMaterialId] = useState<string>("");
  console.debug("activeMaterialId", activeMaterialId);

  return (
    <LPSectionContainer
      outerContainerProps={{
        flex: 1,
      }}
      flex={1}
      {...restProps}
    >
      <Stack flexDir={["column", null, "row"]} gap={4}>
        <CContainer flex={1} gap={4}>
          <MaterialList
            topicDetail={topicDetail}
            activeMaterialId={activeMaterialId}
            setActiveMaterialId={setActiveMaterialId}
          />
        </CContainer>

        <ActiveMaterial flex={3.5} />
      </Stack>
    </LPSectionContainer>
  );
};
