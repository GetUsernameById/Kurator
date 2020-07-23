import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import { EventFormComponent } from '../../formComponents/event-form/event-form.component';

@Component({
  selector: 'app-questions-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss', '../table.component.scss']
})
export class EventsTableComponent implements OnInit {
  id: string;
  public data: IEvent[];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private appService: AppService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.appService.getEvents(this.id).subscribe((events: IEvent[]) => {
        this.data = events;
      });
    });
  }

  openFormDialog(item): void{
    const dialogRef = this.dialog.open(EventFormComponent, {
      // width: '540px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){ this.editRow(result); }
    });
  }

  deleteRow(id): void{
    this.data = this.data.filter(row => row.id !== id);
  }

  editRow(data): void{
    this.data = this.data.map((row)  => {
      if (row.id === data.id) { return data; }
      return row;
    });
  }
}
