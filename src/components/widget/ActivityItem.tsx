"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { Tooltip } from "@/components/ui/tooltip";
import { Interface__CMSActivity } from "@/constants/interfaces";
import useLang from "@/context/useLang";
import { formatDate } from "@/utils/formatter";
import { Badge, Center, HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconArrowUpRight, IconSeedling } from "@tabler/icons-react";

interface Props extends StackProps {
  activity: Interface__CMSActivity;
  thumbnailFill?: boolean;
}

export const ActivityItem = (props: Props) => {
  // Props
  const { activity, thumbnailFill = false, ...restProps } = props;

  // Contexts
  const { l, lang } = useLang();

  return (
    <CContainer bg={"light"} rounded="2xl" {...restProps}>
      <Center aspectRatio={1} w="full" p={2}>
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
            justify={"space-between"}
            zIndex={2}
            pos={"absolute"}
            top={0}
            left={0}
          >
            <Tooltip content={l.estimated_planned_date}>
              <P>{formatDate(activity.plannedDate)}</P>
            </Tooltip>

            <Icon>
              <IconSeedling stroke={1.5} />
            </Icon>
          </HStack>

          <HStack wrap={"wrap"} zIndex={2} pos={"absolute"} bottom={4} left={4}>
            {activity.eventCategory?.map((category) => {
              return (
                <Badge key={category.id} w={"fit"}>
                  {category.name[lang]}
                </Badge>
              );
            })}
          </HStack>

          <Img
            src={activity.thumbnail?.[0]?.fileUrl}
            aspectRatio={1}
            w={thumbnailFill ? "100vw" : "full"}
            h={thumbnailFill ? "700px" : "full"}
            rounded={"xl"}
            pos={"absolute"}
            mt={thumbnailFill ? ["196px", null, "188px"] : ""}
            transition={"200ms"}
            _hover={{
              transform: "scale(1.1)",
            }}
          />
        </Center>
      </Center>

      <CContainer h={["196px", null, "188px"]}>
        <CContainer gap={4} px={4} pt={3}>
          <P fontSize={"lg"} fontWeight={"semibold"} lineClamp={1}>
            {activity.title[lang]}
          </P>

          <P color={"fg.subtle"} lineClamp={3}>
            {activity.description[lang]}
          </P>
        </CContainer>

        <CContainer p={2} mt={"auto"}>
          <NavLink to={`/activities/${activity.id}`} w={"fit"} ml={"auto"}>
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
