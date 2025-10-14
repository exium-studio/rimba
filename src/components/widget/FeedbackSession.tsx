"use client";

import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { Field } from "@/components/ui/field";
import { P } from "@/components/ui/p";
import { Textarea } from "@/components/ui/textarea";
import { DotIndicator } from "@/components/widget/Indicator";
import useLang from "@/context/useLang";
import useRenderTrigger from "@/context/useRenderTrigger";
import useRequest from "@/hooks/useRequest";
import { interpolateString, pluckString } from "@/utils/string";
import { FieldRoot, HStack, StackProps } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props extends StackProps {
  courseDetail: any;
}

export const FeedbackSession = (props: Props) => {
  // Props
  const { courseDetail, ...restProps } = props;

  // Contexts
  const { l } = useLang();
  const setRt = useRenderTrigger((s) => s.setRt);

  // Hooks
  const { req, loading } = useRequest({
    id: "submit-feedback",
  });

  // States
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      feedback: courseDetail?.learningAttempt?.feedback
        ? {
            id: courseDetail?.learningAttempt?.feedback,
            label: pluckString(
              l,
              `feedback_label_${courseDetail?.learningAttempt?.feedback}`
            ),
          }
        : null,
      comment: courseDetail?.learningAttempt?.feedbackComment,
    },
    validationSchema: yup.object().shape({
      feedback: yup.object().required(l.msg_required_form),
      comment: yup.string().required(l.msg_required_form),
    }),
    onSubmit: (values) => {
      const payload = {
        feedback: values.feedback?.id,
        comment: values.comment,
      };

      const config = {
        url: `/api/kmis/learning-course/feedback/${courseDetail?.learningAttempt.id}`,
        method: "PATCH",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: () => {
            setRt((ps) => !ps);
          },
        },
      });
    },
  });

  return (
    <CContainer p={4} gap={4} rounded={"xl"} bg={"body"} {...restProps}>
      <CContainer gap={1}>
        <P fontSize={"lg"} fontWeight={"semibold"}>
          Feedback
        </P>

        <P color={"fg.subtle"}>
          {l.msg_input_feedback_to_get_course_certificate}
        </P>
      </CContainer>

      <form id="feedback" onSubmit={formik.handleSubmit}>
        <FieldRoot gap={4}>
          <Field
            label={
              <P>
                {interpolateString(l.feedback_question, {
                  courseName: courseDetail?.learningAttempt?.topic?.title || "",
                })}
              </P>
            }
            invalid={!!formik.errors.feedback}
            errorText={formik.errors.feedback as string}
          >
            <CContainer gap={2}>
              {Array.from({ length: 5 }, (_, idx) => {
                const isActive = formik.values.feedback?.id === idx + 1;

                return (
                  <Btn
                    key={idx}
                    clicky={false}
                    justifyContent={"start"}
                    variant={"outline"}
                    onClick={() => {
                      formik.setFieldValue("feedback", {
                        id: idx + 1,
                        label: pluckString(l, `feedback_label_${idx + 1}`),
                      });
                    }}
                  >
                    <HStack justify={"start"} w={"full"}>
                      <P>{`${idx + 1}`}</P>
                      <P>{pluckString(l, `feedback_label_${idx + 1}`)}</P>

                      {isActive && <DotIndicator ml={"auto"} mr={1} />}
                    </HStack>
                  </Btn>
                );
              })}
            </CContainer>
          </Field>

          <Field
            label={l.comment}
            invalid={!!formik.errors.comment}
            errorText={formik.errors.comment as string}
          >
            <Textarea
              inputValue={formik.values.comment}
              onChange={(inputValue) => {
                formik.setFieldValue("comment", inputValue);
              }}
            />
          </Field>

          <Btn
            type="submit"
            form="feedback"
            loading={loading}
            colorPalette={"p"}
            ml={"auto"}
            disabled={courseDetail?.learningAttempt?.feedback}
          >
            Submit
          </Btn>
        </FieldRoot>
      </form>
    </CContainer>
  );
};
