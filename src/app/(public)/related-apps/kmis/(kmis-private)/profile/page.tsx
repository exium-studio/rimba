"use client";

import { LPFooter } from "@/components/lpSections/LPFooter";
import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { Field } from "@/components/ui/field";
import { P } from "@/components/ui/p";
import PhoneNumberInput from "@/components/ui/phone-number-input";
import { SelectInput } from "@/components/ui/select-input";
import { StringInput } from "@/components/ui/string-input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/widget/Breadcrumbs";
import FeedbackNoData from "@/components/widget/FeedbackNoData";
import FeedbackRetry from "@/components/widget/FeedbackRetry";
import { LPSectionContainer } from "@/components/widget/LPSectionContainer";
import { MiniProfile } from "@/components/widget/MiniProfile";
import { TopNav } from "@/components/widget/TopNav";
import {
  Interface__SelectOption,
  Interface__User,
} from "@/constants/interfaces";
import { OPTIONS_GENDER } from "@/constants/selectOptions";
import useLang from "@/context/useLang";
import useDataState from "@/hooks/useDataState";
import useRequest from "@/hooks/useRequest";
import { fileValidation } from "@/utils/validationSchema";
import {
  FieldRoot,
  HStack,
  SimpleGrid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const ProfileForm = (props: any) => {
  // Props
  const { user, ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req } = useRequest({
    id: "update-profile",
    successMessage: {
      title: `Edit ${l.profile} ${l.successful}`,
      description: l.success_200_default.description,
    },
  });

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      email: "",
      birthDate: null as unknown as any[],
      gender: null as unknown as Interface__SelectOption[],
      phoneNumber: "",
      profession: "",
      address: "",
      files: [],
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(l.msg_required_form),
      email: yup.string().required(l.msg_required_form),
      birthDate: yup.array().nullable(),
      gender: yup.array().nullable(),
      phoneNumber: yup.string(),
      profession: yup.string(),
      address: yup.string(),
      files: fileValidation({
        maxSizeMB: 10,
        allowedExtensions: [".png", ".jpg", ".jpeg"],
      }),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        birthDate: values.birthDate?.[0],
        gender: values.gender?.[0]?.id,
        phoneNumber: values.phoneNumber,
        profession: values.profession,
        address: values.address,
        files: values.files,
      };
      console.debug(payload);
      const config = {
        url: `/api/profile/update-profile`,
        method: "PATCH",
        data: payload,
      };

      req({
        config,
      });
    },
  });

  useEffect(() => {
    formik.setValues({
      name: user?.name || "",
      email: user?.email || "",
      birthDate: user?.birthDate || null,
      gender: user?.gender || null,
      phoneNumber: user?.phoneNumber || "",
      profession: user?.profession || "",
      address: user?.address || "",
      files: [],
    });
  }, [user]);

  return (
    <CContainer p={4} rounded={"xl"} bg={"body"} flex={1} {...restProps}>
      <form id={"edit_profile"} onSubmit={formik.handleSubmit}>
        <FieldRoot gap={4}>
          <SimpleGrid w={"full"} columns={[1, null, 2]} gapX={8} gapY={4}>
            <Field
              label={l.name}
              invalid={!!formik.errors.name}
              errorText={formik.errors.name as string}
              required
            >
              <StringInput
                inputValue={formik.values.name}
                onChange={(inputValue) => {
                  formik.setFieldValue("name", inputValue);
                }}
              />
            </Field>

            <Field
              label={"Email"}
              invalid={!!formik.errors.email}
              errorText={formik.errors.email as string}
              required
            >
              <StringInput
                inputValue={formik.values.email}
                onChange={(inputValue) => {
                  formik.setFieldValue("email", inputValue);
                }}
              />
            </Field>

            <Field
              label={"Gender"}
              invalid={!!formik.errors.gender}
              errorText={formik.errors.gender as string}
            >
              <SelectInput
                selectOptions={OPTIONS_GENDER}
                inputValue={formik.values.gender}
                onConfirm={(inputValue) => {
                  formik.setFieldValue("gender", inputValue);
                }}
              />
            </Field>

            <Field
              label={l.birth_date}
              invalid={!!formik.errors.birthDate}
              errorText={formik.errors.birthDate as string}
            >
              <DatePickerInput
                inputValue={formik.values.birthDate}
                onConfirm={(inputValue) => {
                  formik.setFieldValue("birthDate", inputValue);
                }}
              />
            </Field>

            <Field
              label={l.phone_number}
              invalid={!!formik.errors.phoneNumber}
              errorText={formik.errors.phoneNumber as string}
            >
              <PhoneNumberInput
                inputValue={formik.values.phoneNumber}
                onChange={(inputValue) => {
                  formik.setFieldValue("phoneNumber", inputValue);
                }}
              />
            </Field>

            <Field
              label={l.profession}
              invalid={!!formik.errors.profession}
              errorText={formik.errors.profession as string}
            >
              <StringInput
                inputValue={formik.values.profession}
                onChange={(inputValue) => {
                  formik.setFieldValue("profession", inputValue);
                }}
              />
            </Field>
          </SimpleGrid>

          <Field
            label={l.address}
            invalid={!!formik.errors.address}
            errorText={formik.errors.address as string}
          >
            <Textarea
              inputValue={formik.values.address}
              onChange={(inputValue) => {
                formik.setFieldValue("address", inputValue);
              }}
            />
          </Field>
        </FieldRoot>
      </form>

      <Btn
        w={"fit"}
        colorPalette={"p"}
        mt={8}
        ml={[0, null, "auto"]}
        type="submit"
        form="edit_profile"
      >
        {l.save}
      </Btn>
    </CContainer>
  );
};
const EditProfile = (props: any) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const { error, initialLoading, data, onRetry } =
    useDataState<Interface__User>({
      initialData: undefined,
      url: `/api/profile/get-user-profile`,
      dependencies: [],
      dataResource: false,
    });
  const render = {
    loading: (
      <CContainer flex={1} bg={"body"} p={4} rounded={"xl"}>
        <Skeleton flex={1} rounded={"lg"} />
      </CContainer>
    ),
    error: <FeedbackRetry onRetry={onRetry} />,
    empty: <FeedbackNoData />,
    loaded: <ProfileForm user={data} />,
  };

  return (
    <CContainer flex={3.5} {...restProps}>
      <HStack h={"40px"}>
        <CContainer flex={"2 0 300px"} gap={1}>
          <P fontSize={"lg"} fontWeight={"semibold"}>
            {l.my_profile}
          </P>
        </CContainer>
      </HStack>

      {initialLoading && render.loading}
      {!initialLoading && (
        <>
          {error && render.error}
          {!error && (
            <>
              {data && render.loaded}
              {!data && render.empty}
            </>
          )}
        </>
      )}
    </CContainer>
  );
};

export default function Page() {
  // Contexts
  const { l } = useLang();

  return (
    <CContainer>
      <TopNav />

      <CContainer
        bg={"bgContent"}
        rounded={"3xl"}
        overflow={"clip"}
        zIndex={2}
        pt={"120px"}
        pb={[4, null, 12]}
      >
        <LPSectionContainer>
          <Breadcrumbs
            links={[
              {
                label: "KMIS",
                path: "/related-apps/kmis",
              },
              {
                label: l.profile,
                path: "/related-apps/kmis/my-course",
              },
            ]}
            mb={4}
          />

          <Stack flexDir={["column", null, "row"]} gap={4}>
            <CContainer flex={1}>
              <MiniProfile />
            </CContainer>

            <EditProfile />
          </Stack>
        </LPSectionContainer>
      </CContainer>

      <LPFooter />
    </CContainer>
  );
}
