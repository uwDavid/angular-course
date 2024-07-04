import { input, Pipe, PipeTransform } from '@angular/core';

// 2 - decorate it as @pipe
@Pipe({
  name: 'temp',
  standalone: true,
  pure: false, // disable value caching => re-execute transform() on value changes
})
// 1- export it as a class
export class TemperaturePipe implements PipeTransform {
  // 3 - must have a transform()
  // automatically executed by Angular to transform values
  // implement PipeTransform
  // transform() must return value to be rendered

  // transform(value: any, ...args: any[]) {

  // we change the signature to fit our input values
  // transform(value: string | number) {
  //   let val: number;

  //   if (typeof value === 'string') {
  //     val = parseFloat(value);
  //   } else {
  //     val = value;
  //   }

  //   // assume that we convert C to F
  //   const outputTemp = val * (9 / 5) + 32;
  //   return `${outputTemp} F`;
  // }

  // Additional args
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    // note- number pipe returns a string or null => we have to add null to value:
    if (!value) {
      return value;
    }
    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }

    let symbol: 'C' | 'F';
    if (!outputType) {
      // if outputType is null => use inputType
      symbol = inputType === 'cel' ? 'C' : 'F';
    } else {
      symbol = outputType === 'cel' ? 'C' : 'F';
    }

    // render
    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
