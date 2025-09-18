"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { LP_NAVS } from "@/constants/navs";
import { SVGS_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { pluckString } from "@/utils/string";
import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DESKTOP_NAV_BG = "light";

const DesktopTopNav = () => {
  // Contexts
  const { l } = useLang();

  // States
  const [scrolled, setScrolled] = useState(false);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LPSectionContainer w={"fit"}>
      <HStack
        w={"full"}
        gap={4}
        p={4}
        bg={scrolled ? DESKTOP_NAV_BG : "transparent"}
        rounded="md"
        transition="200ms"
      >
        <Img
          src={`${SVGS_PATH}/rimba_letter_art_color.svg`}
          alt="logo"
          h="20px"
          w="fit"
          aspectRatio={3.5 / 1}
          objectFit="contain"
        />

        <HStack>
          {LP_NAVS[0].list.map((nav) => {
            return (
              <Btn
                key={nav.path}
                clicky={false}
                variant={"ghost"}
                color={scrolled ? "dark" : "light"}
                _hover={{
                  bg: "d1",
                }}
              >
                {pluckString(l, nav.labelKey)}
              </Btn>
            );
          })}
        </HStack>

        <Btn colorPalette={"p"} px={6} color={"p.50"}>
          Sign in/Sign up
        </Btn>
      </HStack>
    </LPSectionContainer>
  );
};

export const TopNav = () => {
  // Hooks
  const iss = useIsSmScreenWidth();

  return (
    <CContainer w="full" p={4} pos={"fixed"} left={0} top={0} zIndex={10}>
      {!iss && <DesktopTopNav />}
    </CContainer>
  );
};
