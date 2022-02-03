import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter((x:any) => {
      return JSON.stringify(x).toLowerCase().includes(args);
    });
  }

}
@NgModule({
  declarations: [
    FilterPipe,
  ],
  imports: [
  ],
  providers: [FilterPipe],
  bootstrap: [],
  exports: [FilterPipe]
})
export class SearchFilterPipeModule { }

