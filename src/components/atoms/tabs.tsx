import * as React from "react";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import Tab, { type TabProps } from "@mui/material/Tab";
import Box, { type BoxProps } from "@mui/material/Box";

type TabsContextValue = {
  value: string | number;
  setValue: (value: string | number) => void;
  orientation: MuiTabsProps["orientation"];
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

const useTabsContext = (component: string) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used within Tabs`);
  }
  return context;
};

type TabsProps = {
  defaultValue?: string | number;
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  orientation?: MuiTabsProps["orientation"];
  children: React.ReactNode;
};

const Tabs = ({ defaultValue = 0, value: valueProp, onValueChange, orientation = "horizontal", children }: TabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | number>(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const setValue = React.useCallback(
    (newValue: string | number) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  const contextValue = React.useMemo<TabsContextValue>(
    () => ({
      value,
      setValue,
      orientation,
    }),
    [orientation, setValue, value],
  );

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, Omit<MuiTabsProps, "value" | "onChange">>((props, ref) => {
  const { value, setValue, orientation } = useTabsContext("TabsList");

  return (
    <MuiTabs
      ref={ref}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      orientation={orientation}
      variant="scrollable"
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

type TabsTriggerProps = TabProps;

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ children, ...props }, ref) => (
  <Tab ref={ref} {...props} label={props.label ?? children} />
));
TabsTrigger.displayName = "TabsTrigger";

type TabsContentProps = BoxProps & {
  value: string | number;
};

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ value, children, ...props }, ref) => {
  const { value: activeValue } = useTabsContext("TabsContent");

  if (activeValue !== value) {
    return null;
  }

  return (
    <Box ref={ref} role="tabpanel" sx={{ mt: 2 }} {...props}>
      {children}
    </Box>
  );
});
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
