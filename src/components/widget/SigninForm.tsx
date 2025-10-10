"use client";

import { Field } from "@/components/ui/field";
import BrandWatermark from "@/components/widget/BrandWatermark";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useRequest from "@/hooks/useRequest";
import { back, setStorage } from "@/utils/client";
import { HStack, Icon, InputGroup, StackProps } from "@chakra-ui/react";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { Btn } from "../ui/btn";
import { CContainer } from "../ui/c-container";
import { Divider } from "../ui/divider";
import { P } from "../ui/p";
import { PasswordInput } from "../ui/password-input";
import { StringInput } from "../ui/string-input";
import ResetPasswordDisclosure from "./ResetPasswordDisclosure";

interface Props extends StackProps {}

const SignupForm = (props: any) => {
  // Props
  const { setMode } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req, loading } = useRequest({
    id: "signup",
  });

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(l.msg_required_form),
      email: yup.string().required(l.msg_required_form),
      password: yup.string().required(l.msg_required_form),
      passwordConfirmation: yup
        .string()
        .required(l.msg_required_form)
        .oneOf([yup.ref("password")], l.msg_password_confirmation_not_match),
    }),
    onSubmit: (values) => {
      const payload = values;
      const url = `/api/signup`;
      const config = {
        url,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            setMode("signin");
          },
        },
      });
    },
  });

  return (
    <>
      <CContainer gap={2}>
        <P fontWeight={"bold"} fontSize={"xl"}>
          Sign Up
        </P>
      </CContainer>

      <CContainer gap={4}>
        <HStack>
          <P>{l.msg_already_have_account}</P>

          <P
            color={"p.500"}
            cursor={"pointer"}
            onClick={() => {
              setMode("signin");
            }}
          >
            Sign in
          </P>
        </HStack>

        <form id="signin_form" onSubmit={formik.handleSubmit}>
          <Field
            label={l.name}
            invalid={!!formik.errors.name}
            errorText={formik.errors.name as string}
            mb={4}
          >
            <StringInput
              onChange={(input) => {
                formik.setFieldValue("name", input);
              }}
              inputValue={formik.values.name}
              placeholder="Email/Username"
            />
          </Field>

          <Field
            label={"Email"}
            invalid={!!formik.errors.email}
            errorText={formik.errors.email as string}
            mb={4}
          >
            <StringInput
              onChange={(input) => {
                formik.setFieldValue("email", input);
              }}
              inputValue={formik.values.email}
              placeholder="Email/Username"
            />
          </Field>

          <Field
            label={"Password"}
            invalid={!!formik.errors.password}
            errorText={formik.errors.password as string}
            mb={4}
          >
            <PasswordInput
              onChange={(input) => {
                formik.setFieldValue("password", input);
              }}
              inputValue={formik.values.password}
              placeholder="Password"
            />
          </Field>

          <Field
            label={l.password_confirmation}
            invalid={!!formik.errors.passwordConfirmation}
            errorText={formik.errors.passwordConfirmation as string}
          >
            <PasswordInput
              onChange={(input) => {
                formik.setFieldValue("passwordConfirmation", input);
              }}
              inputValue={formik.values.passwordConfirmation}
              placeholder="Password"
            />
          </Field>

          <Btn
            type="submit"
            form="signin_form"
            w={"full"}
            mt={6}
            size={"lg"}
            loading={loading}
            colorPalette={"p"}
          >
            Sign up
          </Btn>
        </form>
      </CContainer>
    </>
  );
};
const SigninForm = (props: Props) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();
  const { themeConfig } = useThemeConfig();
  const setAuthToken = useAuthMiddleware((s) => s.setAuthToken);
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);

  // Hooks
  const { req, loading } = useRequest({
    id: "signin",
    loadingMessage: l.loading_signin,
    successMessage: l.success_signin,
    errorMessage: {
      400: {
        INVALID_CREDENTIALS: {
          ...l.error_signin_wrong_credentials,
        },
      },
    },
  });

  // States
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      identifier: yup.string().required(l.msg_required_form),
      password: yup.string().required(l.msg_required_form),
    }),
    onSubmit: (values) => {
      const payload = {
        email: values.identifier,
        password: values.password,
      };
      const config = {
        method: "post",
        url: "/api/signin",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: (r: any) => {
            setStorage("__auth_token", r.data.data?.token);
            setStorage("__user_data", JSON.stringify(r.data.data?.user));
            setAuthToken(r.data.data?.token);
            setPermissions(r.data.data?.permissions);
            back();
          },
        },
      });
    },
  });

  return (
    <CContainer
      m={"auto"}
      w={"full"}
      maxW={"380px"}
      minH={"680px"}
      justify={"space-between"}
      px={6}
      py={12}
      gap={8}
      rounded={themeConfig.radii.container}
      {...restProps}
    >
      <BrandWatermark visibility={"hidden"} />

      {mode === "signin" && (
        <CContainer gap={4}>
          <CContainer gap={2}>
            <P fontWeight={"bold"} fontSize={"xl"}>
              RIMBA KMIS
            </P>

            <P color={"fg.subtle"}>{l.msg_signin}</P>
          </CContainer>

          <CContainer gap={4}>
            <HStack>
              <P>{l.msg_dont_have_an_account}</P>

              <P
                color={"p.500"}
                cursor={"pointer"}
                onClick={() => {
                  setMode("signup");
                }}
              >
                Sign up
              </P>
            </HStack>

            <form id="signin_form" onSubmit={formik.handleSubmit}>
              <Field
                invalid={!!formik.errors.identifier}
                errorText={formik.errors.identifier as string}
                mb={4}
              >
                <InputGroup
                  w={"full"}
                  startElement={
                    <Icon boxSize={5}>
                      <IconUser stroke={1.5} />
                    </Icon>
                  }
                >
                  <StringInput
                    name="identifier"
                    onChange={(input) => {
                      formik.setFieldValue("identifier", input);
                    }}
                    inputValue={formik.values.identifier}
                    placeholder="Email/Username"
                    pl={"40px !important"}
                  />
                </InputGroup>
              </Field>

              <Field
                invalid={!!formik.errors.password}
                errorText={formik.errors.password as string}
              >
                <InputGroup
                  w={"full"}
                  startElement={
                    <Icon boxSize={5}>
                      <IconLock stroke={1.5} />
                    </Icon>
                  }
                >
                  <PasswordInput
                    name="password"
                    onChange={(input) => {
                      formik.setFieldValue("password", input);
                    }}
                    inputValue={formik.values.password}
                    placeholder="Password"
                    pl={"40px !important"}
                  />
                </InputGroup>
              </Field>

              <Btn
                type="submit"
                form="signin_form"
                w={"full"}
                mt={6}
                size={"lg"}
                loading={loading}
                colorPalette={themeConfig.colorPalette}
              >
                Login
              </Btn>

              <HStack mt={4}>
                <Divider h={"1px"} w={"full"} />

                <ResetPasswordDisclosure>
                  <Btn variant={"ghost"} color={themeConfig.primaryColor}>
                    Reset Password
                  </Btn>
                </ResetPasswordDisclosure>

                <Divider h={"1px"} w={"full"} />
              </HStack>
            </form>
          </CContainer>
        </CContainer>
      )}

      {mode === "signup" && <SignupForm setMode={setMode} />}

      <BrandWatermark />
    </CContainer>
  );
};

export default SigninForm;
