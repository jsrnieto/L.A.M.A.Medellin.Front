import * as React from "react";
import MuiTooltip, { type TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";
import Box, { type BoxProps } from "@mui/material/Box";

type TooltipContextValue = {
  title: React.ReactNode;
  setTitle: (node: React.ReactNode) => void;
  tooltipProps: Omit<MuiTooltipProps, "title" | "children">;
};

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

const useTooltipContext = (component: string) => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error(`${component} must be used within a Tooltip`);
  }
  return context;
};

type TooltipRootProps = React.PropsWithChildren<Omit<MuiTooltipProps, "title" | "children">>;

const Tooltip = ({ children, ...props }: TooltipRootProps) => {
  const [title, setTitle] = React.useState<React.ReactNode>(null);

  const value = React.useMemo<TooltipContextValue>(
    () => ({
      title,
      setTitle,
      tooltipProps: props,
    }),
    [props, title],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
};
Tooltip.displayName = "Tooltip";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
TooltipProvider.displayName = "TooltipProvider";

type TooltipTriggerProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(({ asChild = false, children, ...props }, ref) => {
  const { title, tooltipProps } = useTooltipContext("TooltipTrigger");

  if (!children) {
    return null;
  }

  const content = asChild && React.isValidElement(children) ? (
    React.cloneElement(children, { ...props })
  ) : (
    <span ref={ref as React.Ref<HTMLSpanElement>} {...props}>
      {children}
    </span>
  );

  return (
    <MuiTooltip title={title ?? ""} {...tooltipProps}>
      {content}
    </MuiTooltip>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

type TooltipContentProps = BoxProps;

const TooltipContent = ({ children, ...props }: TooltipContentProps) => {
  const { setTitle } = useTooltipContext("TooltipContent");

  React.useEffect(() => {
    setTitle(
      <Box sx={{ px: 1.5, py: 0.5, fontSize: 14 }} {...props}>
        {children}
      </Box>,
    );

    return () => {
      setTitle(null);
    };
  }, [children, props, setTitle]);

  return null;
};
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
