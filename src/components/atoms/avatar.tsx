import * as React from "react";
import MuiAvatar, { type AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

type AvatarContextValue = {
  setImageProps: (props?: AvatarImageProps) => void;
  setFallbackContent: (content: React.ReactNode) => void;
};

const AvatarContext = React.createContext<AvatarContextValue | undefined>(undefined);

const useAvatarContext = (component: string) => {
  const context = React.useContext(AvatarContext);
  if (!context) {
    throw new Error(`${component} must be used within an Avatar`);
  }
  return context;
};

const Avatar = React.forwardRef<HTMLDivElement, MuiAvatarProps>(({ children, sx, imgProps, src, alt, ...props }, ref) => {
  const [imageProps, setImageProps] = React.useState<AvatarImageProps | undefined>();
  const [fallbackContent, setFallbackContent] = React.useState<React.ReactNode>(null);

  const contextValue = React.useMemo(
    () => ({
      setImageProps,
      setFallbackContent,
    }),
    [setImageProps, setFallbackContent],
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <MuiAvatar
        ref={ref}
        src={imageProps?.src ?? src}
        alt={imageProps?.alt ?? alt}
        imgProps={{ ...imgProps, ...imageProps }}
        sx={{ width: 40, height: 40, ...sx }}
        {...props}
      >
        {fallbackContent}
      </MuiAvatar>
      {children}
    </AvatarContext.Provider>
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = (props: AvatarImageProps) => {
  const { setImageProps } = useAvatarContext("AvatarImage");

  React.useEffect(() => {
    setImageProps(props);
    return () => setImageProps(undefined);
  }, [props, setImageProps]);

  return null;
};
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps {
  children?: React.ReactNode;
}

const AvatarFallback = ({ children }: AvatarFallbackProps) => {
  const { setFallbackContent } = useAvatarContext("AvatarFallback");

  React.useEffect(() => {
    setFallbackContent(children ?? null);
    return () => setFallbackContent(null);
  }, [children, setFallbackContent]);

  return null;
};
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
