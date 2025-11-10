import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link, { type LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>((props, ref) => (
  <nav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div"> & { separator?: React.ReactNode }>(
  ({ separator = <NavigateNextIcon fontSize="small" />, ...props }, ref) => (
    <div ref={ref}>
      <Breadcrumbs separator={separator} {...props} />
    </div>
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>((props, ref) => (
  <span ref={ref} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link ref={ref} underline="hover" color="inherit" {...props} />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>((props, ref) => (
  <Typography ref={ref} color="text.primary" {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children }: React.PropsWithChildren) => <span>{children ?? <NavigateNextIcon fontSize="small" />}</span>;
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = () => (
  <Typography component="span" sx={{ display: "flex", alignItems: "center" }} aria-hidden="true">
    <MoreHorizIcon fontSize="small" />
    <span className="sr-only">More</span>
  </Typography>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
