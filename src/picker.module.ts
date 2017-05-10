import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { DatetimePickerAlertComponent } from "./alert.component";
import { DatetimePickerAlertController } from "./alert.controller";
import { DatetimePickerComponent } from "./picker.component";
import { DatetimePickerDirective } from "./picker.directive";

@NgModule({
  declarations: [
    DatetimePickerAlertComponent,
    DatetimePickerComponent,
    DatetimePickerDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  entryComponents: [
    DatetimePickerAlertComponent,
  ],
  providers: [
    DatetimePickerAlertController,
  ],
  exports: [
    DatetimePickerDirective,
  ],
})
export class DatetimePickerModule {}
