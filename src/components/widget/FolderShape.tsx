import React from "react";

interface FolderShapeProps {
  w?: string | number;
  h?: string | number;
  width?: string | number;
  height?: string | number;
  color?: string;
}

export default function FolderShape({
  w,
  h,
  width,
  height,
  color = "#fff",
}: FolderShapeProps) {
  const finalWidth = w ?? width ?? "100%";
  const finalHeight = h ?? height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 78.16 20.97"
      width={finalWidth}
      height={finalHeight}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block" }}
    >
      <path
        d="M-0 20.97l57.09 0 21.07 0c-13.5,0 -15.22,-20.97 -26.47,-20.97l-46.29 0c-2.97,0 -5.4,2.43 -5.4,5.4l0 15.57z"
        fill={color}
      />
    </svg>
  );
}
