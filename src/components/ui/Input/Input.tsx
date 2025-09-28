import React, { forwardRef } from "react";
import s from "./Input.module.css";
import { cn } from "@shared/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref
) {
  return <input ref={ref} className={cn(s.input, className)} {...rest} />;
});

export default Input;
