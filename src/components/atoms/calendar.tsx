import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar, type DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import {
  LocalizationProvider,
  type LocalizationProviderProps,
} from "@mui/x-date-pickers/LocalizationProvider";

export type CalendarProps<TDate = Date> = DateCalendarProps<TDate> & {
  localizationProps?: Omit<LocalizationProviderProps<TDate>, "dateAdapter" | "children">;
};

function Calendar<TDate = Date>({ localizationProps, ...props }: CalendarProps<TDate>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} {...localizationProps}>
      <DateCalendar {...props} />
    </LocalizationProvider>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
