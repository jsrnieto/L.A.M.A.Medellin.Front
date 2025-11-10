import { Avatar as MuiAvatar } from "@mui/material";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

export const Avatar = ({ name, imageUrl, size = 40 }: AvatarProps) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <MuiAvatar
      src={imageUrl}
      alt={name}
      sx={{
        width: size,
        height: size,
        bgcolor: "primary.main",
        fontWeight: 600,
      }}
    >
      {getInitials(name)}
    </MuiAvatar>
  );
};