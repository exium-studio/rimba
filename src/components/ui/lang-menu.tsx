"use client";

import { DotIndicator } from "@/components/widget/Indicator";
import { LANGUAGES } from "@/constants/languages";
import { Props__LangMenu } from "@/constants/props";
import { IconChevronDown } from "@tabler/icons-react";
import useLang from "../../context/useLang";
import { Btn } from "./btn";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./menu";
import { Tooltip } from "./tooltip";

export const LangMenu = (props: Props__LangMenu) => {
  // Props
  const { menuContentProps, ...restProps } = props;

  // Contexts
  const { l, lang, setLang } = useLang();

  return (
    <Tooltip content={l.language}>
      <MenuRoot>
        <MenuTrigger asChild>
          <Btn
            clicky={false}
            px={2}
            pr={1}
            variant={"ghost"}
            size="sm"
            {...restProps}
          >
            {lang.toUpperCase()}
            <IconChevronDown stroke={1.5} />
          </Btn>
        </MenuTrigger>

        <MenuContent {...menuContentProps}>
          {LANGUAGES.map((item, i) => {
            const active = item.key === lang;

            return (
              <MenuItem
                key={i}
                value={item.key}
                onClick={() => setLang(item.key as any)}
                fontWeight={active ? "medium" : "normal"}
              >
                {item.label}

                {active && <DotIndicator mr={1} ml={"auto"} />}
              </MenuItem>
            );
          })}
        </MenuContent>
      </MenuRoot>
    </Tooltip>
  );
};
