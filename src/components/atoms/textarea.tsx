import * as React from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

type TextareaProps = TextFieldProps;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <TextField multiline minRows={3} fullWidth inputRef={ref} {...props} />
));
Textarea.displayName = "Textarea";

export { Textarea };
