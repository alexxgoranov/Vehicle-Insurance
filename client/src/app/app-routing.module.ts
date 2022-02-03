import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'insurances',
    loadChildren: () => import('./insurances/insurances.module').then(m => m.InsurancesModule)
  },
  {
    path : 'events',
    loadChildren: () => import('./insurance-events/insurance-events.module').then(m => m.InsuranceEventsModule)
  },
  {
    path : 'events/:vehicleId',
    loadChildren: () => import('./insurance-events/insurance-events.module').then(m => m.InsuranceEventsModule)
  },
  { path: '', redirectTo: 'insurances', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
