import { SelectInput } from "@/components/ui/select-input";
import { Interface__SelectOption } from "@/constants/interfaces";
import { Props__SelectInput } from "@/constants/props";
import useLang from "@/context/useLang";
import useRequest from "@/hooks/useRequest";
import { useEffect, useState } from "react";

export const SelectLegalDocsYear = (props: Props__SelectInput) => {
  // Props
  const { ...restProps } = props;

  // Contexts
  const { l } = useLang();

  // Hooks
  const { req, loading } = useRequest({
    id: "select_legal_docs_year",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // States
  const [selectOptions, setSelectOptions] =
    useState<Interface__SelectOption[]>();

  // Utils
  function fetch() {
    const config = {
      url: `/api/legal-docs/years/index`,
      method: "GET",
      params: {
        with_trashed: 0,
        limit: Infinity,
      },
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          const newOptions = r?.data?.data;
          setSelectOptions(newOptions);
        },
      },
    });
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SelectInput
      title={l.year}
      placeholder={l.year}
      loading={loading}
      selectOptions={selectOptions}
      fetch={fetch}
      {...restProps}
    />
  );
};
