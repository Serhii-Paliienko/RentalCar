// src/components/ui/Button/Button.tsx
import {
  type ReactNode,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import s from "./Button.module.css";
import { cn } from "@shared/cn";

type Variant = "primary" | "secondary";

type Common = {
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsButton = Common &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type AsAnchor = Common &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

export type ButtonVariant = Variant;
export type ButtonProps = AsButton | AsAnchor;

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    fullWidth,
    className,
    children,
    as = "button",
    ...rest
  } = props as any;

  const cls = cn(
    s.root,
    variant === "secondary" && s.secondary,
    fullWidth && s.fullWidth,
    className
  );

  if (as === "a") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorProps} className={cls}>
        {children}
      </a>
    );
  }

  const btnProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={btnProps.type ?? "button"} {...btnProps} className={cls}>
      {children}
    </button>
  );
}
