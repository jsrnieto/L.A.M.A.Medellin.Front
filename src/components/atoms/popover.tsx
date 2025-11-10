import * as React from "react";
import MuiPopover, { type PopoverProps as MuiPopoverProps } from "@mui/material/Popover";
import Paper, { type PaperProps } from "@mui/material/Paper";

type PopoverContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  anchorEl: HTMLElement | null;
  setAnchorEl: (el: HTMLElement | null) => void;
  popoverProps: Omit<MuiPopoverProps, "open" | "anchorEl" | "onClose">;
};

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = (component: string) => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(`${component} must be used within a Popover`);
  }
  return context;
};

type PopoverProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
} & Omit<MuiPopoverProps, "open" | "anchorEl" | "onClose">;

const Popover = ({ open: openProp, defaultOpen = false, onOpenChange, children, ...props }: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
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

  const value = React.useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      anchorEl,
      setAnchorEl,
      popoverProps: props,
    }),
    [anchorEl, open, props, setOpen],
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};
Popover.displayName = "Popover";

type PopoverTriggerProps = {
  asChild?: boolean;
  children: React.ReactElement;
};

const PopoverTrigger = ({ asChild = false, children }: PopoverTriggerProps) => {
  const { open, setOpen, setAnchorEl } = usePopoverContext("PopoverTrigger");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  if (!React.isValidElement(children)) {
    return null;
  }

  if (asChild) {
    return React.cloneElement(children);
  }

  return React.cloneElement(children);
};
PopoverTrigger.displayName = "PopoverTrigger";

type PopoverContentProps = Omit<MuiPopoverProps, "open" | "anchorEl" | "onClose"> & {
  paperProps?: PaperProps;
};

const PopoverContent = ({ children, paperProps, ...props }: PopoverContentProps) => {
  const { open, anchorEl, setOpen, popoverProps } = usePopoverContext("PopoverContent");

  const handleClose: MuiPopoverProps["onClose"] = () => {
    setOpen(false);
  };

  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      {...popoverProps}
      {...props}
    >
      <Paper sx={{ p: 2, minWidth: 288 }} {...paperProps}>
        {children}
      </Paper>
    </MuiPopover>
  );
};
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
