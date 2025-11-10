import * as React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { type AccordionProps as MuiAccordionProps } from "@mui/material/Accordion";
import AccordionDetails, { type AccordionDetailsProps } from "@mui/material/AccordionDetails";
import AccordionSummary, { type AccordionSummaryProps } from "@mui/material/AccordionSummary";

const mergeClassNames = (...values: Array<string | undefined>) =>
  values.filter((value): value is string => Boolean(value && value.trim())).join(" ");

const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mergeClassNames("w-full", className)} {...props} />
  ),
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<HTMLDivElement, MuiAccordionProps>(
  ({ className, disableGutters = true, elevation = 0, square = true, ...props }, ref) => (
    <MuiAccordion
      ref={ref}
      disableGutters={disableGutters}
      elevation={elevation}
      square={square}
      className={mergeClassNames("border-b", className)}
      {...props}
    />
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLDivElement, AccordionSummaryProps>(
  ({ className, children, expandIcon, sx, ...props }, ref) => (
    <AccordionSummary
      ref={ref}
      expandIcon={expandIcon ?? <ExpandMoreIcon fontSize="small" />}
      className={mergeClassNames("px-4 py-3 font-medium", className)}
      sx={{
        "& .MuiAccordionSummary-content": { margin: 0 },
        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": { transform: "rotate(180deg)" },
        ...sx,
      }}
      {...props}
    >
      {children}
    </AccordionSummary>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionDetailsProps>(
  ({ className, ...props }, ref) => (
    <AccordionDetails
      ref={ref}
      className={mergeClassNames("px-4 pb-4 text-sm", className)}
      {...props}
    />
  ),
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
