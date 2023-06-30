import React from "react";
import { useSearchParams } from "react-router-dom";

import { CatCanvas, CatCanvasProps } from "../features/cat/CatCanvas";

export const CatRoute: React.FC = () => {
  const [params] = useSearchParams();

  const props: CatCanvasProps = {};
  for (const key of params.keys()) {
    const value = Number(params.get(key));
    if (!isNaN(value)) {
      props[key as keyof CatCanvasProps] = value;
    }
  }

  return <CatCanvas {...props} />;
};
