"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { H2 } from "@/components/ui/heading";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import FolderShape from "@/components/widget/FolderShape";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import { formatDate } from "@/utils/formatter";
import { Box, HStack, Icon, SimpleGrid, StackProps } from "@chakra-ui/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useRef } from "react";

const ActivityItem = (props: any) => {
  // Props
  const { activity, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  return (
    <CContainer
      rounded={"2xl"}
      bg={"p.900"}
      border={"1px solid"}
      borderColor={"p.100"}
      p={2}
      {...restProps}
    >
      <CContainer>
        <Img src={activity.thumbnail} aspectRatio={2.5} rounded={"xl"} />
      </CContainer>

      <CContainer
        flex={1}
        bg={"light"}
        p={6}
        roundedTopRight={"xl"}
        roundedBottomLeft={"xl"}
        roundedBottomRight={"xl"}
        mt={"-20px"}
        pos={"relative"}
        zIndex={2}
      >
        <Box pos={"absolute"} top={"-29.5px"} left={0}>
          <FolderShape h={"30px"} />
        </Box>

        <P fontSize={"sm"} opacity={0.4}>
          {formatDate(activity.createdAt)}
        </P>

        <P fontSize={"lg"} fontWeight={"medium"} mt={2}>
          {activity.title[lang]}
        </P>

        <P opacity={0.6} mt={4}>
          {activity.description[lang]}
        </P>
      </CContainer>

      <HStack justify={"end"} mt={"auto"} pt={2}>
        <Btn
          colorPalette={"p"}
          variant={"ghost"}
          size={"md"}
          pr={3}
          color={"p.300"}
          _hover={{
            bg: "whiteAlpha.200",
          }}
        >
          {l.learn_more}

          <Icon boxSize={5}>
            <IconArrowUpRight stroke={1.5} />
          </Icon>
        </Btn>
      </HStack>
    </CContainer>
  );
};

export const LPHomeActivity = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);
  const activities = useContents((s) => s.activities);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <LPSectionContainer ref={containerRef} py={"80px"} {...restProps}>
      <H2
        className="section_title"
        fontWeight={"bold"}
        color={"p.700"}
        textAlign={"center"}
      >
        {staticContents[24].content[lang]}
      </H2>

      <CContainer mt={"80px"}>
        <SimpleGrid columns={[1, null, 3]} gap={4}>
          {activities.map((activity: any) => {
            return <ActivityItem key={activity.id} activity={activity} />;
          })}
        </SimpleGrid>
      </CContainer>

      <P textAlign={"center"} mt={"80px"} maxW={"500px"} mx={"auto"}>
        {staticContents[25].content[lang]}
      </P>

      <Btn
        w={"fit"}
        pr={3}
        colorPalette={"p"}
        variant={"ghost"}
        mx={"auto"}
        mt={4}
      >
        {l.all_activities}

        <Icon boxSize={5}>
          <IconArrowUpRight stroke={1.5} />
        </Icon>
      </Btn>
    </LPSectionContainer>
  );
};
