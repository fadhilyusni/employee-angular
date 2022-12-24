import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;
    args = args.toLowerCase();
    return value.fliter(function (data: any) {
      return JSON.stringify(data).toLocaleLowerCase().includes(args);
    });
  }
}
