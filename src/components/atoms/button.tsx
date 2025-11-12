import * as React from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import type { SxProps, Theme } from "@mui/material/styles";

type CustomVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type CustomSize = "default" | "sm" | "lg" | "icon";

type ButtonProps = Omit<MuiButtonProps, "variant" | "color" | "size"> & {
  variant?: CustomVariant;
  size?: CustomSize;
};

const variantConfig: Record<
  CustomVariant,
  {
    muiVariant: MuiButtonProps["variant"];
    color?: MuiButtonProps["color"];
    sx?: SxProps<Theme>;
  }
> = {
  default: { muiVariant: "contained", color: "primary" },
  destructive: {
    muiVariant: "contained",
    color: "error",
  },
  outline: {
    muiVariant: "outlined",
    color: "primary",
  },
  secondary: { muiVariant: "contained", color: "secondary" },
  ghost: {
    muiVariant: "text",
    color: "primary",
    sx: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "action.hover",
      },
    },
  },
  link: {
    muiVariant: "text",
    color: "primary",
    sx: {
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
};

const sizeMap: Record<CustomSize, MuiButtonProps["size"]> = {
  default: "medium",
  sm: "small",
  lg: "large",
  icon: "medium",
};

const sizeStyles: Record<CustomSize, SxProps<Theme>> = {
  default: {
    minHeight: 40,
    px: 2,
  },
  sm: {
    minHeight: 36,
    px: 1.5,
  },
  lg: {
    minHeight: 48,
    px: 3,
  },
  icon: {
    width: 40,
    minWidth: 40,
    height: 40,
    px: 0,
  },
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", sx, ...props }, ref) => {
    const { muiVariant, color } = variantConfig[variant];
    const combinedSx: SxProps<Theme> = [
      {
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        gap: 1,
      }
    ];

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={color}
        size={sizeMap[size]}
        sx={combinedSx}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
