# ion-datetime-picker
![npm version](https://img.shields.io/npm/v/ion-datetime-picker/ionic3.svg?style=flat-square)
![Ionic version](https://img.shields.io/badge/ionic-3.0.1%20%7C%7C%203.1.0%20%7C%7C%203.1.1-yellow.svg?style=flat-square)
![License](https://img.shields.io/github/license/katemihalikova/ion-datetime-picker.svg?style=flat-square)

> Date and/or time picker for awesome [Ionic framework](https://ionicframework.com/) v3

# Introduction

I made this component because of poor implementation of native datetime picker in Android webview. How funny it was when I discovered that I can only pick a time between 0:00 and 11:59 on my 24-hour clock phone :)

*Looking for a [picker](https://github.com/katemihalikova/ion-datetime-picker) that works with Ionic framework v1?*

# Features

The ion-datetime-picker component has these features:
- Make Date picker, Time picker, Datetime picker
- Choose Sunday or Monday as the first day of the week
- Use 12-hour or 24-hour clock
- Pick time with or without seconds
- Configure popup title and button labels
- Configure i18n to get weekdays and months in your language

<!--
# Demo

Demo app is available - enter code `8d75a0ec` into [Ionic View](http://view.ionic.io/).
Live demo is available on [Codepen](http://codepen.io/katemihalikova/full/dYvjzP/).

# Screenshots

<img src="/../screenshots/date.png?raw=true" alt="Date picker" width="239">
<img src="/../screenshots/time.png?raw=true" alt="Time picker" width="239">
<img src="/../screenshots/datetime.png?raw=true" alt="Datetime picker" width="239">
-->

# Installation

1. Use npm to install the new module:

    ```bash
    npm install ion-datetime-picker@ionic3 --save
    ```

2. Import the `DatetimePickerModule` into your project:

    ```typescript
    import { DatetimePickerModule } from 'ion-datetime-picker';

    @NgModule({
      ...
      imports: [
        DatetimePickerModule,
        ...
      ],
      ...
    })
    export class AppModule {}
    
    ```

# Usage

Add `picker` attribute to your `ion-datetime` elements:

```html
<ion-list>
  <ion-item>
    <ion-label>{{datetimeValue | date: "yyyy-MM-dd H:mm:ss"}}</ion-label>
    <ion-datetime picker [(ngModel)]="datetimeValue"></ion-datetime>
  </ion-item>
</ion-list>
```

## Configuration attributes

### `date` and `time` attributes

Choose which picker type is used. When neither is set, I assume both and use the datetime picker.

*@TODO Use `pickerFormat` instead.*

### `mondayFirst` attribute

Set this if you want to have Monday as the first day of a week.

### `seconds` attribute

By default, in the time picker, I allow to change only hours and minutes. Set this attribute to use also seconds.

*@TODO Use `pickerFormat` instead.*

### `amPm` attribute

By default, in the time picker, I use 24-hour clock. Set this attribute to change it to 12-hour clock.

*@TODO Use `pickerFormat` instead.*

### `title` and `subTitle` attributes

Configure the title and sub title of the popup with the picker.

### `only-valid` attribute

Disable/Enable calendar days according to type and date range specified.

```html
only-valid="{'after': '2016-04-09'}"
only-valid="{'after': 'today', 'inclusive': true}"
only-valid="{'outside': {'initial': '2016-04-09', 'final': '2016-06-15'}, 'inclusive': true}"
```

Types supported: `'after'`, `'before'`, `'between'` and `'outside'`. If you want to include the day specified, set `'inclusive'` property to `true`.

To combine rules, just pass an array and it should do the trick. Rules are complementary (treated with AND, not OR), it means that a date will be available only if it matches all the constraints you pass.

```html
only-valid="[{'after': '2017-01-12'}, {'outside': {'initial': '2017-01-19', 'final': '2017-01-29'}}, {'outside': {'initial': '2017-02-19', 'final': '2017-02-29'}}]"
```

*@TODO Support also `min` and `max` attributes.*

### Other supported attributes [inherited from `ion-datetime`](https://ionicframework.com/docs/api/components/datetime/DateTime/#input-properties)

- `displayFormat` and `placeholder`
- `cancelText` and `doneText`
- `monthNames` and `dayShortNames`

## Daylight saving time

The datetime picker is using `Date` object with your browser's timezone, including any DST. When you change the date, hour, minute, or second, which sets the time to an invalid value because of moving from 2:00 to 3:00 (or similar) at the beginning of DST, the time is automatically adjusted to a valid value. On the other hand, when the DST ends, I do NOT take the inserted hour into consideration, but this may be fixed in the future.
