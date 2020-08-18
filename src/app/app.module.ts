import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxGalleryModule } from 'ngx-gallery-9';

/*Calenadar*/
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './components/calendar/calendar.component';
// import { PopoverComponent } from './components/calendar/popup/popover/popover.component'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

import { TableComponent } from './components/tableComponents/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { FormComponent } from './components/formComponents/form/form.component';
import { PlacesTableComponent } from './components/tableComponents/places-table/places-table.component';
import { ChecklistTableComponent } from './components/tableComponents/checklist-table/checklist-table.component';
import { DepartmentsTableComponent } from './components/tableComponents/departments-table/departments-table.component';
import { QuestionsTableComponent } from './components/tableComponents/questions-table/questions-table.component';
import { EventsTableComponent } from './components/tableComponents/events-table/events-table.component';
import { PlaceFormEditComponent } from './components/formComponents/place-form-edit/place-form-edit.component';
import { PlaceFormAddComponent } from './components/formComponents/place-form-add/place-form-add.component';
import { DepartmentAddFormComponent } from './components/formComponents/department-add-form/department-add-form.component';
import { DepartmentEditFormComponent } from './components/formComponents/department-edit-form/department-edit-form.component';
import { EventTypesTableComponent } from './components/tableComponents/event-types-table/event-types-table.component';
import { EventTypesAddFormComponent } from './components/formComponents/event-types-add-form/event-types-add-form.component';
import { EventTypesEditFormComponent } from './components/formComponents/event-types-edit-form/event-types-edit-form.component';
import { EventFormComponent } from './components/formComponents/event-form/event-form.component';
import { CheckListAddFormComponent } from './components/formComponents/check-list-add-form/check-list-add-form.component';
import { CheckListEditFormComponent } from './components/formComponents/check-list-edit-form/check-list-edit-form.component';
import { QuestionEditFormComponent } from './components/formComponents/question-edit-form/question-edit-form.component';
import { QuestionAddFormComponent } from './components/formComponents/question-add-form/question-add-form.component';
import { PlacesSuperTableComponent } from './components/tableComponents/places-super-table/places-super-table.component';
import { AnswersTableComponent } from './components/tableComponents/answers-table/answers-table.component';
import { ETQuestionsTableComponent } from './components/tableComponents/et-questions-table/et-questions-table.component';
import { RankAddFormComponent } from './components/formComponents/rank-add-form/rank-add-form.component';
import { PlaceGroupAddFormComponent } from './components/formComponents/place-group-add-form/place-group-add-form.component';
import { AnswerFormComponent } from './components/formComponents/answer-form/answer-form.component';
import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TableComponent,
    HomeComponent,
    NavbarTopComponent,
    FormComponent,
    PlacesTableComponent,
    PlacesSuperTableComponent,
    ChecklistTableComponent,
    QuestionsTableComponent,
    ETQuestionsTableComponent,
    DepartmentsTableComponent,
    EventTypesTableComponent,
    EventsTableComponent,
    PlaceFormEditComponent,
    PlaceFormAddComponent,
    CheckListAddFormComponent,
    CheckListEditFormComponent,
    QuestionAddFormComponent,
    QuestionEditFormComponent,
    DepartmentAddFormComponent,
    DepartmentEditFormComponent,
    EventTypesAddFormComponent,
    EventTypesEditFormComponent,
    PlaceGroupAddFormComponent,
    AnswerFormComponent,
    RankAddFormComponent,
    EventFormComponent,
    CalendarComponent,
    AnswersTableComponent,
    DownloadComponent,
    // PopoverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    FullCalendarModule,
    TooltipModule,
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
