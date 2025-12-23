"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { ClampText } from "@/components/widget/ClampText";
import { Interface__CMSNews } from "@/constants/interfaces";
import useLang from "@/context/useLang";
import { formatDate } from "@/utils/formatter";
import { Badge, Center, HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconArrowUpRight } from "@tabler/icons-react";

interface Props extends StackProps {
  news: Interface__CMSNews;
  thumbnailFill?: boolean;
}

export const NewsItem = (props: Props) => {
  // Props
  const { news, thumbnailFill = false, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  return (
    <CContainer bg={"light"} rounded="2xl" {...restProps}>
      <Center aspectRatio={1} w="full">
        <Center
          aspectRatio={1}
          w="full"
          rounded={"xl"}
          overflow={"clip"}
          pos={"relative"}
        >
          <HStack
            w={"full"}
            p={4}
            color={"light"}
            align={"start"}
            justify={"space-between"}
            zIndex={2}
            pos={"absolute"}
            top={0}
            left={0}
          >
            <P>{formatDate(news.createdAt, { variant: "year" })}</P>

            <CContainer
              aspectRatio={1}
              w={"70px"}
              align={"center"}
              justify={"center"}
              bg={"p.100"}
              color={"p.700"}
              rounded={"full"}
            >
              <P fontSize={"xl"} fontWeight={"semibold"} lineHeight={1}>
                {formatDate(news.createdAt, { variant: "day" })}
              </P>
              <P>{formatDate(news.createdAt, { variant: "shortMonth" })}</P>
            </CContainer>
          </HStack>

          <HStack wrap={"wrap"} zIndex={2} pos={"absolute"} bottom={4} left={4}>
            <Badge key={news.newsCategory.id} w={"fit"}>
              {news.newsCategory.name[lang]}
            </Badge>
          </HStack>

          <Img
            src={news.thumbnail?.[0]?.fileUrl}
            aspectRatio={1}
            w={thumbnailFill ? "100vw" : "full"}
            h={thumbnailFill ? "700px" : "full"}
            rounded={"xl"}
            pos={"absolute"}
            mt={thumbnailFill ? ["160px", null, "150px"] : ""}
            transition={"200ms"}
            _hover={{
              transform: "scale(1.1)",
            }}
          />
        </Center>
      </Center>

      <CContainer h={["160px", null, "150px"]}>
        <CContainer gap={4} px={4} pt={3}>
          <ClampText fontWeight={"medium"} lineClamp={3}>
            {news.title[lang]}
          </ClampText>

          {/* <P color={"fg.subtle"} lineClamp={3}>
            {news.description[lang]}
          </P> */}
        </CContainer>

        <CContainer p={2} mt={"auto"}>
          <NavLink
            to={`/about-us/news/${news.slug[lang]}`}
            w={"fit"}
            ml={"auto"}
          >
            <Btn colorPalette={"p"} variant={"ghost"} mt={"auto"}>
              {l.learn_more}

              <Icon boxSize={5}>
                <IconArrowUpRight stroke={1.5} />
              </Icon>
            </Btn>
          </NavLink>
        </CContainer>
      </CContainer>
    </CContainer>
  );
};
