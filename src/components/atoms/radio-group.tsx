import * as React from "react";
import MuiRadioGroup, { type RadioGroupProps as MuiRadioGroupProps } from "@mui/material/RadioGroup";
import FormControlLabel, { type FormControlLabelProps } from "@mui/material/FormControlLabel";
import Radio, { type RadioProps } from "@mui/material/Radio";

type RadioGroupProps = MuiRadioGroupProps;

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => (
  <MuiRadioGroup ref={ref} {...props} />
));
RadioGroup.displayName = "RadioGroup";

type RadioGroupItemProps = Omit<FormControlLabelProps, "control" | "label"> & {
  label?: React.ReactNode;
  radioProps?: RadioProps;
  children?: React.ReactNode;
};

const RadioGroupItem = React.forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  ({ label, children, radioProps, ...props }, ref) => (
    <FormControlLabel
      ref={ref}
      control={<Radio color="primary" {...radioProps} />}
      label={label ?? children}
      {...props}
    />
  ),
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
