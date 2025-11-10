import * as React from "react";
import OutlinedInput, { type OutlinedInputProps } from "@mui/material/OutlinedInput";

type InputProps = OutlinedInputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <OutlinedInput inputRef={ref} fullWidth size="small" {...props} />
));
Input.displayName = "Input";

export { Input };
