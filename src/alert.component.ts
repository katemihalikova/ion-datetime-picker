// Using my own implementation of Alert-related stuff until https://github.com/driftyco/ionic/pull/11458 is merged

import { Component, ElementRef, Renderer, ViewEncapsulation } from "@angular/core";
import { AlertCmp, Config, GestureController, NavParams, Platform, ViewController } from "ionic-angular";

import { DatetimePickerAlertOptions } from "./alert.options";

@Component({
  selector: "ion-alert",
  template: `
    <ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>
    <div class="alert-wrapper ion-datetime-picker-wrapper">
      <div class="alert-head">
        <h2 id="{{hdrId}}" class="alert-title" *ngIf="d.title" [innerHTML]="d.title"></h2>
        <h3 id="{{subHdrId}}" class="alert-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>
      </div>
      <ion-datetime-picker [modelDate]="d.modelDate" [dateEnabled]="d.dateEnabled" [timeEnabled]="d.timeEnabled" [isMondayFirst]="d.isMondayFirst" [secondsEnabled]="d.secondsEnabled" [meridiemEnabled]="d.meridiemEnabled" [onlyValid]="d.onlyValid" [monthNames]="d.monthNames" [weekdayNames]="d.weekdayNames" (pickerChange)="onChange($event)"></ion-datetime-picker>
      <div class="alert-button-group" [ngClass]="{'alert-button-group-vertical':d.buttons.length>2}">
        <button ion-button="alert-button" *ngFor="let b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass">
          {{b.text}}
        </button>
      </div>
    </div>
  `,
  styles: [".alert-button-group {flex-shrink: 0;}"],
  host: {
    "role": "dialog",
    "[attr.aria-labelledby]": "hdrId",
    "class": "ion-datetime-picker-alert",
  },
  encapsulation: ViewEncapsulation.Emulated,
})
export class DatetimePickerAlertComponent extends AlertCmp {
  public d: DatetimePickerAlertOptions;

  constructor(
    viewController: ViewController,
    elementRef: ElementRef,
    config: Config,
    gestureCtrl: GestureController,
    params: NavParams,
    renderer: Renderer,
    platform: Platform,
  ) {
    super(viewController, elementRef, config, gestureCtrl, params, renderer, platform);
  }

  public onChange(modelDate: Date) {
    this.d.modelDate = modelDate;
  }

  public getValues(): any {
    if (!this.d.modelDate) {
      return {};
    }
    return {
      year: {value: this.d.dateEnabled ? this.d.modelDate.getFullYear() : null},
      month: {value: this.d.dateEnabled ? this.d.modelDate.getMonth() + 1 : null},
      day: {value: this.d.dateEnabled ? this.d.modelDate.getDate() : null},
      hour: {value: this.d.timeEnabled ? this.d.modelDate.getHours() : null},
      minute: {value: this.d.timeEnabled ? this.d.modelDate.getMinutes() : null},
      second: {value: this.d.timeEnabled && this.d.secondsEnabled ? this.d.modelDate.getSeconds() : null},
      millisecond: {value: null},
      tzOffset: {value: null},
    };
  }
}
