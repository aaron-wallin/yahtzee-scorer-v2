import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keyValue'})
export class KeyValuePipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key in value) {
      keys.push({key: key, value: value[key]});
    }

    return keys;
  }
}
