import type { ReactNode } from "react";

type Props = { children: ReactNode };

export function ToastProvider({ children }: Props) {
  return <>{children}</>;
}
