import { Chip } from "@mui/material";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "admin" | "miembro" | "activo" | "inactivo";
}

export const Badge = ({ children, variant = "default" }: BadgeProps) => {
  const getColor = () => {
    switch (variant) {
      case "admin":
        return "secondary";
      case "miembro":
        return "primary";
      case "activo":
        return "success";
      case "inactivo":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Chip
      label={children}
      color={getColor()}
      size="small"
      sx={{ fontWeight: 500 }}
    />
  );
};