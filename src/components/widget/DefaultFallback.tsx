"use client";

import { PartnersLogo } from "@/components/widget/PartnersLogo";
import { useThemeConfig } from "@/context/useThemeConfig";
import { Center } from "@chakra-ui/react";

export const DefaultFallback = () => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Center bg={"white"} w={"100vw"} minH={"100dvh"} p={10}>
      {/* <Img
        alt={`${APP.name} Logo`}
        src={`${SVGS_PATH}/logo_gray.svg`}
        width={"48px"}
        height={"48px"}
        imageProps={{
          priority: true,
        }}
      /> */}
      <PartnersLogo color={themeConfig.primaryColor} />
    </Center>
  );
};
