"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Checkbox } from "@/components/ui/checkbox";
import { P } from "@/components/ui/p";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { DotIndicator } from "@/components/widget/Indicator";
import { ItemContainer } from "@/components/widget/ItemContainer";
import {
  Interface__KMISLearningAttempt,
  Interface__KMISMaterial,
  Interface__KMISQuiz,
  Interface__KMISQuizResponse,
} from "@/constants/interfaces";
import useConfirmationDisclosure from "@/context/disclosure/useConfirmationDisclosure";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { isEmptyArray } from "@/utils/array";
import { back } from "@/utils/client";
import { formatDuration } from "@/utils/formatter";
import { interpolateString } from "@/utils/string";
import {
  addSecondsToTime,
  getRemainingSecondsUntil,
  makeTime,
} from "@/utils/time";
import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import {
  IconArrowLeft,
  IconArrowRight,
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
          router.push(
            `/related-apps/kmis/my-course/${courseDetail?.learningAttempt.id}?feedbackSession=1`
          );
        },
      },
    });
  }

  return (
    <Btn
      w={"150px"}
      variant={"outline"}
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

        <HStack mt={4} justify={"space-between"}>
          <MarkingCheckbox
            courseDetail={courseDetail}
            activeQuiz={activeQuiz}
          />

          <HStack>
            <Btn
              w={"150px"}
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

            {lastIdx && <ManualSubmitButton courseDetail={courseDetail} />}

            {!lastIdx && (
              <Btn
                w={"150px"}
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
      {isQuizFinished && (
        <Btn colorPalette={"p"} variant={"outline"}>
          {l.answer_review}
        </Btn>
      )}

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
                bg={isMarked ? "fg.warning" : isAnswered ? "fg.success" : ""}
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
            <Box w={"12px"} aspectRatio={1} bg={"fg.warning"} rounded={"xs"} />
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
