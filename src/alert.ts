// Using my own implementation of Alert-related stuff until https://github.com/driftyco/ionic/pull/11458 is merged

import { EventEmitter, Output } from "@angular/core";
import { App, Config, NavOptions, ViewController } from "ionic-angular";
import { AlertMdPopIn, AlertMdPopOut, AlertPopIn, AlertPopOut, AlertWpPopIn, AlertWpPopOut } from "ionic-angular/components/alert/alert-transitions";
import { isPresent } from "ionic-angular/util/util";

import { DatetimePickerAlertComponent } from "./alert.component";
import { DatetimePickerAlertOptions } from "./alert.options";

export class DatetimePickerAlert extends ViewController {
  public data: DatetimePickerAlertOptions;
  @Output() public ionChange: EventEmitter<void>;

  private app: App;

  constructor(app: App, opts: DatetimePickerAlertOptions = {}, config: Config) {
    opts.inputs = opts.inputs || [];
    opts.buttons = opts.buttons || [];
    opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

    super(DatetimePickerAlertComponent, opts, null);
    this.app = app;
    this.isOverlay = true;

    config.setTransition("alert-pop-in", AlertPopIn);
    config.setTransition("alert-pop-out", AlertPopOut);
    config.setTransition("alert-md-pop-in", AlertMdPopIn);
    config.setTransition("alert-md-pop-out", AlertMdPopOut);
    config.setTransition("alert-wp-pop-in", AlertWpPopIn);
    config.setTransition("alert-wp-pop-out", AlertWpPopOut);

    this.ionChange = new EventEmitter<void>();
  }

  public getTransitionName(direction: string): string {
    let key = (direction === "back" ? "alertLeave" : "alertEnter");
    return this._nav && this._nav.config.get(key);
  }

  public setTitle(title: string): this {
    this.data.title = title;
    return this;
  }

  public setSubTitle(subTitle: string): this {
    this.data.subTitle = subTitle;
    return this;
  }

  public addButton(button: DatetimePickerAlertOptions["buttons"][0]): this {
    this.data.buttons.push(button);
    return this;
  }

  public setCssClass(cssClass: string): this {
    this.data.cssClass = cssClass;
    return this;
  }

  public setMode(mode: string) {
    this.data.mode = mode;
  }

  public present(navOptions: NavOptions = {}): Promise<any> {
    navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
    return this.app.present(this, navOptions);
  }

  public refresh() {
    console.assert(!!this._cmp, "componentRef must be valid");
    console.assert(!!this._cmp.instance.refresh, "instance must implement refresh()");

    if (this._cmp && this._cmp.instance.refresh) {
      this._cmp.instance.refresh();
    }
  }
}
