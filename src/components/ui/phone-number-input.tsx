import { NumInput } from "@/components/ui/number-input";
import { SelectInput } from "@/components/ui/select-input";
import { Interface__SelectOption } from "@/constants/interfaces";
import { useThemeConfig } from "@/context/useThemeConfig";
import { HStack, StackProps, useFieldContext } from "@chakra-ui/react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import { useEffect, useState } from "react";

interface Props extends Omit<StackProps, "onChange"> {
  id?: string;
  inputValue?: string;
  onChange?: (inputValue: string) => void;
  placeholder?: string;
  invalid?: boolean;
}

const SelectCountry = ({
  id,
  inputValue,
  onConfirm,
}: {
  id?: string;
  inputValue: Interface__SelectOption[] | null | undefined;
  onConfirm: (inputValue: Interface__SelectOption[] | null | undefined) => void;
}) => {
  const countries = getCountries();
  const options = countries.map((code) => {
    return {
      id: `+${getCountryCallingCode(code)}`,
      label: `+${getCountryCallingCode(code)} (${code})`,
    };
  });

  return (
    <SelectInput
      id={`${id}-select-country-code`}
      inputValue={inputValue}
      onConfirm={(inputValue) => onConfirm(inputValue)}
      selectOptions={options}
      w={"fit"}
      border="none !important"
      // nonNullable
      // backdrop={false}
    />
  );
};

const PhoneNumberInput = (props: Props) => {
  // Props
  const { id, inputValue, onChange, placeholder, invalid, ...restProps } =
    props;

  // Contexts
  const fc = useFieldContext();
  const resolvedInvalid = invalid || fc?.invalid;
  const { themeConfig } = useThemeConfig();

  // States
  const [country, setCountry] = useState<
    Interface__SelectOption[] | null | undefined
  >([
    {
      id: "+62",
      label: "+62 (ID)",
    },
  ]);
  const [phone, setPhone] = useState<number | null | undefined>(
    parseInt(inputValue?.split(" ")[1] as string)
      ? parseInt(inputValue?.split(" ")[1] as string)
      : null
  );

  useEffect(() => {
    onChange?.(`${country?.[0]?.id} ${phone}`);
  }, [phone]);

  return (
    <HStack
      border={"1px solid"}
      borderColor={resolvedInvalid ? "border.error" : "border.muted"}
      w={"full"}
      gap={0}
      rounded={themeConfig.radii.component}
      {...restProps}
    >
      <SelectCountry id={id} inputValue={country} onConfirm={setCountry} />

      <NumInput
        formatted={false}
        w={"full"}
        border="none !important"
        onChange={(inputValue) => {
          setPhone(inputValue);
        }}
        inputValue={phone}
        placeholder={placeholder}
      />
    </HStack>
  );
};

export default PhoneNumberInput;
