import { Btn } from "@/components/ui/btn";
import { CContainer } from "@/components/ui/c-container";
import { FileIcon } from "@/components/ui/file-icon";
import { NavLink } from "@/components/ui/nav-link";
import { P } from "@/components/ui/p";
import { Props__FileItem } from "@/constants/props";
import { useThemeConfig } from "@/context/useThemeConfig";
import { fileUrl } from "@/utils/url";
import { HStack, Icon } from "@chakra-ui/react";

export const FileItem = (props: Props__FileItem) => {
  // Props
  const { fileData, actions = [], ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <HStack
      py={2}
      px={4}
      pr={3}
      rounded={themeConfig.radii.component}
      border={"1px solid"}
      borderColor={"border.muted"}
      gap={4}
      justify={"space-between"}
      {...restProps}
    >
      <NavLink
        to={fileUrl(fileData?.filePath)}
        external
        style={{
          width: "100%",
        }}
      >
        <HStack gap={4}>
          <FileIcon flexShrink={0} mimeType={fileData?.fileMimeType} />

          <CContainer flex={1}>
            <P lineClamp={1}>{`${fileData?.fileName}`}</P>
            <P fontSize={"sm"} color={"fg.muted"}>
              {`${fileData?.fileSize}`}
            </P>
          </CContainer>
        </HStack>
      </NavLink>

      <HStack justify={"end"}>
        {actions.map((action) => {
          return (
            <Btn
              key={action.type}
              iconButton={!!action.icon}
              flexShrink={0}
              size={"xs"}
              variant={"ghost"}
              colorPalette={"gray"}
              onClick={action.onClick}
            >
              {action.icon ? (
                <Icon boxSize={5}>{action.icon}</Icon>
              ) : (
                action.label
              )}
            </Btn>
          );
        })}
      </HStack>
    </HStack>
  );
};
