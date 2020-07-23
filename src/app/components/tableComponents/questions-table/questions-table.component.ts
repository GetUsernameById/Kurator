import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestionAddFormComponent } from '../../formComponents/question-add-form/question-add-form.component';
import { QuestionEditFormComponent } from '../../formComponents/question-edit-form/question-edit-form.component';
import { IQuestion } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss', '../table.component.scss']
})
export class QuestionsTableComponent implements OnInit {
  id: string;
  public data: IQuestion[];
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.appService.getQuestions(this.id).subscribe((questions: IQuestion[]) => {
        this.data = questions;
      });
    });
  }

  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(QuestionAddFormComponent, {
      data: this.id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){ this.addRow(result); }
    });
  }

  openEditFormDialog(item): void{
    const dialogRef = this.dialog.open(QuestionEditFormComponent, {
      // width: '540px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){ this.editRow(result); }
    });
  }

  deleteRow(id): void{
    this.appService.deleteQuestion(id).subscribe(res => {
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
