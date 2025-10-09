"use client";

import { CContainer } from "@/components/ui/c-container";
import { CloseButton } from "@/components/ui/close-button";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureRoot,
} from "@/components/ui/disclosure";
import SigninForm from "@/components/widget/SigninForm";
import { IMAGES_PATH } from "@/constants/paths";
import useBackOnClose from "@/hooks/useBackOnClose";
import { back } from "@/utils/client";
import { SimpleGrid, StackProps, useDisclosure } from "@chakra-ui/react";

export const SigninDisclosure = (props: any) => {
  // Props
  const { open } = props;

  return (
    <DisclosureRoot open={open} lazyLoad size={"xl"}>
      <DisclosureContent rounded={"2xl"}>
        <DisclosureBody
          rounded={"2xl"}
          p={0}
          pt={[4, null, 0]}
          pos={"relative"}
        >
          <CloseButton
            onClick={back}
            pos={"absolute"}
            top={[0, null, 2]}
            right={2}
            rounded={"full"}
          />

          <SimpleGrid columns={[1, null, 2]}>
            <CContainer
              minH={["", null, "600px"]}
              bgImage={`url(${IMAGES_PATH}/kmis/login.png)`}
              bgSize={"cover"}
            ></CContainer>

            <SigninForm />
          </SimpleGrid>
        </DisclosureBody>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export const SigninDisclosureTrigger = (props: StackProps) => {
  // Props
  const { children, ...restProps } = props;

  // Hooks
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`signin`, open, onOpen, onClose);

  return (
    <>
      <CContainer w={"fit"} onClick={onOpen} {...restProps}>
        {children}
      </CContainer>

      <SigninDisclosure open={open} />
    </>
  );
};
