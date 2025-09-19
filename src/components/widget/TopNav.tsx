"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { P } from "@/components/ui/p";
import {
  DropdownContent,
  DropdownRoot,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { LP_NAVS } from "@/constants/navs";
import { SVGS_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { pluckString } from "@/utils/string";
import { HStack, Icon } from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";

// const DESKTOP_NAV_BG = "light";

const DesktopTopNav = () => {
  // Contexts
  const { l } = useLang();

  // States
  const [, setScrolled] = useState(false);

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
        gap={8}
        p={4}
        // bg={scrolled ? DESKTOP_NAV_BG : "blackAlpha.500"}
        bg={"blackAlpha.500"}
        backdropFilter={"blur(5px)"}
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
          {LP_NAVS[0].list.map((nav, idx) => {
            return (
              idx !== 0 && (
                <Fragment key={nav.path}>
                  {nav.subMenus && (
                    <DropdownRoot>
                      <DropdownTrigger>
                        <Btn
                          clicky={false}
                          variant={"ghost"}
                          // color={scrolled ? "dark" : "light"}
                          color={"light"}
                          _hover={{
                            bg: "d1",
                          }}
                        >
                          {pluckString(l, nav.labelKey)}

                          <Icon boxSize={5}>
                            <IconChevronDown stroke={1.5} />
                          </Icon>
                        </Btn>
                      </DropdownTrigger>

                      <DropdownContent>
                        <CContainer>
                          <CContainer px={3} py={1}>
                            <P color={"fg.subtle"}>
                              {pluckString(l, nav.labelKey)}
                            </P>
                          </CContainer>

                          <CContainer>
                            {nav.subMenus[0].list.map((subNav) => {
                              return (
                                <Btn
                                  key={subNav.path}
                                  clicky={false}
                                  variant={"ghost"}
                                  px={2}
                                  pr={3}
                                >
                                  <Icon boxSize={5}>
                                    <subNav.icon stroke={1.5} />
                                  </Icon>

                                  <CContainer>
                                    <P fontWeight={"medium"} textAlign={"left"}>
                                      {pluckString(l, subNav.labelKey)}
                                    </P>

                                    <P>
                                      {pluckString(
                                        l,
                                        subNav.descriptionKey || ""
                                      )}
                                    </P>
                                  </CContainer>
                                </Btn>
                              );
                            })}
                          </CContainer>
                        </CContainer>
                      </DropdownContent>
                    </DropdownRoot>
                  )}
                  {!nav.subMenus && (
                    <Btn
                      clicky={false}
                      variant={"ghost"}
                      // color={scrolled ? "dark" : "light"}
                      color={"light"}
                      _hover={{
                        bg: "d1",
                      }}
                    >
                      {pluckString(l, nav.labelKey)}
                    </Btn>
                  )}
                </Fragment>
              )
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
