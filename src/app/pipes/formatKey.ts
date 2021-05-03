import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'formatKey' })
export class FormatKey implements PipeTransform {
  transform(value: string) {
    let val = value.split(/(?=[A-Z])/).join(' ')
    return val.charAt(0).toUpperCase() + val.slice(1);
  }
}