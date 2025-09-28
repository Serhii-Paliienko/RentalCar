import { forwardRef } from "react";
import s from "./Textarea.module.css";
import { cn } from "@shared/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...rest }, ref) {
    return <textarea ref={ref} className={cn(s.root, className)} {...rest} />;
  }
);

export default Textarea;
