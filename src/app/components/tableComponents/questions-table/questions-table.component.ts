import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestionAddFormComponent } from '../../formComponents/question-add-form/question-add-form.component';
import { QuestionEditFormComponent } from '../../formComponents/question-edit-form/question-edit-form.component';
import { IQuestionPool, IQuestionStack, IQuestionResponse } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.scss', '../table.component.scss']
})
export class QuestionsTableComponent implements OnInit, AfterViewInit {
  public id: string;
  public data: IQuestionPool[];
  public sortedData: IQuestionPool[];

   // MatPaginator Inputs
  public totalCount: number;
  public pageSize = 5;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

   // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.appService.getQuestions(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe((data: IQuestionResponse) => {
        console.log(data);
        this.data = data.items;
        this.totalCount = data.totalCount;
      });
  }


  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(QuestionAddFormComponent, {
      data: this.id
    });
    dialogRef.afterClosed().subscribe((result: IQuestionPool) => {
      if (result){
         this.addRow(result);
      }
    });
  }

  openEditFormDialog(item): void{
    const dialogRef = this.dialog.open(QuestionEditFormComponent, {
      // width: '540px',
      data: item
    });

    dialogRef.afterClosed().subscribe((result: IQuestionStack) => {
      if (result){ this.editRow(result); }
    });
  }

  deleteRow(id): void{
    this.appService.deleteQuestion(id).subscribe(res => {
      this.data = this.data.filter(row => row.id !== id);
      this.totalCount -= 1;
    });
  }
  addRow(item: IQuestionPool): void{
    console.log(item);
    this.data.push(item);
    this.totalCount += 1;
  }

  editRow(data): void{
    this.data = this.data.map((row)  => {
      if (row.id === data.id) { return data; }
      return row;
    });
  }
}
