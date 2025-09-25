"use client";

import { Icon, IconProps } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import { IconChevronDown } from "@tabler/icons-react";
import gsap from "gsap";

export const ScrollDownIndicator = (props: IconProps) => {
  // Props
  const { ...restProps } = props;

  // Animation
  useGSAP(() => {
    gsap.to(".scroll_down_indicator", {
      y: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, {});

  return (
    <Icon
      className="scroll_down_indicator"
      boxSize={5}
      color={"light"}
      opacity={0.8}
      mb={4}
      mx={"auto"}
      zIndex={6}
      {...restProps}
    >
      <IconChevronDown />
    </Icon>
  );
};
