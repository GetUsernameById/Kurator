import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEventType } from '../../../app.models';
import { AppService } from '../../../services/app.service';

import { DepartmentEditFormComponent } from '../../formComponents/department-edit-form/department-edit-form.component';
import { EventTypesAddFormComponent } from '../../formComponents/event-types-add-form/event-types-add-form.component';
import { EventTypesEditFormComponent } from '../../formComponents/event-types-edit-form/event-types-edit-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './event-types-table.component.html',
  styleUrls: ['./event-types-table.component.scss', '../table.component.scss']
})
export class EventTypesTableComponent implements OnInit {

  public eventTypes: IEventType[];
  public id: string;

  constructor(public dialog: MatDialog, public appService: AppService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.appService.getEventTypes(this.id).subscribe((eventTypes: IEventType[]) => {
        this.eventTypes = eventTypes;
      });
    });
  }

  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(EventTypesAddFormComponent, {
      // width: '540px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.addRow(result); }
    });
  }

  openEditFormDialog(eventType): void{
    const dialogRef = this.dialog.open(EventTypesEditFormComponent, {
      data: eventType
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) { this.editRow(result); }
    });
  }



  deleteRow(id): void{
    console.log(id);

    this.appService.deleteEventType(id).subscribe( eventType => {
        this.eventTypes = this.eventTypes.filter(row => row.id !== id);
      }
    );
  }

  addRow(department): void{
    this.eventTypes.push(department);
  }

  editRow(data): void{
    this.eventTypes = this.eventTypes.map((row)  => {
      if (row.id === data.id) { return data; }
      return row;
    });
  }

}
