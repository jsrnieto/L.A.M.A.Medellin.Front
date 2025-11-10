import * as React from "react";
import MuiSwitch, { type SwitchProps as MuiSwitchProps } from "@mui/material/Switch";

type SwitchProps = MuiSwitchProps;

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => (
  <MuiSwitch ref={ref} color="primary" {...props} />
));
Switch.displayName = "Switch";

export { Switch };
