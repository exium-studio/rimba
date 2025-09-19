"use client";

import { Img } from "@/components/ui/img";
import { SVGS_PATH } from "@/constants/paths";
import { Props__Img } from "@/constants/props";

export const LogoImg = (props: Props__Img) => {
  // Props
  const { ...restProps } = props;

  return (
    <Img
      src={`${SVGS_PATH}/rimba_letter_art_light.svg`}
      alt="RIMBA logo"
      objectFit="contain"
      w={"auto"}
      aspectRatio={3.35 / 1}
      {...restProps}
    />
  );
};
