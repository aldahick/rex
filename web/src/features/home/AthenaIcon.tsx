import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";
import { SvgLinePath } from "../utils/SvgLinePath";

const paths: [number, number][][] = [
  // biome-ignore format: big array
  [
    [231, 231], [214, 198], [218, 192], [201, 148], [190, 130], [187, 111], [156, 95], [196, 82], [192, 77], [171, 87], [137, 84], [134, 79], [128, 78], [132, 70], [156, 70], [167, 57], [185, 49], [222, 49], [172, 9], [128, 1], [90, 6], [75, 12], [41, 37], [23, 73], [23, 103], [32, 150], [33, 178], [21, 194], [5, 204], [7, 208], [30, 200], [43, 185], [50, 167], [51, 141], [49, 117], [62, 85], [84, 70], [91, 76], [112, 72], [119, 78], [101, 85], [89, 94], [76, 100], [66, 118], [82, 102], [92, 100], [100, 96], [112, 87], [115, 92], [92, 100], [67, 123], [60, 156], [66, 196], [78, 203], [81, 220], [69, 230], [75, 234], [133, 211], [224, 235],
  ],
  // biome-ignore format: somewhat big array
  [
    [203, 168], [196, 151], [184, 166], [194, 172],
  ],
];

export const AthenaIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 240 240"
      strokeWidth="10"
      stroke="currentColor"
    >
      <title>Athena Icon</title>
      <SvgLinePath paths={paths} />
    </svg>
  </SvgIcon>
);
