import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullWithDefault'
})
export class NullWithDefaultPipe implements PipeTransform {

  transform(value: any, defaultText: string = 'N/A'): any {
    if (typeof value === "undefined" || value===null) {
      return defaultText; 
    }
    return value;
  }

}
