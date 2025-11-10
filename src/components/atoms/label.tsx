import * as React from "react";
import Typography, { type TypographyProps } from "@mui/material/Typography";

interface ILabelProps extends TypographyProps {
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, ILabelProps>(({ children, ...props }, ref) => (
  <Typography
    component="label"
    ref={ref}
    variant="body2"
    fontWeight={500}
    sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, opacity: props.disabled ? 0.6 : 1 }}
    {...props}
  >
    {children}
  </Typography>
));
Label.displayName = "Label";

export { Label };
