"use client";

import { Avatar } from "@/components/ui/avatar";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "@/components/ui/disclosure";
import { DisclosureHeaderContent } from "@/components/ui/disclosure-header-content";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import BackButton from "@/components/widget/BackButton";
import { ClampText } from "@/components/widget/ClampText";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { SigninDisclosureTrigger } from "@/components/widget/SigninDisclosure";
import {
  Interface__KMISLearningAttempt,
  Interface__KMISTopic,
} from "@/constants/interfaces";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { isEmptyArray } from "@/utils/array";
import { formatDate, formatNumber } from "@/utils/formatter";
import { imgUrl } from "@/utils/url";
import {
  Badge,
  HStack,
  Icon,
  Skeleton,
  Stack,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IconArrowRight,
  IconAward,
  IconCircleFilled,
  IconEye,
  IconRefresh,
  IconRocket,
  IconStarFilled,
} from "@tabler/icons-react";

const EnrollButton = (props: any) => {
  // Props
  const { topic, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req } = useRequest({
    id: "subs_course",
    successMessage: { ...l.success_enroll_course },
  });

  // Utils
  function onEnroll() {
    const payload = {
      topicId: topic?.id,
    };
    req({
      config: {
        url: `/api/kmis/learning-course/create`,
        method: "POST",
        data: payload,
      },
    });
  }

  return (
    <SigninDisclosureTrigger>
      <Btn w={"fit"} colorPalette={"p"} onClick={onEnroll} {...restProps}>
        {l.enroll_now}

        <Icon>
          <IconArrowRight stroke={1.5} />
        </Icon>
      </Btn>
    </SigninDisclosureTrigger>
  );
};
const StartLearningButton = (props: any) => {
  // Props
  const { topic, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const isPublicTopic = topic?.topicType !== "Pelatihan";

  return (
    <NavLink
      to={`/related-apps/kmis/my-topic/${topic?.id}?${
        isPublicTopic ? `isPublic=1` : ``
      }`}
      w={restProps.w || "fit"}
    >
      <Btn colorPalette={"p"} variant={"outline"} {...restProps}>
        {isPublicTopic ? l.start_reading : l.start_learning}

        <Icon>
          <IconArrowRight stroke={1.5} />
        </Icon>
      </Btn>
    </NavLink>
  );
};

const DetailDisclosureTrigger = (props: any) => {
  // Props
  const { myCourse, topic, idx, ...restProps } = props;
  const resolvedTopic: Interface__KMISTopic = topic;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`topic-detail-${topic.id}-${idx}`, open, onOpen, onClose);

  // States
  const { error, loading, data, onRetry } = useDataState<any>({
    initialData: undefined,
    url: `/api/kmis/learning-course/show/${resolvedTopic.id}`,
    conditions: open,
    dependencies: [open],
    dataResource: false,
  });
  const isPublicTopic = data?.topic?.topicType !== "Pelatihan";

  const render = {
    loading: <Skeleton minH={"400px"} rounded={"lg"} />,
    error: <FeedbackRetry onRetry={onRetry} minH={"400px"} />,
    empty: <FeedbackNoData minH={"400px"} />,
    loaded: (
      <CContainer gap={8} px={[0, null, 2]}>
        {/* Overview */}
        <Stack flexDir={["column", null, "row"]} gapX={8} gapY={4}>
          <Img
            src={imgUrl(data?.topic?.topicCover?.[0]?.filePath)}
            aspectRatio={1}
            fluid
            rounded={"lg"}
            w={["full", null, "50%"]}
          />

          <CContainer gap={2} py={2}>
            <Badge w={"fit"} maxW={"full"}>
              {data?.topic?.category?.title}
            </Badge>

            <P fontSize={"xl"} fontWeight={"semibold"} mb={2} lineHeight={1.4}>
              {data?.topic?.title}
            </P>

            <HStack wrap={"wrap"} gap={4} align={["", null, "end"]}>
              <HStack align={"end"} flexShrink={0}>
                <P fontSize={"lg"} fontWeight={"medium"}>
                  {`${data?.material?.length}`}
                </P>

                <P fontSize={"sm"} transform={"translateY(1px)"}>
                  {l.total_material}
                </P>
              </HStack>

              {!isPublicTopic && (
                <>
                  <HStack align={"end"} flexShrink={0}>
                    <P fontSize={"lg"} fontWeight={"medium"}>
                      {`${data?.topic?.totalQuiz}`}
                    </P>

                    <P fontSize={"sm"} transform={"translateY(1px)"}>
                      {l.total_quiz}
                    </P>
                  </HStack>

                  <HStack align={"end"} flexShrink={0}>
                    <P fontSize={"lg"} fontWeight={"medium"}>
                      {`${(data?.topic?.quizDuration || 0) / 60}`}
                    </P>

                    <P fontSize={"sm"} transform={"translateY(1px)"}>
                      {`${l.quiz_duration} (${l.minutes?.toLowerCase()})`}
                    </P>
                  </HStack>
                </>
              )}
            </HStack>

            <CContainer gap={1} pt={4}>
              <HStack color={"fg.subtle"}>
                <Icon boxSize={4}>
                  <IconRocket stroke={1.5} />
                </Icon>

                <P fontSize={"sm"}>{`${formatDate(
                  data?.topic?.createdAt
                )} ${l.released?.toLowerCase()}`}</P>
              </HStack>

              <HStack color={"fg.subtle"}>
                <Icon boxSize={4}>
                  <IconRefresh stroke={1.5} />
                </Icon>

                <P fontSize={"sm"}>
                  {`${formatDate(
                    data?.topic?.updatedAt as string
                  )} ${l.last_updated?.toLowerCase()}`}
                </P>
              </HStack>

              <HStack color={"fg.subtle"}>
                <Icon boxSize={4.5}>
                  <IconEye stroke={1.5} />
                </Icon>

                <P fontSize={"sm"}>
                  {`${formatNumber(
                    data?.topic?.totalViews
                  )} ${l.views?.toLowerCase()}`}
                </P>
              </HStack>
            </CContainer>

            {!isPublicTopic && (
              <HStack mt={4}>
                <Icon color={"orange.400"}>
                  <IconStarFilled />
                </Icon>

                <P fontSize={"lg"}>{`${
                  data?.avgFeedbackRate ? `${data?.avgFeedbackRate}/5` : "-"
                }`}</P>
              </HStack>
            )}

            <CContainer mt={"auto"}>
              {data?.topic?.topicType === "Pengetahuan" || myCourse ? (
                <StartLearningButton topic={topic} mt={2} />
              ) : (
                <EnrollButton topic={topic} mt={2} />
              )}
            </CContainer>
          </CContainer>
        </Stack>

        {/* Description */}
        <CContainer gap={2}>
          <P fontWeight={"semibold"}>{l.description}</P>

          <P>{data?.topic?.description || "-"}</P>
        </CContainer>

        {/* Material list */}
        <CContainer gap={2}>
          <P fontWeight={"semibold"}>{l.learning_material}</P>

          <CContainer gap={1}>
            {isEmptyArray(data?.material) && <P>-</P>}

            {data?.material?.map((material: any) => {
              return (
                <HStack key={material?.id}>
                  <Icon boxSize={2} color={"fg.subtle"}>
                    <IconCircleFilled />
                  </Icon>

                  <P>{material?.title}</P>
                </HStack>
              );
            })}
          </CContainer>
        </CContainer>

        {/* Testimonials */}
        {!isPublicTopic && (
          <CContainer gap={2}>
            <P fontWeight={"semibold"}>Terstimonial</P>

            {isEmptyArray(data?.feedback) && <P>-</P>}

            <CContainer overflowX={"auto"}>
              <HStack w={"max"} align={"stretch"}>
                {data?.feedback?.map((feedback: any, idx: number) => {
                  return (
                    <CContainer
                      key={`${feedback?.id}-${idx}`}
                      p={4}
                      rounded={"lg"}
                      border={"1px solid"}
                      borderColor={"border.muted"}
                      w={"200px"}
                      h={"auto"}
                      aspectRatio={1}
                      gap={4}
                    >
                      <CContainer>
                        <HStack gap={1}>
                          {Array.from({ length: 5 }, (_, i) => {
                            return (
                              <Icon
                                key={i}
                                boxSize={3}
                                color={
                                  i < feedback?.rate
                                    ? "orange.500"
                                    : "fg.subtle"
                                }
                              >
                                <IconStarFilled />
                              </Icon>
                            );
                          })}
                        </HStack>
                      </CContainer>

                      <CContainer gap={2}>
                        <ClampText
                          w={"full"}
                          lineClamp={8}
                        >{`${feedback?.comment}`}</ClampText>
                      </CContainer>

                      <HStack mt={"auto"} pt={2}>
                        <Avatar
                          size={"sm"}
                          name={feedback?.ratedBy?.name}
                          src={imgUrl(
                            feedback?.ratedBy?.photoProfile?.[0]?.filePath
                          )}
                        />

                        <CContainer>
                          <ClampText w={"full"}>
                            {feedback?.ratedBy?.name}
                          </ClampText>

                          <ClampText
                            w={"full"}
                            color={"fg.subtle"}
                            fontSize={"sm"}
                          >
                            {feedback?.ratedBy?.email}
                          </ClampText>
                        </CContainer>
                      </HStack>
                    </CContainer>
                  );
                })}
              </HStack>
            </CContainer>
          </CContainer>
        )}
      </CContainer>
    ),
  };

  return (
    <>
      <Btn
        colorPalette={myCourse ? "" : "p"}
        variant={"outline"}
        onClick={onOpen}
        {...restProps}
      >
        <Icon>
          <IconEye stroke={1.5} />
        </Icon>

        {l.view_detail}
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xl"}>
        <DisclosureContent>
          <DisclosureHeader border={"none"}>
            <DisclosureHeaderContent title={``} />
          </DisclosureHeader>

          <DisclosureBody pt={6}>
            {loading && render.loading}
            {!loading && (
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

interface Props extends StackProps {
  learningAttempt?: Interface__KMISLearningAttempt;
  topic: Interface__KMISTopic;
  idx: number;
  myCourse?: boolean;
}
export const KMISTopicItem = (props: Props) => {
  // Props
  const { learningAttempt, myCourse = false, topic, idx, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const isFinished = !isEmptyArray(learningAttempt?.certificate);

  return (
    <CContainer
      key={topic.id}
      rounded={"xl"}
      bg={"body"}
      overflow={"clip"}
      border={"1px solid"}
      borderColor={"d1"}
      pos={"relative"}
      {...restProps}
    >
      {isFinished && (
        <Badge
          colorPalette={"green"}
          pos={"absolute"}
          top={4}
          left={4}
          zIndex={2}
          maxW={"50%"}
        >
          {l.finished}
        </Badge>
      )}

      <CContainer p={2}>
        <Img
          key={topic?.topicCover?.[0]?.filePath}
          src={imgUrl(topic?.topicCover?.[0]?.filePath)}
          aspectRatio={1}
          rounded={"lg"}
        />
      </CContainer>

      <CContainer p={4} gap={2} pos={"relative"}>
        <Badge w={"fit"} maxW={"50%"}>
          <ClampText fontSize={"xs"} w={"full"}>
            {topic?.category?.title}
          </ClampText>
        </Badge>

        <ClampText
          w={"full"}
          fontSize={"lg"}
          fontWeight={"semibold"}
          lineClamp={1}
        >
          {topic.title}
        </ClampText>

        <ClampText w={"full"} color={"fg.subtle"} lineClamp={1}>
          {topic.description}
        </ClampText>
      </CContainer>

      <CContainer gap={2} p={2} pt={0}>
        <DetailDisclosureTrigger
          myCourse={myCourse}
          topic={topic}
          idx={idx}
          pl={[5, null, 3]}
        />

        {myCourse && (
          <HStack>
            {isFinished && (
              <NavLink
                to={`/related-apps/kmis/my-topic/${topic?.id}?certificateSection=1`}
                w={"full"}
              >
                <Btn colorPalette={"p"} variant={"outline"}>
                  <Icon>
                    <IconAward stroke={1.5} />
                  </Icon>

                  {`${l.view} ${l.certificate?.toLowerCase()}`}
                </Btn>
              </NavLink>
            )}

            {myCourse && !isFinished && (
              <StartLearningButton topic={topic} w={"full"} />
            )}
          </HStack>
        )}
      </CContainer>
    </CContainer>
  );
};
