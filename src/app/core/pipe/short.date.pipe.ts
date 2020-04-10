import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(isoDate: string): any {
    let date = new Date(Date.parse(isoDate));
    let result = date.getDate() < 10 ?
      '0' + date.getDate() :
      date.getDate()+'';
    let month = date.getMonth() + 1;
    result = month < 10 ?
      result + '/0' +month :
      result + '/' + month;
    return result + '/' + (date.getFullYear()-2000);
  }
}
