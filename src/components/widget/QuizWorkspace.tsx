"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { P } from "@/components/ui/p";
import { Switch } from "@/components/ui/switch";
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
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { isEmptyArray } from "@/utils/array";
import { interpolateString } from "@/utils/string";
import {
  Box,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Stack,
  StackProps,
} from "@chakra-ui/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

const AnswerOption = (props: any) => {
  // Props
  const {
    quizNumber,
    courseDetail,
    optionLetter,
    optionKey,
    quiz,
    selected,
    setSelected,
    ...restProps
  } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req } = useRequest({
    id: `update-answer-${quiz.id}`,
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
  const resolvedQuiz: Interface__KMISQuiz = quiz;
  const isActive = selected === optionLetter;

  // Utils
  function onUpdate() {
    setSelected(optionLetter);

    const payload = {
      learningAttemptId: courseDetail?.learningAttempt?.id,
      quizId: resolvedQuiz?.id,
      selectedOption: optionLetter || "",
      isMarker: false,
    };

    const config = {
      url: `/api/kmis/exam/create`,
      method: "POST",
      data: payload,
    };

    req({
      config,
    });
  }

  return (
    <Btn
      clicky={false}
      justifyContent={"start"}
      variant={"outline"}
      borderColor={isActive ? "p.500" : "border.muted"}
      onClick={onUpdate}
      {...restProps}
    >
      <P>{optionLetter}</P>
      <P>{(resolvedQuiz as Record<string, any>)?.[optionKey]}</P>

      {isActive && <DotIndicator ml={"auto"} mr={1} />}
    </Btn>
  );
};
const ActiveQuiz = (props: any) => {
  // Props
  const { courseDetail, activeQuiz, activeQuizIdx, setActiveQuizIdx } = props;

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
  const [selected, setSelected] = useState<string>("");

  return (
    <ItemContainer
      flex={4}
      gap={2}
      p={4}
      border={"1px solid"}
      borderColor={"border.muted"}
    >
      <P fontWeight={"semibold"}>{`No. ${activeQuizIdx + 1}`}</P>

      <P fontWeight={"medium"}>{activeQuiz?.question}</P>

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
              quiz={activeQuiz}
              selected={selected}
              setSelected={setSelected}
            />
          );
        })}
      </CContainer>

      <HStack mt={4} justify={"space-between"}>
        {/* TODO handle marked question */}
        <Switch colorPalette={"p"}>{l.marked}</Switch>

        <HStack>
          <Btn
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

          <Btn
            variant={"ghost"}
            onClick={() => {
              setActiveQuizIdx((ps: any) => ps + 1);
            }}
          >
            {l.next}

            <Icon>
              <IconArrowRight stroke={1.5} />
            </Icon>
          </Btn>
        </HStack>
      </HStack>
    </ItemContainer>
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

  // Contexts
  const { l } = useLang();

  // States
  const [activeQuizIdx, setActiveQuizIdx] = useState<number>(0);
  const { error, initialLoading, data, onRetry } = useDataState<{
    quiz: Interface__KMISQuiz[];
  }>({
    url: `/api/kmis/learning-course/get-quiz-with-answer/${courseDetail?.learningAttempt?.topic?.id}`,
    dependencies: [],
    dataResource: false,
  });
  const quizes = data?.quiz;
  const activeQuiz = data?.quiz?.[activeQuizIdx];

  const render = {
    loading: <Skeleton flex={1} rounded={"xl"} />,
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: (
      <Stack flexDir={["column", null, "row"]} gap={4} {...restProps}>
        <ActiveQuiz
          courseDetail={courseDetail}
          activeQuiz={activeQuiz}
          activeQuizIdx={activeQuizIdx}
        />

        <ItemContainer
          flex={1}
          h={"fit"}
          gap={4}
          p={4}
          border={"1px solid"}
          borderColor={"border.muted"}
        >
          <P fontWeight={"semibold"}>{l.list_of_questions}</P>

          <SimpleGrid columns={5} gap={2} w={"max"}>
            {quizes?.map((_, idx) => {
              const isActive = activeQuizIdx === idx;

              return (
                <Btn
                  key={idx}
                  iconButton
                  size={"xs"}
                  variant={"outline"}
                  border={isActive ? "1px solid" : "none"}
                  borderColor={"border.muted"}
                  onClick={() => setActiveQuizIdx(idx)}
                >
                  {idx + 1}
                </Btn>
              );
            })}
          </SimpleGrid>

          <CContainer gap={2} px={"2px"}>
            <HStack>
              <Box
                w={"12px"}
                aspectRatio={1}
                bg={"fg.success"}
                rounded={"xs"}
              />
              <P>{l.answered}</P>
            </HStack>

            <HStack>
              <Box
                w={"12px"}
                aspectRatio={1}
                bg={"fg.warning"}
                rounded={"xs"}
              />
              <P>{l.marked}</P>
            </HStack>
          </CContainer>
        </ItemContainer>
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
              {(!data || isEmptyArray(quizes)) && render.empty}
            </>
          )}
        </>
      )}
    </CContainer>
  );
};
