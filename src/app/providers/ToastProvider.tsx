import type { ReactNode } from "react";

type Props = { children: ReactNode };

/** Тонкая обёртка под тосты (именованный экспорт) */
export function ToastProvider({ children }: Props) {
  return <>{children}</>;
}
