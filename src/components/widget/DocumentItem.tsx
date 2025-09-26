"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import FolderShape from "@/components/widget/FolderShape";
import { Props__DocumentItem } from "@/constants/props";
import useLang from "@/context/useLang";
import { formatDate } from "@/utils/formatter";
import { Box, BoxProps, HStack, Icon } from "@chakra-ui/react";
import { IconArrowUpRight, IconFileTypePdf } from "@tabler/icons-react";
import { useState } from "react";

const DocPaper = (props: BoxProps) => {
  return (
    <Box
      w={"90%"}
      h={"200px"}
      border={"1px solid"}
      borderColor={"d4"}
      rounded={"2xl"}
      pos={"absolute"}
      left={"50%"}
      bottom={-20}
      transition={"200ms"}
      {...props}
    >
      <Box pos={"relative"}>
        <Icon
          boxSize={8}
          color={"fg.subtle"}
          pos={"absolute"}
          top={4}
          right={4}
        >
          <IconFileTypePdf stroke={1.5} />
        </Icon>
      </Box>
    </Box>
  );
};
export const DocumentItem = (props: Props__DocumentItem) => {
  // Props
  const { document, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  // States
  const [hover, setHover] = useState<boolean>(false);

  return (
    <CContainer rounded={"3xl"} bg={"p.900"} color={"light"} {...restProps}>
      <CContainer
        h={"140px"}
        pos={"relative"}
        p={2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DocPaper
          bg={"bg.emphasized"}
          transform={
            hover
              ? "rotate(15deg) translateX(-50%) translateY(-10px)"
              : "rotate(10deg) translateX(-50%)"
          }
          zIndex={1}
        />

        <DocPaper
          bg={"bg.muted"}
          transform={
            hover
              ? "rotate(10deg)  translateX(-50%) translateY(5px)"
              : "rotate(5deg)  translateX(-50%)"
          }
          zIndex={2}
        />

        <DocPaper
          bg={"light"}
          transform={
            hover ? "translateX(-50%) translateY(-5px)" : "translateX(-50%)"
          }
          zIndex={3}
        />
      </CContainer>

      <CContainer
        flex={1}
        bg={"p.900"}
        roundedTopRight={"2xl"}
        roundedBottomLeft={"2xl"}
        roundedBottomRight={"2xl"}
        mt={"-40px"}
        pos={"relative"}
        zIndex={4}
      >
        <CContainer p={5}>
          <Box pos={"absolute"} top={"-29.5px"} left={0}>
            <FolderShape h={"30px"} color={"p.900"} />
          </Box>

          <P fontSize={"xl"} fontWeight={"medium"} lineClamp={1} mt={2}>
            {document.title[lang]}
          </P>

          <P lineClamp={2} opacity={0.4} mt={4} mb={8}>
            {document.description[lang]}
          </P>
        </CContainer>

        <HStack justify={"space-between"} p={3} mt={"auto"}>
          <P opacity={0.4} whiteSpace={"nowrap"} ml={2}>
            {formatDate(document.createdAt, {
              variant: "numeric",
            })}
          </P>

          <NavLink w={"fit"} to={`/document/${document.id}`}>
            <Btn
              colorPalette={"p"}
              color={"p.300"}
              variant={"ghost"}
              size={"md"}
              pr={3}
              mt={"auto"}
              _hover={{
                bg: "blackAlpha.300",
              }}
            >
              <P lineClamp={1}>{l.learn_more}</P>

              <Icon boxSize={5}>
                <IconArrowUpRight stroke={1.5} />
              </Icon>
            </Btn>
          </NavLink>
        </HStack>
      </CContainer>
    </CContainer>
  );
};
