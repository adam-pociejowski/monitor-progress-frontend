import {Injectable} from '@angular/core';
import {ReducedResult} from "../model/reduced.stats.model";
import {GroupType} from "../model/group.type.enum";
import {DocumentStats} from "../model/document.stats.model";

@Injectable({
  providedIn: 'root',
})
export class ReducedResultService {

  static mapToDateString = (reducedResult: ReducedResult<any>, dateFormat: string) => {
    let year = reducedResult.groupMap.get(GroupType.YEAR);
    let month = reducedResult.groupMap.get(GroupType.MONTH);
    let day = reducedResult.groupMap.get(GroupType.DAY);
    let dateString = dateFormat.replace("MM", +month > 10 ? month : `0${month}`);
    if (dateFormat.includes('YYYY')) {
      dateString = dateString.replace("YYYY", year);
    } else {
      dateString = dateString.replace("YY", (+year - 2000)+'');
    }
    return dateString.replace("dd", +day > 10 ? day : `0${day}`);
  }

  static findByKeys = (results: ReducedResult<DocumentStats>[], map: Map<GroupType, string>) => {
    let matchedResults: ReducedResult<DocumentStats>[] = [];
    for (let result of results) {
      let matchedKeys = 0;
      for (let key of map.keys()) {
        if (result.groupMap.get(key) === map.get(key))  matchedKeys++;
        else break;
      }
      if (matchedKeys === map.size) {
        matchedResults.push(result);
      }
    }
    return matchedResults;
  }

  static mapToReducedResults = (response: any, config: GroupType[]) =>
    Object
      .entries(response)
      .map(([key, value]) => {
        return new ReducedResult<DocumentStats>(
          ReducedResultService.prepareGroupMap(config, key),
          new DocumentStats(
            value['sum'],
            value['count'],
            value['min'],
            value['max'],
            value['sumsqr']))
      })

  private static prepareGroupMap = (configuration: GroupType[], groupsString): Map<GroupType, string> => {
    let map = new Map<GroupType, any>();
    groupsString
      .split(',')
      .forEach((value: string, index: number) => {
        map.set(configuration[index], value);
      })
    return map;
  };
}
