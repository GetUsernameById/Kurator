import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CheckListAddFormComponent } from '../../formComponents/check-list-add-form/check-list-add-form.component';
import { IQuestionBlock } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import { CheckListEditFormComponent } from '../../formComponents/check-list-edit-form/check-list-edit-form.component';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.scss', '../table.component.scss']
})
export class ChecklistTableComponent implements OnInit {

  public data: IQuestionBlock[];
  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
    this.appService.getQuestionsBlocks().subscribe((blocks: IQuestionBlock[]) => {
      this.data = blocks;
    });
  }

  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(CheckListAddFormComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.addRow(result); }
    });
  }

  openEditFormDialog(item): void{
    const dialogRef = this.dialog.open(CheckListEditFormComponent, {
      // width: '540px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.editRow(result); }
    });
  }

  deleteRow(id): void{
    this.appService.deleteQuestionBlock(id).subscribe( block => {
      console.log(block);
      this.data = this.data.filter(row => row.id !== id);
    });
  }

  addRow(item): void{
    this.data.push(item);
  }

  editRow(data): void{
    this.data = this.data.map((row)  => {
      if (row.id === data.id) { return data; }
      return row;
    });
  }

}
