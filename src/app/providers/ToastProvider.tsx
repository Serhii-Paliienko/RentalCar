import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

type Props = { children: ReactNode };

export function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
}
