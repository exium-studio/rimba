"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { P } from "@/components/ui/p";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { LP_NAVS } from "@/constants/navs";
import { SVGS_PATH } from "@/constants/paths";
import useLang from "@/context/useLang";
import { useIsSmScreenWidth } from "@/hooks/useIsSmScreenWidth";
import { pluckString } from "@/utils/string";
import { HStack, Icon, SimpleGrid } from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";

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
        gap={8}
        p={4}
        bg={scrolled ? DESKTOP_NAV_BG : "blackAlpha.500"}
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
                    <MenuRoot>
                      <MenuTrigger asChild>
                        <Btn
                          clicky={false}
                          variant={"ghost"}
                          color={scrolled ? "dark" : "light"}
                          _open={{
                            bg: "d1",
                          }}
                          _hover={{
                            bg: "d1",
                          }}
                        >
                          {pluckString(l, nav.labelKey)}

                          <Icon boxSize={5}>
                            <IconChevronDown stroke={1.5} />
                          </Icon>
                        </Btn>
                      </MenuTrigger>

                      <MenuContent w={"max"} mt={5}>
                        <CContainer px={3} py={2}>
                          <P color={"fg.subtle"} fontWeight={"medium"}>
                            {pluckString(l, nav.labelKey)}
                          </P>
                        </CContainer>

                        <SimpleGrid columns={1}>
                          {nav.subMenus[0].list.map((subNav) => {
                            return (
                              <MenuItem key={subNav.path} value={subNav.path}>
                                <CContainer>
                                  <HStack align={"start"}>
                                    <Icon boxSize={5}>
                                      <subNav.icon stroke={1.5} />
                                    </Icon>

                                    <CContainer>
                                      <P fontWeight={"medium"}>
                                        {pluckString(l, subNav.labelKey)}
                                      </P>
                                      <P>
                                        {pluckString(
                                          l,
                                          subNav.descriptionKey || ""
                                        )}
                                      </P>
                                    </CContainer>
                                  </HStack>
                                </CContainer>
                              </MenuItem>
                            );
                          })}
                        </SimpleGrid>
                      </MenuContent>
                    </MenuRoot>
                  )}
                  {!nav.subMenus && (
                    <Btn
                      clicky={false}
                      variant={"ghost"}
                      color={scrolled ? "dark" : "light"}
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
