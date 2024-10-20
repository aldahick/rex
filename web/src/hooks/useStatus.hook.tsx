import { atom, useAtom } from "jotai";
import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { toStartCase } from "../utils/string.util";

const statusVariants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
] as const;
export type StatusVariant = (typeof statusVariants)[number];

const statusAtom = atom<{
  header: React.ReactNode;
  message: React.ReactNode;
  variant: StatusVariant;
} | null>(null);

export const StatusProvider: React.FC = () => {
  const [status, setStatus] = useAtom(statusAtom);

  const handleClose = () => {
    setStatus(null);
  };

  return (
    <ToastContainer className="pt-3 z-10" position="top-center">
      <Toast
        bg={status?.variant}
        onClose={handleClose}
        show={!!status}
        delay={3000}
        autohide
      >
        <Toast.Header>
          {typeof status?.header === "string" ? (
            <div className="flex-grow font-bold">{status.header}</div>
          ) : (
            status?.header
          )}
        </Toast.Header>
        <Toast.Body>{status?.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export type StatusDispatcher = (
  message: React.ReactNode,
  header?: React.ReactNode,
) => void;
export type StatusDispatchers = Record<StatusVariant, StatusDispatcher>;

export const useStatus = (): StatusDispatchers => {
  const [, setStatus] = useAtom(statusAtom);
  const getDispatcher =
    (variant: StatusVariant): StatusDispatcher =>
    (message, header = toStartCase(variant)) => {
      setStatus({ message, header, variant });
    };

  return Object.fromEntries(
    statusVariants.map((variant) => [variant, getDispatcher(variant)]),
  ) as StatusDispatchers;
};
