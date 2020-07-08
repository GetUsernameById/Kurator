import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../../form/form.component';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public data = [
    {id: 0, name: 'Dakota Rice', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738'},
    {id: 1, name: 'Minerva Hooper', country: 'Curaçao', city: 'Sinaai-Waas', salary: '$23,789'},
    {id: 2, name: 'Sage Rodriguez', country: 'Netherlands', city: 'Baileux', salary: '$56,142'},
    {id: 3, name: 'Dakota Rice', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738'},
    {id: 4, name: 'Minerva Hooper', country: 'Curaçao', city: 'Sinaai-Waas', salary: '$23,789'},
    {id: 5, name: 'Sage Rodriguez', country: 'Netherlands', city: 'Baileux', salary: '$56,142'},
    {id: 6, name: 'Dakota Rice', country: 'Niger', city: 'Oud-Turnhout', salary: '$36,738'},
  ];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openFormDialog(): void{
    const dialogRef = this.dialog.open(FormComponent, {
      // width: '540px',
      // data: {socketId: this.cashbox.socketId}
    });
  }

  deleteRow(id): void{
    this.data = this.data.filter(row => row.id !== id);
  }
}
