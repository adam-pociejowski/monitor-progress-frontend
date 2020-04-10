import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(isoDate: string): any {
    let date = new Date(Date.parse(isoDate));
    let result = date.getDay() < 10 ?
      '0' + date.getDay() :
      date.getDay()+'';
    result = date.getMonth() < 10 ?
      result + '/0' + date.getMonth() :
      result + '/' + date.getMonth();
    return result + '/' + (date.getFullYear()-2000);
  }
}
