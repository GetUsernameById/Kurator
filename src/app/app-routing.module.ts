import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TableComponent } from './components/tableComponents/table/table.component';
import { PlacesTableComponent } from './components/tableComponents/places-table/places-table.component';
import { ChecklistTableComponent } from './components/tableComponents/checklist-table/checklist-table.component';
import { QuestionsTableComponent } from './components/tableComponents/questions-table/questions-table.component';
import { DepartmentsTableComponent } from './components/tableComponents/departments-table/departments-table.component';
import { EventTypesTableComponent } from './components/tableComponents/event-types-table/event-types-table.component';
import { EventsTableComponent } from './components/tableComponents/events-table/events-table.component';
import { PlacesSuperTableComponent } from './components/tableComponents/places-super-table/places-super-table.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AnswersTableComponent } from './components/tableComponents/answers-table/answers-table.component';
import { ETQuestionsTableComponent } from './components/tableComponents/et-questions-table/et-questions-table.component';
import { DownloadComponent } from './components/download/download.component';


const routes: Routes = [
  { path: '', component: PlacesTableComponent, data : {state: 'stores'}},
  { path: 'calendar', component: CalendarComponent, data : {state: 'stores'}, children: [{
    path: 'download', component: DownloadComponent,
  }]},
  { path: 'stores', component: PlacesTableComponent, data : {state: 'stores'}},
  { path: 'superstores', component: PlacesSuperTableComponent, data : {state: 'superstores'}},
  { path: 'check-list', component: ChecklistTableComponent, data : {state: 'check-list'}},
  { path: 'departments', component: DepartmentsTableComponent, data : {state: 'departments'}},
  { path: 'answers', component: AnswersTableComponent, data : {state: 'answers'}},
  { path: 'departments/:id/event-types', component: EventTypesTableComponent, data : {state: 'event-types'}},
  { path: 'event-types', component: EventTypesTableComponent, data : {state: 'event-types'}},
  { path: 'event-types/:id/events', component: EventsTableComponent, data : {state: 'event-types-id'}},
  { path: 'events', component: EventsTableComponent, data : {state: 'event-types-id'}},
  { path: 'event-types/:id/questions', component: ETQuestionsTableComponent, data : {state: 'check-list-id'}},
  { path: 'questions', component: QuestionsTableComponent, data : {state: 'check-list'}},
  { path: 'download', component: DownloadComponent, data : {state: 'download'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
