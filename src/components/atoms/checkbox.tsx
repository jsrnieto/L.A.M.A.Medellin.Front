import * as React from "react";
import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";

type CheckboxProps = MuiCheckboxProps;

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => (
  <MuiCheckbox ref={ref} color="primary" {...props} />
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
