"use client";

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
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { SigninDisclosureTrigger } from "@/components/widget/SigninDisclosure";
import { Interface__KMISTopic } from "@/constants/interfaces";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { formatDate } from "@/utils/formatter";
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
  IconEye,
  IconRefresh,
  IconRocket,
} from "@tabler/icons-react";

const EnrollButton = (props: any) => {
  // Props
  const { topic } = props;

  // Contexts
  const { l } = useLang();
  const authToken = useAuthMiddleware((s) => s.verifiedAuthToken);

  // Hooks
  const { req } = useRequest({
    id: "subs_course",
  });

  // Utils
  function startLearning() {
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
    <SigninDisclosureTrigger id={"signin-fallback-start-learning"} mt={2}>
      <Btn
        w={["full", null, "fit"]}
        colorPalette={"p"}
        ml={"auto"}
        onClick={authToken ? startLearning : () => {}}
      >
        {l.enroll_now}

        <Icon>
          <IconArrowRight stroke={1.5} />
        </Icon>
      </Btn>
    </SigninDisclosureTrigger>
  );
};
const DetailCourse = (props: any) => {
  // Props
  const { topic, idx, ...restProps } = props;
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
  const render = {
    loading: <Skeleton minH={"400px"} />,
    error: <FeedbackRetry onRetry={onRetry} minH={"400px"} />,
    empty: <FeedbackNoData minH={"400px"} />,
    loaded: (
      <CContainer gap={8}>
        <Stack flexDir={["column", null, "row"]} gapX={8} gapY={4}>
          <Img
            src={imgUrl(data?.topicCover?.[0]?.filePath)}
            aspectRatio={1.1}
            fluid
            rounded={"lg"}
          />

          <CContainer gap={2} py={2}>
            <Badge w={"fit"}>{data?.topic?.category?.title}</Badge>

            <P fontSize={"xl"} fontWeight={"semibold"} mb={2}>
              {data?.topic?.title}
            </P>

            <HStack wrap={"wrap"} gap={4}>
              <HStack color={"fg.subtle"}>
                <Icon boxSize={4}>
                  <IconRocket stroke={1.5} />
                </Icon>

                <P fontSize={"sm"}>{`${formatDate(
                  data?.topic?.createdAt
                )} (${l.release_date.toLowerCase()})`}</P>
              </HStack>

              <HStack color={"fg.subtle"}>
                <Icon boxSize={4}>
                  <IconRefresh stroke={1.5} />
                </Icon>

                <P fontSize={"sm"}>
                  {`${formatDate(
                    data?.topic?.updatedAt as string
                  )}  (${l.last_updated.toLowerCase()})`}
                </P>
              </HStack>
            </HStack>

            <HStack
              wrap={"wrap"}
              gap={4}
              align={["", null, "end"]}
              mt={"auto"}
              pt={4}
            >
              <HStack align={"end"} flexShrink={0}>
                <P fontSize={"lg"} fontWeight={"medium"}>
                  {`${data?.material?.length}`}
                </P>

                <P fontSize={"sm"} transform={"translateY(1px)"}>
                  {l.total_material}
                </P>
              </HStack>

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
                  {`${data?.topic?.quiz_duration || 0 * 60}`}
                </P>

                <P fontSize={"sm"} transform={"translateY(1px)"}>
                  {`${l.quiz_duration} (${l.minutes.toLowerCase()})`}
                </P>
              </HStack>
            </HStack>

            <EnrollButton topic={topic} />
          </CContainer>
        </Stack>

        <CContainer gap={1}>
          <P fontWeight={"semibold"}>{l.description}</P>

          <P>{data?.topic?.description || "-"}</P>
        </CContainer>

        <CContainer gap={1}>
          <P fontWeight={"semibold"}>Terstimonial</P>

          <CContainer overflowX={"auto"}>
            <HStack w={"max"}></HStack>
          </CContainer>
        </CContainer>
      </CContainer>
    ),
  };

  return (
    <>
      <Btn
        colorPalette={"p"}
        variant={"outline"}
        onClick={onOpen}
        {...restProps}
      >
        <Icon>
          <IconEye stroke={1.5} />
        </Icon>

        {l.view}
      </Btn>

      <DisclosureRoot open={open} lazyLoad size={"xl"}>
        <DisclosureContent>
          <DisclosureHeader border={"none"}>
            <DisclosureHeaderContent title={``} />
          </DisclosureHeader>

          <DisclosureBody>
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
  topic: Interface__KMISTopic;
  idx: number;
  myCourse?: boolean;
}
export const KMISCourseItem = (props: Props) => {
  // Props
  const { myCourse = false, topic, idx, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  return (
    <CContainer
      className="ss"
      key={topic.id}
      rounded={"lg"}
      overflow={"clip"}
      border={"1px solid"}
      borderColor={"d1"}
      {...restProps}
    >
      <Img
        key={topic?.topicCover?.[0]?.filePath}
        src={imgUrl(topic?.topicCover?.[0]?.filePath)}
        aspectRatio={1.1}
        rounded={"lg"}
      />

      <CContainer p={4} gap={2} pos={"relative"}>
        <Badge pos={"absolute"} top={"-28px"} left={2}>
          <P fontSize={"xs"} lineClamp={1} maxW={"100px"}>
            {topic?.category?.title}
          </P>
        </Badge>

        <P fontSize={"lg"} fontWeight={"semibold"} lineClamp={1}>
          {topic.title}
        </P>

        <P color={"fg.subtle"} lineClamp={1}>
          {topic.description}
        </P>
      </CContainer>

      <CContainer gap={2} p={2} pt={0}>
        <DetailCourse topic={topic} idx={idx} pl={[5, null, 3]} />

        {myCourse && (
          <NavLink to={`/related-apps/kmis/my-course/${topic?.id}`}>
            <Btn colorPalette={"p"}>
              {l.start_learning}

              <Icon>
                <IconArrowRight stroke={1.5} />
              </Icon>
            </Btn>
          </NavLink>
        )}
      </CContainer>
    </CContainer>
  );
};
