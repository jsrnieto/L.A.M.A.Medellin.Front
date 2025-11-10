import * as React from "react";
import Chip, { type ChipProps } from "@mui/material/Chip";

type CustomVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends Omit<ChipProps, "variant" | "color"> {
  variant?: CustomVariant;
}

const variantStyles = {
  default: {
    color: "primary" as const,
    sx: { color: "primary.contrastText" },
  },
  secondary: {
    color: "secondary" as const,
    sx: { color: "secondary.contrastText" },
  },
  destructive: {
    color: "error" as const,
    sx: { color: "error.contrastText" },
  },
  outline: {
    variant: "outlined" as const,
    color: "default" as const,
  },
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ variant = "default", label, ...props }, ref) => {
  const style = variantStyles[variant];

  return (
    <Chip
      ref={ref}
      size="small"
      label={label ?? props.children}
      color={style.color}
      sx={{
        fontWeight: 600,
        px: 1.25,
        ...(props.sx ?? {}),
      }}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
