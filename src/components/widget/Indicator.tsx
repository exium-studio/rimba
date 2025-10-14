"use client";

import { useThemeConfig } from "@/context/useThemeConfig";
import {
  Box,
  BoxProps,
  Circle,
  Icon,
  IconProps,
  StackProps,
} from "@chakra-ui/react";
import { IconCheck, IconCircleFilled } from "@tabler/icons-react";

export const LeftIndicator = (props: BoxProps) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Box
      w={"3px"}
      h={"12px"}
      bg={themeConfig.primaryColor}
      rounded={"full"}
      pos={"absolute"}
      top={"50%"}
      left={"-1.5px"}
      transform={"translateY(-50%)"}
      {...props}
    />
  );
};

export const BottomIndicator = (props: BoxProps) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Box
      w={"12px"}
      h={"3px"}
      bg={themeConfig.primaryColor}
      rounded={"full"}
      pos={"absolute"}
      bottom={-2}
      left={"50%"}
      transform={"translateX(-50%)"}
      {...props}
    />
  );
};

export const DotIndicator = (props: IconProps) => {
  // Props
  const { children, ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Icon color={themeConfig.primaryColor} boxSize={2} {...restProps}>
      {children || <IconCircleFilled />}
    </Icon>
  );
};

export const CompleteIndicator = (props: StackProps) => {
  return (
    <Circle
      bg={"fg.success"}
      pos={"absolute"}
      top={"-4px"}
      left={"-4px"}
      {...props}
    >
      <Icon color={"light"} boxSize={3.5}>
        <IconCheck />
      </Icon>
    </Circle>
  );
};
