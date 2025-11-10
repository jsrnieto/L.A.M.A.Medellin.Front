import * as React from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import Button, { type ButtonProps } from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogContentText, { type DialogContentTextProps } from "@mui/material/DialogContentText";
import DialogTitle, { type DialogTitleProps } from "@mui/material/DialogTitle";

type AlertDialogContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AlertDialogContext = React.createContext<AlertDialogContextValue | undefined>(undefined);

const useAlertDialogContext = (component: string): AlertDialogContextValue => {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error(`${component} must be used within an AlertDialog`);
  }
  return context;
};

interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({ children, open: openProp, defaultOpen = false, onOpenChange }: AlertDialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? Boolean(openProp) : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const value = React.useMemo<AlertDialogContextValue>(() => ({ open, setOpen }), [open, setOpen]);

  return <AlertDialogContext.Provider value={value}>{children}</AlertDialogContext.Provider>;
};
AlertDialog.displayName = "AlertDialog";

const AlertDialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
AlertDialogPortal.displayName = "AlertDialogPortal";

const AlertDialogOverlay = () => null;
AlertDialogOverlay.displayName = "AlertDialogOverlay";

type AlertDialogContentProps = Omit<DialogProps, "open" | "onClose">;

const AlertDialogContent = ({ children, ...props }: AlertDialogContentProps) => {
  const { open, setOpen } = useAlertDialogContext("AlertDialogContent");

  const handleClose: DialogProps["onClose"] = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} {...props}>
      <Box sx={{ p: 3, minWidth: 320 }}>{children}</Box>
    </Dialog>
  );
};
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      rowGap: 0.5,
      textAlign: { xs: "center", sm: "left" },
      ...sx,
    }}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column-reverse", sm: "row" },
      justifyContent: "flex-end",
      columnGap: 1,
      rowGap: 1,
      mt: 3,
      ...sx,
    }}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => (
  <DialogTitle ref={ref} {...props} />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, DialogContentTextProps>((props, ref) => (
  <DialogContentText ref={ref} {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, variant = "contained", ...props }, ref) => {
  const { setOpen } = useAlertDialogContext("AlertDialogAction");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(false);
    }
  };

  return <Button ref={ref} variant={variant} onClick={handleClick} {...props} />;
});
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, ButtonProps>(({ onClick, variant = "outlined", ...props }, ref) => {
  const { setOpen } = useAlertDialogContext("AlertDialogCancel");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(false);
    }
  };

  return (
    <Button ref={ref} variant={variant} onClick={handleClick} {...props} />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
