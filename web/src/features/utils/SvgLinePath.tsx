import React, { useEffect, useState } from "react";

export interface SvgLinePathProps {
  /** paths close at their start - i.e. they create closed shapes, and including an identical closing element is unnecessary */
  paths: [number, number][][];
}

const toSvgPath = (path: [number, number][]): string => {
  const first = path[0];
  const firstPos = first.join(" ");
  let pathStr = `M${firstPos}`;
  for (let i = 1; i < path.length; i++) {
    const pos = path[i].join(" ");
    pathStr += `L${pos}M${pos}`;
  }
  return `${pathStr}L${firstPos}`;
};

export const SvgLinePath: React.FC<SvgLinePathProps> = ({ paths }) => {
  const [path, setPath] = useState<string>();

  useEffect(() => {
    setPath(paths.map((p) => toSvgPath(p)).join(""));
  }, [paths]);

  if (!path) {
    return null;
  }

  return <path strokeLinecap="round" strokeLinejoin="round" d={path} />;
};
