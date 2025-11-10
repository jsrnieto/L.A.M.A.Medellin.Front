import * as React from "react";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardHeader, { type CardHeaderProps as MuiCardHeaderProps } from "@mui/material/CardHeader";
import MuiCardContent, { type CardContentProps as MuiCardContentProps } from "@mui/material/CardContent";
import MuiCardActions, { type CardActionsProps as MuiCardActionsProps } from "@mui/material/CardActions";
import Typography, { type TypographyProps } from "@mui/material/Typography";

const Card = React.forwardRef<HTMLDivElement, MuiCardProps>((props, ref) => <MuiCard ref={ref} variant="outlined" {...props} />);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, MuiCardHeaderProps>((props, ref) => (
  <MuiCardHeader ref={ref} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, TypographyProps<"h3">>(({ children, ...props }, ref) => (
  <Typography ref={ref} component="h3" variant="h6" fontWeight={600} {...props}>
    {children}
  </Typography>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, TypographyProps<"p">>(({ children, ...props }, ref) => (
  <Typography ref={ref} component="p" variant="body2" color="text.secondary" {...props}>
    {children}
  </Typography>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, MuiCardContentProps>((props, ref) => (
  <MuiCardContent ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, MuiCardActionsProps>((props, ref) => (
  <MuiCardActions ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
