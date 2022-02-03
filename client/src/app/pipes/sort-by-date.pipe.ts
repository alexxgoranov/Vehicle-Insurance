import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(value: any, typeOfSort: string, fieldName: string): any {
    switch (typeOfSort) {
      case 'ascending':
        return [...value.sort(function (a: any, b: any) {
          return new Date(a[fieldName]).getTime() - new Date(b[fieldName]).getTime();
        })];
      case 'descending':
        return [...value.sort(function (a: any, b: any) {
          return new Date(b[fieldName]).getTime() - new Date(a[fieldName]).getTime();
        })];
      default:
        return value;
    }


  }

}
@NgModule({
  declarations: [
    SortByDatePipe,
  ],
  imports: [
  ],
  providers: [SortByDatePipe],
  bootstrap: [],
  exports: [SortByDatePipe]
})
export class SortByDatePipePipeModule { }
