// Using my own implementation of Alert-related stuff until https://github.com/driftyco/ionic/pull/11458 is merged

import { Injectable } from "@angular/core";
import { App, Config } from "ionic-angular";

import { DatetimePickerAlert } from "./alert";
import { DatetimePickerAlertOptions } from "./alert.options";

@Injectable()
export class DatetimePickerAlertController {

  constructor(private app: App, public config: Config) { }

  public create(opts: DatetimePickerAlertOptions = {}): DatetimePickerAlert {
    return new DatetimePickerAlert(this.app, opts, this.config);
  }

}
