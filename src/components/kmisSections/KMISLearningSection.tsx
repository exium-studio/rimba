"use client";

import { Btn, BtnProps } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import SafeHtml from "@/components/ui/safe-html";
import { toaster } from "@/components/ui/toaster";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import FeedbackState from "@/components/widget/FeedbackState";
import { FileItem } from "@/components/widget/FIleItem";
import { DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { QuizWorkspace } from "@/components/widget/QuizWorkspace";
import VideoPlayer from "@/components/widget/VideoPlayer";
import {
  Interface__KMISMaterial,
  Interface__StorageFile,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { interpolateString } from "@/utils/string";
import { imgUrl } from "@/utils/url";
import {
  Center,
  Circle,
  Icon,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import {
  IconBook,
  IconBooks,
  IconCheck,
  IconFiles,
  IconHelpHexagon,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

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
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer p={4} rounded={"xl"} bg={"body"}>
            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
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
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer gap={4} p={4} rounded={"xl"} bg={"body"}>
            <VideoPlayer src={`https://www.youtube.com/embed/45I4Eu9zSb8`} />

            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
        </CContainer>
      );
    },
  },
  dokumen: {
    icon: <IconFiles stroke={1.5} />,
    minimalStudyTime: 10,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} {...restProps}>
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer gap={4} p={4} rounded={"xl"} bg={"body"}>
            {resolvedMaterial?.materialFile?.map(
              (item: Interface__StorageFile) => {
                return <FileItem key={item.id} fileData={item} />;
              }
            )}

            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
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
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

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
  const { courseDetail, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const searchParams = useSearchParams();

  // States
  const activeMaterialId = searchParams.get("activeMaterialId") || "";
  const completedMaterials =
    courseDetail?.learningAttempt?.completedMaterial || [];
  const materials = courseDetail?.material;

  return (
    <CContainer bg={"body"} rounded={"xl"} {...restProps}>
      <CContainer p={4}>
        <P fontWeight={"medium"}>{l.learning_material}</P>
        <P fontSize={"sm"} color={"fg.subtle"}>
          {`${
            courseDetail?.learningAttempt?.totalMaterial
          } ${l.learning_material.toLowerCase()}`}
        </P>
      </CContainer>

      <CContainer gap={1} px={2} pb={2}>
        {materials?.map((material: Interface__KMISMaterial, idx: number) => {
          const materialProps =
            MATERIAL_REGISTRY[
              (material?.materialType ||
                "text") as keyof typeof MATERIAL_REGISTRY
            ];
          const isActive = activeMaterialId === material.id;
          const firstIdx = idx === 0;

          const completedMaterialIds = new Set(
            completedMaterials.map((m: any) => m.id)
          );

          return (
            <NavLink
              key={material.id}
              to={`/related-apps/kmis/my-course/${courseDetail?.learningAttempt?.topic?.id}?activeMaterialId=${material.id}`}
            >
              <ListItemContainer
                disabled={
                  !firstIdx && !completedMaterialIds.has(materials[idx - 1]?.id)
                }
              >
                <Center pos={"relative"}>
                  {material?.isCompleted && (
                    <Circle
                      bg={"fg.success"}
                      pos={"absolute"}
                      top={"-4px"}
                      right={"-4px"}
                    >
                      <Icon color={"light"} boxSize={4}>
                        <IconCheck />
                      </Icon>
                    </Circle>
                  )}

                  {materialProps?.icon && (
                    <Icon boxSize={6}>
                      {materialProps?.icon || <IconBook stroke={1.5} />}
                    </Icon>
                  )}
                </Center>

                <CContainer>
                  <P fontWeight={"medium"}>{material.title}</P>
                  <P fontSize={"sm"} color={"fg.subtle"}>
                    {`${
                      materialProps?.minimalStudyTime
                    } ${l.minutes.toLowerCase()}`}
                  </P>
                </CContainer>

                {isActive && <DotIndicator ml={"auto"} mr={1} />}
              </ListItemContainer>
            </NavLink>
          );
        })}

        <NavLink
          to={`/related-apps/kmis/my-course/${courseDetail?.learningAttempt?.topic?.id}?quizStarted=1`}
        >
          <ListItemContainer
            disabled={
              completedMaterials.length !== materials.length ||
              courseDetail?.learningAttempt?.topic?.totalQuiz === 0
            }
          >
            <Icon>
              <IconHelpHexagon stroke={1.5} />
            </Icon>

            <CContainer>
              <P fontWeight={"medium"}>Quiz</P>
              <P fontSize={"sm"} color={"fg.subtle"}>
                {`${courseDetail?.learningAttempt?.topic?.totalQuiz} ${l.question}`}
              </P>
            </CContainer>
          </ListItemContainer>
        </NavLink>
      </CContainer>
    </CContainer>
  );
};

const NextMaterialButton = (props: any) => {
  // Props
  const {
    activeMaterial,
    courseDetail,
    setCourseDetail,
    idx,
    lastIdx,
    ...restProps
  } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req, loading } = useRequest({
    id: "next-material",
    showLoadingToast: false,
    showSuccessToast: false,
    errorMessage: {
      422: {
        TIME_NOT_ELAPSED: {
          title: l.error_material_time_not_elapsed.title,
          description: interpolateString(
            l.error_material_time_not_elapsed.description,
            {
              minTime: `${
                MATERIAL_REGISTRY?.[
                  activeMaterial?.materialType as keyof typeof MATERIAL_REGISTRY
                ]?.minimalStudyTime
              } ${l.minutes.toLowerCase()}`,
            }
          ),
        },
      },
    },
  });
  const router = useRouter();

  // States
  const completedMaterials = courseDetail?.learningAttempt?.completedMaterial;
  const materials = courseDetail?.material;
  const quizDisabled =
    completedMaterials.length !== materials.length ||
    courseDetail?.learningAttempt?.topic?.totalQuiz === 0;

  // Utils
  function updateCurrentActiveMaterialToCompleted() {
    setCourseDetail((ps: any) => {
      const newMaterials = ps.material.map((material: any) => {
        if (material.id === activeMaterial?.id) {
          return {
            ...material,
            isCompleted: true,
          };
        }
        return material;
      });
      return {
        ...ps,
        material: newMaterials,
      };
    });
  }
  function nextActiveMaterial() {
    router.push(
      `/related-apps/kmis/my-course/${
        courseDetail?.learningAttempt?.topic?.id
      }?activeMaterialId=${materials?.[idx + 1]?.id}`
    );
  }
  function startQuiz() {
    router.push(
      `/related-apps/kmis/my-course/${courseDetail?.learningAttempt?.topic?.id}?quizStarted=1`
    );
  }
  function onNextMaterial() {
    const nextMaterialIsCompleted = materials[idx + 1]?.isCompleted;

    if (nextMaterialIsCompleted) {
      nextActiveMaterial();
    } else {
      const config = {
        url: `/api/kmis/learning-course/update/${courseDetail?.learningAttempt?.id}`,
        method: "PATCH",
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            updateCurrentActiveMaterialToCompleted();
            if (lastIdx) {
              if (quizDisabled) {
                toaster.create({
                  title: l.info_quiz_not_ready.title,
                  description: l.info_quiz_not_ready.description,
                  action: { label: "Close", onClick: () => {} },
                });
              } else {
                startQuiz();
              }
            } else {
              nextActiveMaterial();
            }
          },
        },
      });
    }
  }

  return (
    <Btn
      colorPalette={"p"}
      w={"fit"}
      ml={"auto"}
      loading={loading}
      onClick={onNextMaterial}
      {...restProps}
    >
      {l.next}
    </Btn>
  );
};
const ActiveMaterial = (props: any) => {
  // Props
  const { courseDetail, setCourseDetail, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const searchParams = useSearchParams();

  // States
  const activeMaterialId = searchParams.get("activeMaterialId") || "";
  const quizStarted = searchParams.get("quizStarted") || "";
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__KMISMaterial>({
      url: `/api/kmis/learning-course/get-material/${activeMaterialId}`,
      conditions: !!activeMaterialId,
      dependencies: [activeMaterialId],
      dataResource: false,
    });
  const render = {
    loading: <Skeleton />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <CContainer gap={4}>
        {MATERIAL_REGISTRY?.[
          data?.materialType as keyof typeof MATERIAL_REGISTRY
        ]?.render({ material: data })}

        <NextMaterialButton
          activeMaterial={data}
          courseDetail={courseDetail}
          setCourseDetail={setCourseDetail}
          idx={courseDetail?.material?.findIndex((m: any) => m.id === data?.id)}
          lastIdx={
            courseDetail?.material?.findIndex((m: any) => m.id === data?.id) ===
            courseDetail?.material?.length - 1
          }
        />
      </CContainer>
    ),
  };

  return (
    <CContainer minH={"500px"} {...restProps}>
      {quizStarted && <QuizWorkspace courseDetail={courseDetail} />}

      {!quizStarted && (
        <>
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
                icon={<IconBooks stroke={1.5} />}
                title={l.learning_material}
                description={l.msg_select_material_first}
                m={"auto"}
              />
            </Center>
          )}
        </>
      )}
    </CContainer>
  );
};

interface Props extends StackProps {
  courseDetail: any;
  setCourseDetail: React.Dispatch<any>;
}
export const KMISLearningSection = (props: Props) => {
  // Props
  const { courseDetail, setCourseDetail, ...restProps } = props;

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
          <MaterialList courseDetail={courseDetail} />
        </CContainer>

        <ActiveMaterial
          flex={3.5}
          courseDetail={courseDetail}
          setCourseDetail={setCourseDetail}
        />
      </Stack>
    </LPSectionContainer>
  );
};
