import { chakra, useToken } from "@chakra-ui/react";

interface FolderShapeProps {
  w?: string | number;
  h?: string | number;
  width?: string | number;
  height?: string | number;
  color?: string;
  fallbackColor?: string;
}

export default function FolderShape({
  w,
  h,
  width,
  height,
  color = "p.900",
  fallbackColor = "#fff",
}: FolderShapeProps) {
  const resolvedWidth = w ?? width ?? "100%";
  const resolvedHeight = h ?? height ?? "100%";

  const tokenValue = useToken("colors", color.includes(".") ? [color] : []);

  const fillColor = color.includes(".")
    ? tokenValue[0] ?? fallbackColor
    : color ?? fallbackColor;

  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 78.16 13.13"
      width={resolvedWidth}
      height={resolvedHeight}
      preserveAspectRatio="xMidYMid meet"
      display="block"
    >
      <path
        d="M-0 13.13l57.09 0 21.07 0c-13.5,0 -15.22,-13.13 -26.47,-13.13l-46.29 0c-2.97,0 -5.4,2.55 -5.4,4.95l0 8.18z"
        fill={fillColor}
      />
    </chakra.svg>
  );
}
