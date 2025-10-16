import { SelectInput } from "@/components/ui/select-input";
import { Props__SelectInput } from "@/constants/props";
import useLang from "@/context/useLang";
import { capitalizeWords } from "@/utils/string";

const SUFFIX_ID = "kmis-course_finished_status";

export const SelectCourseFinishedStatus = (
  props: Omit<Props__SelectInput, "id">
) => {
  const ID = `select_${SUFFIX_ID}`;

  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // States
  const selectOptions = [
    // {
    //   id: 1,
    //   label: l.all,
    // },
    {
      id: 2,
      label: l.finished,
    },
    {
      id: 3,
      label: l.on_progress,
    },
  ];

  return (
    <SelectInput
      id={ID}
      title={capitalizeWords(l.course_finished_status)}
      selectOptions={selectOptions}
      placeholder={capitalizeWords(l.course_finished_status)}
      {...restProps}
    />
  );
};
