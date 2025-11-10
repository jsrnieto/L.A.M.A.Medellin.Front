import * as React from "react";
import { default as MuiTable, type TableProps as MuiTableProps } from "@mui/material/Table";
import { default as MuiTableBody } from "@mui/material/TableBody";
import { default as MuiTableHead } from "@mui/material/TableHead";
import { default as MuiTableFooter } from "@mui/material/TableFooter";
import TableContainer, { type TableContainerProps } from "@mui/material/TableContainer";
import { default as MuiTableRow, type TableRowProps } from "@mui/material/TableRow";
import TableCell, { type TableCellProps } from "@mui/material/TableCell";
import Typography, { type TypographyProps } from "@mui/material/Typography";

type TableProps = MuiTableProps & {
  containerProps?: Omit<TableContainerProps, "children">;
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ containerProps, ...props }, ref) => (
  <TableContainer component={containerProps?.component ?? "div"} {...containerProps}>
    <MuiTable ref={ref} size="small" {...props} />
  </TableContainer>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <MuiTableHead ref={ref} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <MuiTableBody ref={ref} {...props} />,
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <MuiTableFooter ref={ref} {...props} />,
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => (
  <MuiTableRow hover ref={ref} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => (
  <TableCell ref={ref} component="th" sx={{ fontWeight: 600, color: "text.secondary" }} {...props} />
));
TableHead.displayName = "TableHead";

const TableCellBody = React.forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => (
  <TableCell ref={ref} component="td" {...props} />
));
TableCellBody.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLParagraphElement, TypographyProps<"p">>((props, ref) => (
  <Typography ref={ref} variant="caption" color="text.secondary" component="p" sx={{ mt: 1.5 }} {...props} />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCellBody as TableCell,
  TableCaption,
};
