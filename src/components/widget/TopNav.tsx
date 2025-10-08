"use client";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { LangMenu } from "@/components/ui/lang-menu";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { BottomIndicator, DotIndicator } from "@/components/widget/Indicator";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { PartnersLogo } from "@/components/widget/PartnersLogo";
import { LP_NAVS } from "@/constants/navs";
import { MAIN_BUTTON_SIZE } from "@/constants/sizes";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll";
import useScreen from "@/hooks/useScreen";
import { back } from "@/utils/client";
import { pluckString } from "@/utils/string";
import { HStack, Icon, useDisclosure } from "@chakra-ui/react";
import { IconChevronDown, IconMenu, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const MobileTopNav = () => {
  // Contexts
  const { l } = useLang();

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose("mobile-nav", open, onOpen, onClose);
  const debouncedShowContents = useDebouncedCallback(() => {
    setShowContents(true);
  }, 300);
  useDisableBodyScroll(open);

  // States
  const [showContents, setShowContents] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      debouncedShowContents();
    } else {
      setShowContents(false);
    }
  }, [open]);

  return (
    <CContainer
      h={"fit"}
      p={open ? 0 : 2}
      pos={"fixed"}
      top={0}
      left={0}
      overflowY={"auto"}
      transition={"300ms"}
      zIndex={10}
    >
      <CContainer
        bg={open ? "blackAlpha.800" : "blackAlpha.700"}
        backdropFilter={open ? "blur(10px)" : "blur(5px)"}
        h={open ? "100dvh" : "64px"}
        rounded={open ? "" : "lg"}
        overflowY={open ? "auto" : "clip"}
        transition={"300ms"}
      >
        <HStack
          justify={"space-between"}
          p={2}
          rounded={"lg"}
          pos={"sticky"}
          top={0}
          zIndex={10}
        >
          <NavLink w={"fit"} to="/">
            <PartnersLogo ml={2} />
          </NavLink>

          {!open && (
            <Btn
              iconButton
              variant={"ghost"}
              color={"light"}
              onClick={onOpen}
              _hover={{
                bg: "d1",
              }}
            >
              <Icon>
                <IconMenu />
              </Icon>
            </Btn>
          )}

          {open && (
            <Btn
              iconButton
              variant={"ghost"}
              color={"light"}
              onClick={back}
              _hover={{
                bg: "d1",
              }}
            >
              <Icon>
                <IconX />
              </Icon>
            </Btn>
          )}
        </HStack>

        <CContainer
          gap={1}
          opacity={showContents ? 1 : 0}
          visibility={showContents ? "visible" : "hidden"}
          pointerEvents={showContents ? "auto" : "none"}
          p={showContents ? 2 : 0}
          overflow={"clip"}
          flex={1}
          transition={"500ms"}
        >
          {LP_NAVS[0].list.map((nav) => {
            return (
              <Fragment key={nav.path}>
                {nav.subMenus && (
                  <AccordionRoot multiple>
                    <AccordionItem
                      value={nav.labelKey}
                      color={"light"}
                      border={"none"}
                      cursor={"pointer"}
                      rounded={"lg"}
                      _open={{
                        bg: "blackAlpha.300",
                        border: "1px solid",
                        borderColor: "d1",
                      }}
                    >
                      <Btn
                        as={AccordionItemTrigger}
                        clicky={false}
                        justifyContent={"start"}
                        variant={"ghost"}
                        color={"light"}
                        _open={{
                          bg: "transparent",
                        }}
                        _hover={{
                          bg: "blackAlpha.500",
                        }}
                      >
                        <P fontSize={"lg"} textAlign={"left"}>
                          {pluckString(l, nav.labelKey)}
                        </P>
                      </Btn>

                      <AccordionItemContent p={1}>
                        {nav.subMenus[0].list.map((subNav) => {
                          return (
                            <NavLink
                              key={subNav.path}
                              to={subNav.path}
                              external={subNav.external}
                            >
                              <Btn
                                clicky={false}
                                justifyContent={"start"}
                                variant={"ghost"}
                                color={"light"}
                                _hover={{
                                  bg: "blackAlpha.500",
                                }}
                              >
                                <Icon boxSize={5}>
                                  <subNav.icon stroke={1.5} />
                                </Icon>

                                <P fontSize={"lg"}>
                                  {pluckString(l, subNav.labelKey)}
                                </P>
                              </Btn>
                            </NavLink>
                          );
                        })}
                      </AccordionItemContent>
                    </AccordionItem>
                  </AccordionRoot>
                )}

                {!nav.subMenus && (
                  <NavLink to={nav.path} external={nav.external}>
                    <Btn
                      clicky={false}
                      justifyContent={"start"}
                      variant={"ghost"}
                      px={4}
                      color={"light"}
                      _hover={{
                        bg: "blackAlpha.500",
                      }}
                    >
                      <P fontSize={"lg"} textAlign={"left"}>
                        {pluckString(l, nav.labelKey)}
                      </P>
                    </Btn>
                  </NavLink>
                )}
              </Fragment>
            );
          })}

          <CContainer mt={"auto"} p={4}>
            <HStack>
              <LangMenu
                size={"xl"}
                colorPalette={"light"}
                variant={"outline"}
                borderColor={"whiteAlpha.400"}
                px={4}
                pr={3}
                menuContentProps={{
                  mb: 4,
                }}
              />

              <Btn flex={1} colorPalette={"p"}>
                Sign up/Sign in
              </Btn>
            </HStack>
          </CContainer>
        </CContainer>
      </CContainer>
    </CContainer>
  );
};
const DesktopTopNav = () => {
  // Contexts
  const { l } = useLang();

  // States
  const pathname = usePathname();
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
    <LPSectionContainer>
      <HStack
        w={"fit"}
        gap={8}
        p={2}
        mx={"auto"}
        bg={"blackAlpha.700"}
        backdropFilter={"blur(5px)"}
        rounded="xl"
        transition="200ms"
      >
        <NavLink to="/" w={"fit"}>
          <PartnersLogo ml={2} />
        </NavLink>

        <HStack>
          {LP_NAVS[0].list.map((nav, idx) => {
            const isMainNavsActive = pathname.includes(nav.path);

            return (
              idx !== 0 && (
                <Fragment key={nav.path}>
                  {nav.subMenus && (
                    <MenuRoot positioning={{ placement: "bottom" }}>
                      <MenuTrigger asChild>
                        <Btn
                          clicky={false}
                          variant={"ghost"}
                          color={"light"}
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

                          {isMainNavsActive && (
                            <BottomIndicator
                              bg={"p.500"}
                              w={"20px"}
                              bottom={"-2px"}
                            />
                          )}
                        </Btn>
                      </MenuTrigger>

                      <MenuContent w={"max"} mt={4} zIndex={99}>
                        <CContainer px={3} py={1}>
                          <P
                            color={"fg.muted"}
                            fontWeight={"medium"}
                            opacity={0.8}
                          >
                            {pluckString(l, nav.labelKey)}
                          </P>
                        </CContainer>

                        <CContainer>
                          {nav.subMenus[0].list.map((subNav) => {
                            const isSubNavsActive = pathname === subNav.path;

                            return (
                              <NavLink
                                key={subNav.path}
                                to={subNav.path}
                                external={subNav.external}
                              >
                                <MenuItem value={subNav.path} pr={5}>
                                  <Icon boxSize={5}>
                                    <subNav.icon stroke={1.5} />
                                  </Icon>

                                  <P fontWeight={"medium"}>
                                    {pluckString(l, subNav.labelKey)}
                                  </P>

                                  {isSubNavsActive && (
                                    <DotIndicator ml={"auto"} mr={-1} />
                                  )}
                                </MenuItem>
                              </NavLink>
                            );
                          })}
                        </CContainer>
                      </MenuContent>
                    </MenuRoot>
                  )}

                  {!nav.subMenus && (
                    <NavLink to={nav.path} external={nav.external}>
                      <Btn
                        clicky={false}
                        variant={"ghost"}
                        color={"light"}
                        _hover={{
                          bg: "d1",
                        }}
                      >
                        {pluckString(l, nav.labelKey)}

                        {isMainNavsActive && (
                          <BottomIndicator
                            bg={"p.500"}
                            w={"20px"}
                            bottom={"-2px"}
                          />
                        )}
                      </Btn>
                    </NavLink>
                  )}
                </Fragment>
              )
            );
          })}
        </HStack>

        <HStack>
          <LangMenu
            color={"light"}
            size={MAIN_BUTTON_SIZE as any}
            _open={{
              bg: "d1",
            }}
            _hover={{
              bg: "d1",
            }}
            menuContentProps={{
              mt: 4,
            }}
          />

          <Btn colorPalette={"p"} px={6} color={"p.50"}>
            Sign in/Sign up
          </Btn>
        </HStack>
      </HStack>
    </LPSectionContainer>
  );
};

export const TopNav = () => {
  // Hooks
  const { sw } = useScreen();
  const ciss = sw < 1200;

  return (
    <CContainer w="full" p={4} pos={"fixed"} left={0} top={0} zIndex={10}>
      {ciss && <MobileTopNav />}

      {!ciss && <DesktopTopNav />}
    </CContainer>
  );
};
