"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Divider } from "@/components/ui/divider";
import { Img } from "@/components/ui/img";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { DotIndicator } from "@/components/widget/Indicator";
import { SVGS_PATH } from "@/constants/paths";
import useConfirmationDisclosure from "@/context/disclosure/useConfirmationDisclosure";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useRequest from "@/hooks/useRequest";
import { getUserData } from "@/utils/auth";
import { back, removeStorage } from "@/utils/client";
import { imgUrl } from "@/utils/url";
import { Icon, StackProps } from "@chakra-ui/react";
import { IconBook2, IconLogout, IconUser } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";

export const MiniProfile = (props: StackProps) => {
  // Contexts
  const { l } = useLang();
  const { themeConfig } = useThemeConfig();
  const removeAuth = useAuthMiddleware((s) => s.removeAuth);

  // Hooks
  const { req } = useRequest({
    id: "sign_out",
    loadingMessage: { ...l.loading_signout },
    successMessage: { ...l.success_signout },
  });
  const router = useRouter();
  router.prefetch("/");
  const pathname = usePathname();

  // States
  const user = getUserData();
  const confirmationOnOpen = useConfirmationDisclosure(
    (s) => s.confirmationOnOpen
  );
  const setConfirmationData = useConfirmationDisclosure(
    (s) => s.setConfirmationData
  );

  // Utils
  function onSignout() {
    back();

    const url = `/api/signout`;
    const config = {
      url,
      method: "GET",
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          removeStorage("__auth_token");
          removeStorage("__user_data");
          removeAuth();
          router.push("/");
        },
        onError: () => {
          removeAuth();
          router.push("/related-apps/kmis");
        },
      },
    });
  }

  return (
    <CContainer
      rounded={themeConfig.radii.container}
      overflow={"clip"}
      bg={"body"}
      color={"ibody"}
      {...props}
    >
      <CContainer>
        <Img
          src={imgUrl(user?.photoProfile?.[0]?.filePath)}
          alt="avatar"
          aspectRatio={1}
          fallbackSrc={`${SVGS_PATH}/no-avatar.svg`}
        />

        <CContainer
          bg={"body"}
          p={4}
          // borderTop={"1px solid"}
          borderColor={"border.muted"}
        >
          <P fontWeight={"semibold"}>{user?.name || "Signed out"}</P>
          <P color={"fg.subtle"}>{user?.email || "-"}</P>
        </CContainer>
      </CContainer>

      <Divider />

      <CContainer gap={1} p={"6px"}>
        <NavLink to={`/related-apps/kmis/my-course`}>
          <Btn
            clicky={false}
            size={"md"}
            px={2}
            variant={"ghost"}
            justifyContent={"start"}
            pos={"relative"}
          >
            <Icon boxSize={5}>
              <IconBook2 stroke={1.5} />
            </Icon>

            {l.my_course}

            {pathname.includes("/related-apps/kmis/my-course") && (
              <DotIndicator ml={"auto"} mr={1} />
            )}
          </Btn>
        </NavLink>

        <NavLink to={`/related-apps/kmis/profile`}>
          <Btn
            clicky={false}
            size={"md"}
            px={2}
            variant={"ghost"}
            justifyContent={"start"}
            pos={"relative"}
          >
            <Icon boxSize={5}>
              <IconUser stroke={1.5} />
            </Icon>

            {l.my_profile}

            {pathname.includes("/profile") && (
              <DotIndicator ml={"auto"} mr={1} />
            )}
          </Btn>
        </NavLink>

        <Btn
          clicky={false}
          size={"md"}
          px={2}
          variant={"ghost"}
          color={"fg.error"}
          justifyContent={"start"}
          onClick={() => {
            setConfirmationData({
              title: "Sign out?",
              description: l.msg_signout,
              confirmLabel: "Sign out",
              confirmButtonProps: {
                color: "fg.error",
                colorPalette: "gray",
                variant: "outline",
              },
              onConfirm: onSignout,
            });
            confirmationOnOpen();
          }}
        >
          <Icon boxSize={5}>
            <IconLogout stroke={1.5} />
          </Icon>
          Sign Out
        </Btn>
      </CContainer>
    </CContainer>
  );
};
