import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCardLoaderComponent } from '../app-card-loader/app-card-loader.component';



@NgModule({
  declarations: [AppCardLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [AppCardLoaderComponent]
})
export class ComponentsModule { }
