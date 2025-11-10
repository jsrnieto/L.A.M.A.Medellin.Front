import * as React from "react";
import DialogMui, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogTitle, { type DialogTitleProps } from "@mui/material/DialogTitle";
import DialogContentText, { type DialogContentTextProps } from "@mui/material/DialogContentText";
import Box, { type BoxProps } from "@mui/material/Box";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type DialogContextValue = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialogContext = (component: string) => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used within a Dialog`);
  }
  return context;
};

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ children, open: openProp, defaultOpen = false, onOpenChange }: DialogProps) => {
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

  const value = React.useMemo<DialogContextValue>(() => ({ open, setOpen }), [open, setOpen]);

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};
Dialog.displayName = "Dialog";

interface IDialogTriggerProps {
  children: IChildrenProps;
}

interface IChildrenProps extends React.ReactElement{
  props: {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  }
}

const DialogTrigger = ({ children }: IDialogTriggerProps) => {
  const { setOpen } = useDialogContext("DialogTrigger");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    children.props.onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(true);
    }
  };

  return React.cloneElement(children, { onClick: handleClick });
};
DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>;
DialogPortal.displayName = "DialogPortal";

const DialogOverlay = () => null;
DialogOverlay.displayName = "DialogOverlay";

const DialogClose = ({ children }: { children: React.ReactElement }) => {
  const { setOpen } = useDialogContext("DialogClose");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    children.props.onClick?.(event);
    if (!event.defaultPrevented) {
      setOpen(false);
    }
  };

  return React.cloneElement(children, { onClick: handleClick });
};
DialogClose.displayName = "DialogClose";

type DialogContentProps = Omit<MuiDialogProps, "open" | "onClose"> & {
  paperProps?: BoxProps;
};

const DialogContent = ({ children, paperProps, ...props }: DialogContentProps) => {
  const { open, setOpen } = useDialogContext("DialogContent");

  const handleClose: MuiDialogProps["onClose"] = (event, reason) => {
    setOpen(false);
    props.onClose?.(event, reason);
  };

  return (
    <DialogMui open={open} onClose={handleClose} fullWidth maxWidth="sm" {...props}>
      <Box sx={{ p: 3, position: "relative" }} {...paperProps}>
        {children}
      </Box>
    </DialogMui>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ sx, ...props }: BoxProps) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, textAlign: { xs: "center", sm: "left" }, ...sx }} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ sx, ...props }: BoxProps) => (
  <Box
    sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "flex-end", gap: 1, mt: 3, ...sx }}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => (
  <MuiDialogTitle ref={ref} sx={{ pr: 5 }} {...props} />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogContentTextProps>((props, ref) => (
  <DialogContentText ref={ref} {...props} />
));
DialogDescription.displayName = "DialogDescription";

const DialogCloseButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <IconButton ref={ref} size="small" sx={{ position: "absolute", top: 8, right: 8 }} {...props}>
    <CloseIcon fontSize="small" />
  </IconButton>
));
DialogCloseButton.displayName = "DialogCloseButton";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
};
