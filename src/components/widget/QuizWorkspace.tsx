"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui/disclosure";
import { DisclosureHeaderContent } from "@/components/ui/disclosure-header-content";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import BackButton from "@/components/widget/BackButton";
import { ClampText } from "@/components/widget/ClampText";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { DotIndicator } from "@/components/widget/Indicator";
import { ItemContainer } from "@/components/widget/ItemContainer";
import { ItemHeaderContainer } from "@/components/widget/ItemHeaderContainer";
import ItemHeaderTitle from "@/components/widget/ItemHeaderTitle";
import { QuizAttempStatus } from "@/components/widget/QuizAttempStatus";
import { ReviewQuizWorkspace } from "@/components/widget/ReviewQuizWorkspace";
import {
  Interface__KMISLearningAttempt,
  Interface__KMISMaterial,
  Interface__KMISQuiz,
  Interface__KMISQuizResponse,
} from "@/constants/interfaces";
import useConfirmationDisclosure from "@/context/disclosure/useConfirmationDisclosure";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { isEmptyArray } from "@/utils/array";
import { back } from "@/utils/client";
import { formatDate, formatDuration, formatNumber } from "@/utils/formatter";
import { capitalizeWords, interpolateString } from "@/utils/string";
import {
  addSecondsToTime,
  getRemainingSecondsUntil,
  makeTime,
} from "@/utils/time";
import { fileUrl } from "@/utils/url";
import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconStopwatch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AnswerOption = (props: any) => {
  // Props
  const {
    quizNumber,
    activeQuiz,
    courseDetail,
    optionLetter,
    optionKey,
    ...restProps
  } = props;

  // Contexts
  const { l } = useLang();
  const setRt = useRenderTrigger((s) => s.setRt);

  // Hooks
  const { req } = useRequest({
    id: `update-answer-${activeQuiz.quiz?.id}`,
    loadingMessage: {
      title: interpolateString(l.loading_answer.title, {
        quizNumber: quizNumber,
      }),
      description: interpolateString(l.loading_answer.description, {
        quizNumber: quizNumber,
      }),
    },
    successMessage: {
      title: interpolateString(l.success_answer.title, {
        quizNumber: quizNumber,
      }),
      description: interpolateString(l.success_answer.description, {
        quizNumber: quizNumber,
      }),
    },
  });

  // States
  const resolvedQuiz: Interface__KMISQuiz = activeQuiz.quiz;
  const isActive = activeQuiz?.selectedOption === optionLetter;

  // Utils
  function onAnswerSelect() {
    const payload = {
      learningAttemptId: courseDetail?.learningAttempt?.id,
      quizId: resolvedQuiz?.id,
      selectedOption: optionLetter || "",
      isMarker: activeQuiz.isMarker,
    };

    const config = {
      url: `/api/kmis/exam/create`,
      method: "POST",
      data: payload,
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          setRt((ps) => !ps);
        },
        onError: () => {},
      },
    });
  }

  return (
    <Btn
      clicky={false}
      justifyContent={"start"}
      variant={"outline"}
      borderColor={isActive ? "p.500" : "border.muted"}
      onClick={
        !!courseDetail?.learningAttempt?.quizFinished
          ? () => {}
          : onAnswerSelect
      }
      {...restProps}
    >
      <P>{optionLetter}</P>
      <P>{(resolvedQuiz as Record<string, any>)?.[optionKey]}</P>

      {isActive && <DotIndicator ml={"auto"} mr={1} />}
    </Btn>
  );
};
const MarkingCheckbox = (props: any) => {
  // Props
  const { courseDetail, activeQuiz } = props;

  // Contexts
  const { l } = useLang();
  const setRt = useRenderTrigger((s) => s.setRt);

  // Hooks
  const { req } = useRequest({
    id: "marking-question",
  });

  // Utils
  function onToggleMark() {
    const payload = {
      learningAttemptId: courseDetail?.learningAttempt?.id,
      quizId: activeQuiz?.quiz?.id,
      selectedOption: activeQuiz?.selectedOption || "",
      isMarker: !activeQuiz?.isMarker,
    };

    const config = {
      url: `/api/kmis/exam/create`,
      method: "POST",
      data: payload,
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          setRt((ps) => !ps);
        },
        onError: () => {},
      },
    });
  }

  return (
    <Checkbox
      colorPalette={"p"}
      checked={activeQuiz?.isMarker}
      onCheckedChange={onToggleMark}
      disabled={!!courseDetail?.learningAttempt?.quizFinished}
    >
      {l.marked}
    </Checkbox>
  );
};
const ManualSubmitButton = (props: any) => {
  // Props
  const { courseDetail, ...restProps } = props;

  // Contexts
  const { l } = useLang();
  const setRt = useRenderTrigger((s) => s.setRt);
  const { setConfirmationData, confirmationOnOpen } =
    useConfirmationDisclosure();

  // Hooks
  const { req } = useRequest({
    id: "submit-quiz",
  });
  const router = useRouter();

  // Utils
  function onSubmitQuiz() {
    back();

    const payload = {
      learningAttemptId: courseDetail?.learningAttempt?.id,
    };

    const config = {
      url: `/api/kmis/exam/submit-answer`,
      method: "POST",
      data: payload,
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          setRt((ps) => !ps);
          router.push(
            `/related-apps/kmis/my-course/${courseDetail?.learningAttempt.id}?feedbackSession=1`
          );
        },
      },
    });
  }

  return (
    <Btn
      variant={"subtle"}
      colorPalette={"p"}
      onClick={() => {
        setConfirmationData({
          title: "Submit",
          description: l.msg_cross_check_before_submit,
          confirmLabel: "Submit",
          onConfirm: onSubmitQuiz,
        });
        confirmationOnOpen();
      }}
      disabled={!!courseDetail?.learningAttempt?.quizFinished}
      {...restProps}
    >
      Submit
      <Icon>
        <IconArrowRight stroke={1.5} />
      </Icon>
    </Btn>
  );
};
const ActiveQuiz = (props: any) => {
  // Props
  const { courseDetail, exams, activeQuiz, activeQuizIdx, setActiveQuizIdx } =
    props;
  // Contexts
  const { l } = useLang();

  // States
  const OPTIONS_REGISTRY = [
    {
      optionLetter: "A",
      optionKey: "answerA",
    },
    {
      optionLetter: "B",
      optionKey: "answerB",
    },
    {
      optionLetter: "C",
      optionKey: "answerC",
    },
    {
      optionLetter: "D",
      optionKey: "answerD",
    },
  ];
  const quiz = activeQuiz?.quiz;
  const lastIdx = activeQuizIdx === exams?.length - 1;

  return (
    <CContainer flex={4} gap={4}>
      <ItemContainer gap={2} p={4}>
        <P fontWeight={"semibold"} color={"fg.subtle"}>{`No. ${
          activeQuizIdx + 1
        }`}</P>

        <P fontWeight={"medium"}>{quiz?.question}</P>

        {/* options abcd */}
        <CContainer gap={2} mt={2}>
          {OPTIONS_REGISTRY.map(({ optionLetter, optionKey }) => {
            return (
              <AnswerOption
                key={optionKey}
                quizNumber={activeQuizIdx + 1}
                courseDetail={courseDetail}
                optionLetter={optionLetter}
                optionKey={optionKey}
                activeQuiz={activeQuiz}
              />
            );
          })}
        </CContainer>

        <HStack wrap={"wrap"} mt={4} justify={"space-between"}>
          <MarkingCheckbox
            courseDetail={courseDetail}
            activeQuiz={activeQuiz}
          />

          <HStack flex={[1, null, 0]}>
            <Btn
              w={["", null, "150px"]}
              flex={1}
              variant={"ghost"}
              disabled={activeQuizIdx === 0}
              onClick={() => {
                setActiveQuizIdx((ps: any) => ps - 1);
              }}
            >
              <Icon>
                <IconArrowLeft stroke={1.5} />
              </Icon>

              {l.previous}
            </Btn>

            {lastIdx && (
              <ManualSubmitButton
                courseDetail={courseDetail}
                w={["", null, "150px"]}
                flex={1}
              />
            )}

            {!lastIdx && (
              <Btn
                w={["", null, "150px"]}
                flex={1}
                variant={"ghost"}
                colorPalette={""}
                onClick={() => {
                  setActiveQuizIdx((ps: any) => ps + 1);
                }}
              >
                {l.next}

                <Icon>
                  <IconArrowRight stroke={1.5} />
                </Icon>
              </Btn>
            )}
          </HStack>
        </HStack>
      </ItemContainer>
    </CContainer>
  );
};
const CountDownDuration = (props: any) => {
  // Props
  const { quizEndedAt, courseDetail, ...restProps } = props;

  // Contexts
  const setRt = useRenderTrigger((s) => s.setRt);

  // Hooks
  const { req } = useRequest({
    id: "running-out-of-time-auto-submit",
  });
  const router = useRouter();

  // States
  const isQuizFinished = !!courseDetail?.learningAttempt?.quizFinished;
  const [remainingSeconds, setRemainingSeconds] = useState(
    getRemainingSecondsUntil(quizEndedAt)
  );
  const formattedTime = formatDuration(remainingSeconds, "digital");

  // Utils
  function onSubmitQuiz() {
    const payload = {
      learningAttemptId: courseDetail?.learningAttempt?.id,
    };

    const config = {
      url: `/api/kmis/exam/submit-answer`,
      method: "POST",
      data: payload,
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          setRt((ps) => !ps);
          router.push(
            `/related-apps/kmis/my-course/${courseDetail?.learningAttempt.id}?feedbackSession=1`
          );
        },
      },
    });
  }

  useEffect(() => {
    // Recalculate every second
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          clearInterval(interval);
          if (!isQuizFinished) onSubmitQuiz();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [quizEndedAt]);

  return (
    <HStack
      gap={1}
      h={"40px"}
      pl={3}
      pr={4}
      bg={"blue.100"}
      rounded={"xl"}
      justify={"space-between"}
      color={"blue.500"}
      {...restProps}
    >
      <Icon boxSize={5}>
        <IconStopwatch />
      </Icon>

      <P fontSize={"lg"} fontWeight={"semibold"}>
        {formattedTime}
      </P>
    </HStack>
  );
};
const ResultDetail = (props: any) => {
  // Props
  const { courseDetail, ...restProps } = props;

  // Contexts
  const { l } = useLang();
  const { themeConfig } = useThemeConfig();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(
    `answer-review-${courseDetail?.learningAttempt?.id}`,
    open,
    onOpen,
    onClose
  );

  // States
  const { error, initialLoading, data, onRetry } = useDataState<{
    learningParticipant: Interface__KMISLearningAttempt;
    exam: Interface__KMISQuizResponse[];
  }>({
    initialData: undefined,
    url: `/api/kmis/learning-course/get-finished-attempt/${courseDetail?.learningAttempt?.id}`,
    dependencies: [open],
    conditions: open,
    dataResource: false,
  });
  const resolvedAttempt = data?.learningParticipant;
  const render = {
    loading: <Skeleton w={"full"} h={"400px"} />,
    error: <FeedbackRetry onRetry={onRetry} h={"400px"} />,
    empty: <FeedbackNoData h={"400px"} />,
    loaded: (
      <CContainer gap={4}>
        <SimpleGrid columns={[1, null, 2]} gap={4} px={1}>
          <ItemContainer
            rounded={themeConfig.radii.component}
            border={"1px solid"}
            borderColor={"border.muted"}
          >
            <ItemHeaderContainer borderless>
              <ItemHeaderTitle>{capitalizeWords(l.basic_info)}</ItemHeaderTitle>
            </ItemHeaderContainer>

            <CContainer gap={4} p={4} pt={2}>
              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.name}
                </P>
                <P>:</P>
                <ClampText>{resolvedAttempt?.attemptUser.name}</ClampText>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {"Email"}
                </P>
                <P>:</P>
                <ClampText>{resolvedAttempt?.attemptUser.email}</ClampText>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.course_category}
                </P>
                <P>:</P>
                <ClampText>{resolvedAttempt?.topic.category.title}</ClampText>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  Course
                </P>
                <P>:</P>
                <ClampText>{resolvedAttempt?.topic.title}</ClampText>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.description}
                </P>
                <P>:</P>
                <ClampText>{resolvedAttempt?.topic.description}</ClampText>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.duration}
                </P>
                <P>:</P>
                <P>{formatDuration(resolvedAttempt?.topic.quizDuration)}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.start_date_time}
                </P>
                <P>:</P>
                <P>
                  {formatDate(resolvedAttempt?.quizStarted, {
                    variant: "numeric",
                    withTime: true,
                  })}
                </P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.end_date_time}
                </P>
                <P>:</P>
                <P>
                  {formatDate(resolvedAttempt?.quizFinished, {
                    variant: "numeric",
                    withTime: true,
                  })}
                </P>
              </HStack>
            </CContainer>
          </ItemContainer>

          <ItemContainer
            rounded={themeConfig.radii.component}
            border={"1px solid"}
            borderColor={"border.muted"}
          >
            <ItemHeaderContainer borderless>
              <ItemHeaderTitle>{capitalizeWords(l.quiz_info)}</ItemHeaderTitle>
            </ItemHeaderContainer>

            <CContainer gap={4} p={4} pt={2}>
              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.progress_status}
                </P>
                <P>:</P>
                <QuizAttempStatus
                  quizAttempStatus={resolvedAttempt?.attemptStatus}
                />
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.grade}
                </P>
                <P>:</P>
                <P>{`${resolvedAttempt?.scoreTotal}`}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.total_answered}
                </P>
                <P>:</P>
                <P>{formatNumber(resolvedAttempt?.questionsAnswered || 0)}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.total_correct}
                </P>
                <P>:</P>
                <P>{formatNumber(resolvedAttempt?.correctCount)}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.total_wrong}
                </P>
                <P>:</P>
                <P>{formatNumber(resolvedAttempt?.wrongCount)}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.total_empty}
                </P>
                <P>:</P>
                <P>{formatNumber(resolvedAttempt?.emptyCount)}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  Feedback
                </P>
                <P>:</P>
                <P>{resolvedAttempt?.feedback || "-"}</P>
              </HStack>

              <HStack align={"start"}>
                <P w={"120px"} color={"fg.muted"} flexShrink={0}>
                  {l.certificate}
                </P>
                <P>:</P>
                <NavLink
                  to={fileUrl(resolvedAttempt?.certificate?.[0]?.filePath)}
                  external
                >
                  <Btn
                    variant={"plain"}
                    p={0}
                    h={"fit"}
                    color={`${themeConfig.colorPalette}.fg`}
                  >
                    {l.view}
                    <Icon boxSize={5}>
                      <IconArrowUpRight stroke={1.5} />
                    </Icon>
                  </Btn>
                </NavLink>
              </HStack>
            </CContainer>
          </ItemContainer>
        </SimpleGrid>

        <ReviewQuizWorkspace quizResponses={data} px={1} />
      </CContainer>
    ),
  };

  return (
    <>
      <Btn
        colorPalette={"p"}
        // variant={"outline"}
        onClick={onOpen}
        {...restProps}
      >
        {l.answer_review}
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xl"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={l.answer_review} />
          </DisclosureHeader>

          <DisclosureBody>
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
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};
const QuestionList = (props: any) => {
  // Props
  const { exams, courseDetail, activeQuizIdx, setActiveQuizIdx, ...restProps } =
    props;

  // Contexts
  const { l } = useLang();

  // States
  const quizDurationSeconds =
    courseDetail?.learningAttempt?.topic?.quizDuration;
  const quizStartedAt = makeTime(courseDetail?.learningAttempt?.quizStarted);
  const quizEndedAt = addSecondsToTime(quizStartedAt, quizDurationSeconds);
  const isQuizFinished = !!courseDetail?.learningAttempt?.quizFinished;

  return (
    <CContainer flex={1} gap={4} {...restProps}>
      {isQuizFinished && <ResultDetail courseDetail={courseDetail} />}

      {!isQuizFinished && (
        <CountDownDuration
          quizEndedAt={quizEndedAt}
          courseDetail={courseDetail}
        />
      )}

      <ItemContainer h={"fit"} gap={4} p={4}>
        <P fontWeight={"semibold"}>{l.list_of_questions}</P>

        <SimpleGrid columns={5} gap={2} w={"max"}>
          {exams?.map((exam: Interface__KMISQuizResponse, idx: number) => {
            const isActive = activeQuizIdx === idx;
            const isAnswered = !!exam?.selectedOption;
            const isMarked = !!exam?.isMarker;

            return (
              <Btn
                key={idx}
                iconButton
                size={"xs"}
                variant={"outline"}
                border={"1px solid"}
                borderColor={isActive ? "p.500" : "border.muted"}
                bg={isMarked ? "orange.400" : isAnswered ? "fg.success" : ""}
                color={isMarked || isAnswered ? "light" : ""}
                onClick={() => setActiveQuizIdx(idx)}
              >
                {idx + 1}
              </Btn>
            );
          })}
        </SimpleGrid>

        <CContainer gap={2} px={"2px"}>
          <HStack>
            <Box w={"12px"} aspectRatio={1} bg={"fg.success"} rounded={"xs"} />
            <P>{l.answered}</P>
          </HStack>

          <HStack>
            <Box w={"12px"} aspectRatio={1} bg={"orange.400"} rounded={"xs"} />
            <P>{l.marked}</P>
          </HStack>
        </CContainer>
      </ItemContainer>

      <ItemContainer gap={1} p={4}>
        <HStack justify={"space-between"}>
          <P>{l.started_at}</P>
          <P fontWeight={"medium"}>{quizStartedAt}</P>
        </HStack>

        <HStack justify={"space-between"}>
          <P>{l.ended_at}</P>
          <P fontWeight={"medium"}>{quizEndedAt}</P>
        </HStack>
      </ItemContainer>
    </CContainer>
  );
};

interface Props extends StackProps {
  courseDetail?: {
    learningAttempt: Interface__KMISLearningAttempt;
    material: Interface__KMISMaterial[];
  };
  quizResponses?: Interface__KMISQuizResponse[];
}
export const QuizWorkspace = (props: Props) => {
  // Props
  const { courseDetail, ...restProps } = props;

  // States
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const { error, initialLoading, data, onRetry } = useDataState<{
    learningParticipant: Interface__KMISLearningAttempt;
    exam: Interface__KMISQuiz[];
  }>({
    url: `/api/kmis/learning-course/get-quiz-with-answer/${courseDetail?.learningAttempt?.id}`,
    dependencies: [],
    dataResource: false,
  });
  const exams = data?.exam;
  const activeQuiz = exams?.[activeQuizIdx];

  const render = {
    loading: <Skeleton flex={1} rounded={"xl"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <Stack flexDir={["column", null, "row"]} gap={4} {...restProps}>
        <ActiveQuiz
          courseDetail={courseDetail}
          exams={exams}
          activeQuiz={activeQuiz}
          activeQuizIdx={activeQuizIdx}
          setActiveQuizIdx={setActiveQuizIdx}
        />

        <QuestionList
          courseDetail={courseDetail}
          exams={exams}
          activeQuizIdx={activeQuizIdx}
          setActiveQuizIdx={setActiveQuizIdx}
        />
      </Stack>
    ),
  };

  return (
    <CContainer flex={1}>
      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {(!data || isEmptyArray(exams)) && render.empty}
            </>
          )}
        </>
      )}
    </CContainer>
  );
};
