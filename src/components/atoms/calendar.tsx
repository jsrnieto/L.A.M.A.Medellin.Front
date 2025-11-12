import { DateCalendar, type DateCalendarProps } from "@mui/x-date-pickers";

export type CalendarProps = DateCalendarProps & {
  localizationProps?: Record<string, unknown>;
};

function Calendar({ localizationProps, ...props }: CalendarProps) {
  return (
    <DateCalendar {...props} />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
