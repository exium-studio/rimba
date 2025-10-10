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

const StartLearningButton = (props: any) => {
  // Props
  const { topic } = props;

  // Contexts
  const { l } = useLang();
  const authToken = useAuthMiddleware((s) => s.authToken);

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
    <SigninDisclosureTrigger
      id={"signin-fallback-start-learning"}
      onClick={authToken ? startLearning : undefined}
      mt={2}
    >
      <Btn
        w={["full", null, "fit"]}
        colorPalette={"p"}
        ml={"auto"}
        onClick={authToken ? startLearning : () => {}}
      >
        {l.start_learning}

        <Icon>
          <IconArrowRight stroke={1.5} />
        </Icon>
      </Btn>
    </SigninDisclosureTrigger>
  );
};
const DetailTopic = (props: any) => {
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
    url: `/api/kmis/public-request/get-topic/${resolvedTopic.id}`,
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

          <CContainer gap={2}>
            <Badge w={"fit"}>{data?.category.title}</Badge>

            <P fontSize={"lg"} fontWeight={"semibold"}>
              {data?.title}
            </P>

            <HStack color={"fg.subtle"}>
              <Icon>
                <IconRocket stroke={1.5} />
              </Icon>

              <P>{formatDate(data?.createdAt)}</P>
            </HStack>

            <HStack color={"fg.subtle"}>
              <Icon>
                <IconRefresh stroke={1.5} />
              </Icon>

              <P>{formatDate(data?.updatedAt as string)}</P>
            </HStack>

            <Stack
              flexDir={["column", null, "row"]}
              gap={4}
              align={["", null, "end"]}
              mt={"auto"}
              pt={4}
            >
              <HStack align={"end"} flexShrink={0}>
                <P fontSize={"lg"} fontWeight={"medium"}>
                  123
                </P>

                <P fontSize={"sm"} transform={"translateY(1px)"}>
                  {l.student}
                </P>
              </HStack>
            </Stack>

            <StartLearningButton topic={topic} />
          </CContainer>
        </Stack>

        <P>{data?.description}</P>

        <CContainer>
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
          <DisclosureHeader>
            <DisclosureHeaderContent title={`Detail ${topic.title}`} />
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
}
export const KMISTopicItem = (props: Props) => {
  // Props
  const { topic, idx, ...restProps } = props;

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
            {topic.category.title}
          </P>
        </Badge>

        <P fontSize={"lg"} fontWeight={"semibold"} lineClamp={1}>
          {topic.title}
        </P>

        <P color={"fg.subtle"} lineClamp={1}>
          {topic.description}
        </P>
      </CContainer>

      <CContainer p={2} pt={0}>
        <DetailTopic topic={topic} idx={idx} />
      </CContainer>
    </CContainer>
  );
};
