import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuestionAddFormComponent } from '../../formComponents/question-add-form/question-add-form.component';
import { QuestionEditFormComponent } from '../../formComponents/question-edit-form/question-edit-form.component';
import { IQuestionPool, IQuestionStack } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import { AnswerFormComponent } from '../../formComponents/answer-form/answer-form.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-et-questions-table',
  templateUrl: './et-questions-table.component.html',
  styleUrls: ['./et-questions-table.component.scss', '../table.component.scss']
})
export class ETQuestionsTableComponent implements OnInit {
  eventId: string;
  public data: IQuestionPool[];
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      this.appService.getQuestionSets(this.eventId).subscribe((questions: IQuestionPool[]) => {
        this.data = questions;
        console.log(questions);
      });
    });
  }

  deleteRow(id): void{
    this.appService.deleteQuestionSet(id).subscribe(res => {
      this.data = this.data.filter(row => row.id !== id);
    });
  }

  openAnswerDialog(id): void{
    this.appService.getAnswerByQuestionSetId(id).pipe(
      map(data => {
        if (data === null || data === undefined){
          return {
            id : 0,
            setId : id,
            eventId : 0,
            score : 0,
            timestamp : new Date(),
          };
        }
        return data;
      }),
    ).subscribe(res => {
      const dialogRef = this.dialog.open(AnswerFormComponent, {
        // width: '540px',
        data: {type : 'questionSet', payload : res}
      });
    });
    // dialogRef.afterClosed().subscribe((result: IQuestionStack) => {
    //   if (result){ this.editRow(result); }
    // });
  }


}
