"use client";

import { Btn, BtnProps } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Divider } from "@/components/ui/divider";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import SafeHtml from "@/components/ui/safe-html";
import { toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { CertificateSection } from "@/components/widget/CertificateSection";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { FeedbackSession } from "@/components/widget/FeedbackSession";
import FeedbackState from "@/components/widget/FeedbackState";
import { CompleteIndicator, DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { QuizWorkspace } from "@/components/widget/QuizWorkspace";
import { PDFViewer } from "@/components/widget/PDFViewer";
import VideoPlayer from "@/components/widget/VideoPlayer";
import {
  Interface__KMISMaterial,
  Interface__StorageFile,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { formatDuration } from "@/utils/formatter";
import { interpolateString } from "@/utils/string";
import {
  addSecondsToTime,
  getRemainingSecondsUntil,
  makeTime,
} from "@/utils/time";
import { fileUrl, imgUrl } from "@/utils/url";
import { Center, Icon, Skeleton, Stack, StackProps } from "@chakra-ui/react";
import {
  IconBook,
  IconBooks,
  IconCertificate,
  IconFiles,
  IconHelpHexagon,
  IconPhoto,
  IconStar,
  IconVideo,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { isEmptyArray } from "@/utils/array";
import FeedbackNotFound from "@/components/widget/FeedbackNotFound";
import { H3 } from "@/components/ui/heading";
import useScreen from "@/hooks/useScreen";

const MATERIAL_REGISTRY = {
  text: {
    icon: <IconBook stroke={1.5} />,
    type: "Text",
    minimalStudyTime: 5,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} p={4} rounded={"xl"} bg={"body"} {...restProps}>
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer>
            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
        </CContainer>
      );
    },
  },
  video: {
    icon: <IconVideo stroke={1.5} />,
    type: "Video",
    minimalStudyTime: 15,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} p={4} rounded={"xl"} bg={"body"} {...restProps}>
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer gap={4}>
            <VideoPlayer embedYt src={resolvedMaterial?.materialUrl} />

            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
        </CContainer>
      );
    },
  },
  dokumen: {
    icon: <IconFiles stroke={1.5} />,
    type: "Document",
    minimalStudyTime: 7,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} rounded={"xl"} bg={"body"} {...restProps}>
          <CContainer p={4} pb={0}>
            <P fontSize={"xl"} fontWeight={"semibold"}>
              {resolvedMaterial.title}
            </P>
          </CContainer>

          <CContainer overflow={"clip"}>
            {resolvedMaterial?.materialFiles?.map(
              (item: Interface__StorageFile) => {
                // return <FileItem key={item.id} fileData={item} />;
                return (
                  <PDFViewer
                    key={item.id}
                    fileUrl={fileUrl(item?.filePath) as string}
                    maxH={"700px"}
                  />
                );
              },
            )}

            <CContainer p={4}>
              <SafeHtml html={resolvedMaterial?.description} />
            </CContainer>
          </CContainer>
        </CContainer>
      );
    },
  },
  gambar: {
    icon: <IconPhoto stroke={1.5} />,
    type: "Image",
    minimalStudyTime: 5,
    render: (props: any) => {
      // Props
      const { material, ...restProps } = props;
      const resolvedMaterial: Interface__KMISMaterial = material;

      return (
        <CContainer gap={4} p={4} rounded={"xl"} bg={"body"} {...restProps}>
          <P fontSize={"xl"} fontWeight={"semibold"}>
            {resolvedMaterial.title}
          </P>

          <CContainer gap={4}>
            {resolvedMaterial?.materialFiles?.map(
              (item: Interface__StorageFile) => {
                const url = imgUrl(item.filePath);

                return (
                  <Img
                    key={url}
                    fluid
                    w={"full"}
                    src={url}
                    imageProps={{
                      unoptimized: true,
                    }}
                  />
                );
              },
            )}

            <SafeHtml html={resolvedMaterial?.description} />
          </CContainer>
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
const LearningModules = (props: any) => {
  // Props
  const { topicDetail, isPublicTopic, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const searchParams = useSearchParams();

  // States
  const activeMaterialId = searchParams.get("activeMaterialId") || "";
  const quizStarted = searchParams.get("quizStarted") || "";
  const feedbackSession = searchParams.get("feedbackSession") || "";
  const certificateSection = searchParams.get("certificateSection") || "";
  const isQuizFinished = !!topicDetail?.learningAttempt?.quizFinished;
  const isFeedbackFinished = !!topicDetail?.learningAttempt?.feedback;
  const completedMaterials =
    topicDetail?.learningAttempt?.completedMaterial ?? [];
  const materials = topicDetail?.material;
  // const isPublicTopic =
  //   topicDetail?.topic?.topicType !== "Pelatihan" ||
  //   topicDetail?.learningAttempt?.topic?.topicType !== "Pelatihan";

  // console.debug({ topicDetail });

  return (
    <CContainer bg={"body"} rounded={"xl"} {...restProps}>
      <CContainer p={4} gap={1}>
        <P fontWeight={"medium"}>{l.learning_material}</P>

        <P fontSize={"sm"} color={"fg.subtle"}>
          {`${
            topicDetail?.totalMaterial ??
            topicDetail?.learningAttempt?.totalMaterial
          } ${l.learning_material?.toLowerCase()}`}
        </P>
      </CContainer>

      {/* List */}
      <CContainer gap={1} px={2} pb={2}>
        {isEmptyArray(materials) && <FeedbackNotFound />}

        {materials?.map((material: Interface__KMISMaterial, idx: number) => {
          const materialProps =
            MATERIAL_REGISTRY[
              (material?.materialType ||
                "text") as keyof typeof MATERIAL_REGISTRY
            ];
          const isActive = activeMaterialId === material.id;
          const firstIdx = idx === 0;

          const completedMaterialIds = new Set(
            completedMaterials.map((m: any) => m.id),
          );

          return (
            <NavLink
              key={material.id}
              to={`/related-apps/kmis/my-topic/${
                topicDetail?.learningAttempt?.topic?.id ||
                topicDetail?.topic?.id
              }?activeMaterialId=${material.id}${
                isPublicTopic ? `&isPublic=1` : ``
              }`}
              w={"full"}
            >
              <ListItemContainer
                disabled={
                  !firstIdx &&
                  !isPublicTopic &&
                  !completedMaterialIds.has(materials[idx - 1]?.id)
                }
              >
                <Center pos={"relative"}>
                  {material?.isCompleted && <CompleteIndicator />}

                  {materialProps?.icon && (
                    <Icon boxSize={6}>
                      {materialProps?.icon || <IconBook stroke={1.5} />}
                    </Icon>
                  )}
                </Center>

                <CContainer>
                  <Tooltip content={material.title}>
                    <P w={"full"} fontWeight={"medium"} lineClamp={1}>
                      {material.title}
                    </P>
                  </Tooltip>
                  <P fontSize={"sm"} color={"fg.subtle"}>
                    {materialProps?.type}
                  </P>
                </CContainer>

                {isActive && <DotIndicator ml={"auto"} mr={1} />}
              </ListItemContainer>
            </NavLink>
          );
        })}

        {!isPublicTopic && (
          <>
            <Divider my={1} />

            {/* Quiz */}
            <NavLink
              to={`/related-apps/kmis/my-topic/${topicDetail?.learningAttempt?.topic?.id}?quizStarted=1`}
              w={"full"}
            >
              <ListItemContainer
                disabled={
                  completedMaterials.length !== materials.length ||
                  topicDetail?.learningAttempt?.topic?.totalQuiz === 0
                }
              >
                <Center pos={"relative"}>
                  {isQuizFinished && <CompleteIndicator />}

                  <Icon boxSize={6}>
                    <IconHelpHexagon stroke={1.5} />
                  </Icon>
                </Center>

                <CContainer>
                  <P fontWeight={"medium"}>Quiz</P>
                  <P fontSize={"sm"} color={"fg.subtle"}>
                    {`${
                      topicDetail?.learningAttempt?.topic?.totalQuiz
                    } quiz / ${
                      topicDetail?.learningAttempt?.topic?.quizDuration / 60
                    } ${l.minutes}`}
                  </P>
                </CContainer>

                {quizStarted && <DotIndicator ml={"auto"} mr={1} />}
              </ListItemContainer>
            </NavLink>

            {/* Feedback */}
            <NavLink
              to={`/related-apps/kmis/my-topic/${topicDetail?.learningAttempt?.topic?.id}?feedbackSession=1`}
              w={"full"}
            >
              <ListItemContainer
                disabled={!!!topicDetail?.learningAttempt?.quizFinished}
              >
                <Center pos={"relative"}>
                  {isFeedbackFinished && <CompleteIndicator />}

                  <Icon boxSize={6}>
                    <IconStar stroke={1.5} />
                  </Icon>
                </Center>

                <CContainer>
                  <P fontWeight={"medium"}>Feedback</P>
                  <P fontSize={"sm"} color={"fg.subtle"}>
                    {l.feedback_placeholder}
                  </P>
                </CContainer>

                {feedbackSession && <DotIndicator ml={"auto"} mr={1} />}
              </ListItemContainer>
            </NavLink>

            {/* Certificate */}
            <NavLink
              to={`/related-apps/kmis/my-topic/${topicDetail?.learningAttempt?.topic?.id}?certificateSection=1`}
              w={"full"}
            >
              <ListItemContainer
                disabled={!!!topicDetail?.learningAttempt?.feedback}
              >
                <Center pos={"relative"}>
                  {isFeedbackFinished && <CompleteIndicator />}

                  <Icon boxSize={6}>
                    <IconCertificate stroke={1.5} />
                  </Icon>
                </Center>

                <CContainer>
                  <P fontWeight={"medium"}>{l.certificate}</P>
                  <P fontSize={"sm"} color={"fg.subtle"}>
                    {`${l.score} ${
                      topicDetail?.learningAttempt?.scoreTotal ?? "-"
                    }`}
                  </P>
                </CContainer>

                {certificateSection && <DotIndicator ml={"auto"} mr={1} />}
              </ListItemContainer>
            </NavLink>
          </>
        )}
      </CContainer>
    </CContainer>
  );
};
const NextStepButton = (props: any) => {
  // Props
  const {
    activeMaterial,
    topicDetail,
    getTopicDetail,
    idx,
    lastIdx,
    isPublicTopic,
    ...restProps
  } = props;

  // Contexts
  const { l } = useLang();
  const minimalStudyTime =
    MATERIAL_REGISTRY?.[
      activeMaterial?.materialType as keyof typeof MATERIAL_REGISTRY
    ]?.minimalStudyTime;
  const estimatedEndTime = addSecondsToTime(
    makeTime(topicDetail?.learningAttempt?.updatedAt),
    minimalStudyTime * 60,
  );
  const remainingTime = formatDuration(
    getRemainingSecondsUntil(estimatedEndTime),
  );

  // Hooks
  const { req, loading } = useRequest({
    id: "next-step",
    showLoadingToast: false,
    showSuccessToast: false,
    errorMessage: {
      422: {
        TIME_NOT_ELAPSED: {
          type: "info",
          title: l.info_material_time_not_elapsed.title,
          description: interpolateString(
            l.info_material_time_not_elapsed.description,
            {
              minTime: `${minimalStudyTime} ${l.minutes?.toLowerCase()}`,
              remainingTime: `${remainingTime}`,
              endTime: `${estimatedEndTime}`,
            },
          ),
        },
      },
    },
  });
  const router = useRouter();

  // States
  // const isPublicTopic =
  //   topicDetail?.topic?.topicType !== "Pelatihan" ||
  //   topicDetail?.learningAttempt?.topic?.topicType !== "Pelatihan";
  const completedMaterials = topicDetail?.learningAttempt?.completedMaterial;
  const materials = topicDetail?.material;
  const quizDisabled =
    completedMaterials?.length < materials?.length - 1 ||
    topicDetail?.learningAttempt?.topic?.totalQuiz === 0;

  // console.debug({
  //   activeMaterial,
  //   topicDetail,
  //   getTopicDetail,
  //   idx,
  //   lastIdx,
  //   materials,
  //   isPublicTopic,
  //   isPublic: topicDetail?.topic?.topicType !== "Pelatihan",
  // });

  // Utils
  function nextActiveMaterial() {
    router.push(
      `/related-apps/kmis/my-topic/${
        topicDetail?.learningAttempt?.topic?.id || topicDetail?.topic.id
      }?activeMaterialId=${materials?.[idx + 1]?.id}&${
        isPublicTopic ? `isPublic=1` : ``
      }`,
    );
  }
  function startQuiz() {
    router.push(
      `/related-apps/kmis/my-topic/${topicDetail?.learningAttempt?.topic?.id}?quizStarted=1`,
    );
  }
  function onNextMaterial() {
    const currentMaterialIsCompleted = activeMaterial?.isCompleted;
    const nextMaterialIsCompleted = materials[idx + 1]?.isCompleted;

    if (
      currentMaterialIsCompleted ||
      nextMaterialIsCompleted ||
      isPublicTopic
    ) {
      nextActiveMaterial();
    } else {
      const config = {
        url: `/api/kmis/learning-course/update/${topicDetail?.learningAttempt?.id}`,
        method: "PATCH",
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            getTopicDetail();
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
      disabled={isPublicTopic && materials?.[idx + 1]?.id === undefined}
      {...restProps}
    >
      {l.next}
    </Btn>
  );
};
const ActiveMaterial = (props: any) => {
  // Props
  const { topicDetail, getTopicDetail, isPublicTopic, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const searchParams = useSearchParams();
  const { sw } = useScreen();

  // States
  // const isPublicTopic =
  //   topicDetail?.topic?.topicType !== "Pelatihan" ||
  //   topicDetail?.learningAttempt?.topic?.topicType !== "Pelatihan";
  const activeMaterialId = searchParams.get("activeMaterialId") || "";
  const quizStarted = searchParams.get("quizStarted") || "";
  const feedbackSession = searchParams.get("feedbackSession") || "";
  const certificateSection = searchParams.get("certificateSection") || "";
  const isIndex =
    !activeMaterialId &&
    !quizStarted &&
    !feedbackSession &&
    !certificateSection;
  const materials = topicDetail?.material;
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__KMISMaterial>({
      url: isPublicTopic
        ? `/api/kmis/learning-course/get-material-public/${activeMaterialId}`
        : `/api/kmis/learning-course/get-material/${activeMaterialId}`,
      conditions: !!activeMaterialId,
      dependencies: [activeMaterialId],
      dataResource: false,
    });
  const render = {
    loading: <Skeleton minH={"400px"} flex={1} />,
    error: <FeedbackRetry onRetry={onRetry} minH={"400px"} />,
    empty: <FeedbackNoData minH={"400px"} />,
    loaded: (
      <CContainer gap={4}>
        {MATERIAL_REGISTRY?.[
          data?.materialType as keyof typeof MATERIAL_REGISTRY
        ]?.render({ material: data })}

        <NextStepButton
          activeMaterial={data}
          topicDetail={topicDetail}
          getTopicDetail={getTopicDetail}
          idx={materials?.findIndex((m: any) => m.id === data?.id)}
          lastIdx={
            materials?.findIndex((m: any) => m.id === data?.id) ===
            materials?.length - 1
          }
          isPublicTopic={isPublicTopic}
        />
      </CContainer>
    ),
  };

  return (
    <CContainer minH={"400px"} {...restProps}>
      {isIndex && (
        <Center flex={1} bg={"body"} p={4} rounded={"xl"}>
          <FeedbackState
            icon={<IconBooks stroke={1.5} />}
            title={interpolateString(l.msg_select_material_first, {
              position: sw < 720 ? l.top.toLowerCase() : l.left.toLowerCase(),
            })}
            iconProps={{
              boxSize: 12,
            }}
            titleProps={{
              fontSize: "lg",
            }}
            descriptionProps={{
              fontSize: "lg",
            }}
            m={"auto"}
          />
        </Center>
      )}

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

      {quizStarted && <QuizWorkspace topicDetail={topicDetail} />}

      {feedbackSession && <FeedbackSession topicDetail={topicDetail} />}

      {certificateSection && <CertificateSection topicDetail={topicDetail} />}
    </CContainer>
  );
};

interface Props extends StackProps {
  topicDetail: any;
  getTopicDetail: () => void;
}
export const KMISLearningSection = (props: Props) => {
  // Props
  const { topicDetail, getTopicDetail, ...restProps } = props;

  // States
  const isPublicTopic =
    topicDetail?.topic?.topicType !== null &&
    topicDetail?.topic?.topicType !== undefined &&
    topicDetail?.topic?.topicType !== "Pelatihan";

  return (
    <LPSectionContainer
      outerContainerProps={{
        flex: 1,
      }}
      flex={1}
      bg={"bgContent"}
      gap={4}
      {...restProps}
    >
      <H3 fontWeight={"semibold"}>
        {topicDetail?.learningAttempt?.topic?.title || topicDetail?.topic.title}
      </H3>

      <Stack flexDir={["column", null, "row"]} gap={4}>
        <CContainer w={["full", null, "240px"]} flexShrink={0} gap={4}>
          <LearningModules
            topicDetail={topicDetail}
            isPublicTopic={isPublicTopic}
          />
        </CContainer>

        <ActiveMaterial
          maxW={["", null, "calc(100% - 240px)"]}
          topicDetail={topicDetail}
          getTopicDetail={getTopicDetail}
          isPublicTopic={isPublicTopic}
        />
      </Stack>
    </LPSectionContainer>
  );
};
