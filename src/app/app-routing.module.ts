import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './components/tableComponents/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';


const routes: Routes = [
  { path: '', component: TableComponent},
  { path: 'table', component: TableComponent},
  { path: 'form', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
