import React from "react";

export const DividerText: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const lineClassName = "w-full border-1 border-solid border-gray-400";
  return (
    <div className="flex items-center">
      <div className={lineClassName} />
      <h6 className="text-lightgray pt-2 pb-2 pl-8 pr-8">{children}</h6>
      <div className={lineClassName} />
    </div>
  );
};
