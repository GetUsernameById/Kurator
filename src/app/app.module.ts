import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';



import { TableComponent } from './components/tableComponents/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { FormComponent } from './components/form/form.component';
import { ShopsTableComponent } from './components/tableComponents/shops-table/shops-table.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TableComponent,
    HomeComponent,
    NavbarTopComponent,
    FormComponent,
    ShopsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
