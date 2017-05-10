import { AlertOptions } from "ionic-angular";

export interface DatetimePickerAlertOptions extends AlertOptions {
  modelDate?: Date;
  dateEnabled?: boolean;
  timeEnabled?: boolean;
  isMondayFirst?: boolean;
  secondsEnabled?: boolean;
  meridiemEnabled?: boolean;
  onlyValid?: any;
  monthNames?: string[];
  weekdayNames?: string[];
}
