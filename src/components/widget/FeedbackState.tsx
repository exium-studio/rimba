"use client";

import { P } from "@/components/ui/p";
import {
  Icon,
  IconProps,
  StackProps,
  TextProps,
  VStack,
} from "@chakra-ui/react";
import { IconDatabaseOff } from "@tabler/icons-react";

interface Props extends StackProps {
  icon?: any;
  title?: any;
  description?: any;
  iconProps?: IconProps;
  titleProps?: TextProps;
  descriptionProps?: TextProps;
}

const FeedbackState = (props: Props) => {
  // Props
  const {
    icon,
    title,
    description,
    children,
    iconProps,
    titleProps,
    descriptionProps,
    ...restProps
  } = props;

  // States
  const titleString = typeof title === "string";
  const descriptionString = typeof description === "string";

  return (
    <VStack gap={1} p={4} maxW={"300px"} {...restProps}>
      <Icon mb={2} color={"fg.subtle"} boxSize={9} {...iconProps}>
        {icon || <IconDatabaseOff stroke={1.8} />}
      </Icon>

      {titleString && (
        <P textAlign={"center"} fontWeight={"semibold"} {...titleProps}>
          {title}
        </P>
      )}

      {!titleString && title}

      {descriptionString && (
        <P textAlign={"center"} color={"fg.subtle"} {...descriptionProps}>
          {description}
        </P>
      )}

      {!descriptionString && description}

      {children}
    </VStack>
  );
};

export default FeedbackState;
