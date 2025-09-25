"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { EditableContentContainer } from "@/components/widget/EditableContentContainer";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { LP_NAVS } from "@/constants/navs";
import { IMAGES_PATH } from "@/constants/paths";
import useContents from "@/context/useContents";
import useLang from "@/context/useLang";
import useScreen from "@/hooks/useScreen";
import { pluckString } from "@/utils/string";
import { HStack, Icon, Image, SimpleGrid, StackProps } from "@chakra-ui/react";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Contacts = () => {
  // Contexts
  const { lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // States
  const contacts = [
    {
      icon: IconMail,
      textContent: staticContents[58],
    },
    {
      icon: IconPhone,
      textContent: staticContents[59],
    },
    {
      icon: IconMapPin,
      textContent: staticContents[60],
    },
  ];

  return (
    <CContainer gap={2}>
      {contacts.map((contact, idx) => {
        return (
          <HStack key={idx}>
            <contact.icon />
            <EditableContentContainer content={contact.textContent}>
              <P>{contact.textContent?.content[lang]}</P>
            </EditableContentContainer>
          </HStack>
        );
      })}
    </CContainer>
  );
};
const Sosmeds = () => {
  // Contexts
  const staticContents = useContents((s) => s.staticContents);

  // States
  const sosmeds = [
    {
      icon: IconBrandFacebook,
      linkContent: staticContents[61],
    },
    {
      icon: IconBrandInstagram,
      linkContent: staticContents[62],
    },
    {
      icon: IconBrandX,
      linkContent: staticContents[63],
    },
    {
      icon: IconBrandYoutube,
      linkContent: staticContents[64],
    },
  ];

  return (
    <HStack>
      {sosmeds.map((sosmed, idx) => {
        return (
          <EditableContentContainer content={sosmed.linkContent} key={idx}>
            <Link href={sosmed.linkContent?.content} target="_blank">
              <Btn
                iconButton
                colorPalette={"light"}
                variant={"outline"}
                borderColor={"whiteAlpha.400"}
              >
                <Icon boxSize={5}>
                  <sosmed.icon />
                </Icon>
              </Btn>
            </Link>
          </EditableContentContainer>
        );
      })}
    </HStack>
  );
};

const TheFooter = (props: StackProps) => {
  // Contexts
  const { l, lang } = useLang();
  const staticContents = useContents((s) => s.staticContents);

  // States
  const mainNavs = [
    LP_NAVS[0].list[0],
    LP_NAVS[0].list[1],
    ...LP_NAVS[0].list[2].subMenus![0].list,
  ];
  const mapNavs = [...LP_NAVS[0].list[3].subMenus![0].list];
  const appNavs = [...LP_NAVS[0].list[4].subMenus![0].list];

  return (
    <CContainer {...props}>
      <LPSectionContainer pt={"80px"} color={"light"}>
        <SimpleGrid columns={[1, null, 2, 4]} gap={8}>
          <CContainer gap={4}>
            <HStack
              className="content_container_1"
              w={"fit"}
              gap={4}
              bg={"light"}
              p={2}
              rounded={"lg"}
            >
              <Image src={`${IMAGES_PATH}/atrbpn-logo.png`} h={"40px"} />
              <Image src={`${IMAGES_PATH}/gef-logo.png`} h={"40px"} />
              <Image src={`${IMAGES_PATH}/unep-logo.png`} h={"40px"} />
            </HStack>

            <EditableContentContainer content={staticContents[57]}>
              <P fontSize={"lg"} maxW={"400px"}>
                {staticContents[57]?.content[lang]}
              </P>
            </EditableContentContainer>
          </CContainer>

          <CContainer gap={1}>
            {mainNavs.map((nav) => {
              return (
                <NavLink key={nav.path} to={nav.path} w={"fit"}>
                  <Btn
                    key={nav.path}
                    size={"sm"}
                    justifyContent={"start"}
                    variant={"ghost"}
                    colorPalette={"light"}
                    fontWeight={"normal"}
                  >
                    {pluckString(l, nav.labelKey)}
                  </Btn>
                </NavLink>
              );
            })}
          </CContainer>

          <CContainer gap={1}>
            {mapNavs.map((nav) => {
              return (
                <NavLink key={nav.path} to={nav.path} w={"fit"}>
                  <Btn
                    key={nav.path}
                    size={"sm"}
                    justifyContent={"start"}
                    variant={"ghost"}
                    colorPalette={"light"}
                    fontWeight={"normal"}
                  >
                    {pluckString(l, nav.labelKey)}
                  </Btn>
                </NavLink>
              );
            })}
          </CContainer>

          <CContainer gap={1}>
            {appNavs.map((nav) => {
              return (
                <NavLink key={nav.path} to={nav.path} w={"fit"}>
                  <Btn
                    key={nav.path}
                    size={"sm"}
                    justifyContent={"start"}
                    variant={"ghost"}
                    colorPalette={"light"}
                    fontWeight={"normal"}
                  >
                    {pluckString(l, nav.labelKey)}
                  </Btn>
                </NavLink>
              );
            })}
          </CContainer>
        </SimpleGrid>

        <CContainer
          pt={8}
          borderTop={"1px solid"}
          borderColor={"whiteAlpha.200"}
          mt={8}
        >
          <SimpleGrid columns={[1, null, 2]} gap={8}>
            <Contacts />

            <CContainer
              align={["", null, "end"]}
              justify={["", null, "end"]}
              gap={4}
            >
              <Sosmeds />

              <P
                whiteSpace={"nowrap"}
              >{`Copyright © ${new Date().getFullYear()}`}</P>
            </CContainer>
          </SimpleGrid>
        </CContainer>
      </LPSectionContainer>

      <Img
        src={`${IMAGES_PATH}/lp/footer.png`}
        h={"200px"}
        aspectRatio={1}
        objectFit="cover"
        objectPos="top"
      />
    </CContainer>
  );
};
export const LPFooter = (props: StackProps) => {
  const { sh } = useScreen();
  const footerRef = useRef<HTMLDivElement>(null);

  const [isScreenSmH, setIsScreenSmH] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setIsScreenSmH(sh < height);
      }
    });

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [sh]);

  return (
    <>
      {!isScreenSmH && (
        <CContainer
          ref={footerRef}
          aria-hidden="true"
          visibility="hidden"
          pointerEvents="none"
          userSelect="none"
        >
          <TheFooter />
        </CContainer>
      )}

      <TheFooter
        bg="p.900"
        pos={isScreenSmH ? "static" : "fixed"}
        bottom={0}
        left={0}
        {...props}
      />
    </>
  );
};
