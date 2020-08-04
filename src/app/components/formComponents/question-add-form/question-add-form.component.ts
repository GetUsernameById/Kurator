import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IQuestionPool, IEventType, IQuestionStack, IQuestionBlock, IQuestionSet } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Observable, of, merge, from } from 'rxjs';
import { CheckListAddFormComponent } from '../check-list-add-form/check-list-add-form.component';
import { map } from 'rxjs/operators';
import { RankAddFormComponent } from '../rank-add-form/rank-add-form.component';

@Component({
  selector: 'app-question-add-form',
  templateUrl: './question-add-form.component.html',
  styleUrls: ['./question-add-form.component.scss', '../form.component.scss']
})
export class QuestionAddFormComponent implements OnInit{
  eventTypes$: Observable<object>;
  questionBlocks$: Observable<object>;
  ranks$: Observable<object>;
  public form: FormGroup;
  // public storeForm = new Form();

  @ViewChild('selectEventType') selectEventType: MatSelect;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestionPool,
    public dialogRef: MatDialogRef<QuestionAddFormComponent>,
    private appService: AppService,
    public dialog: MatDialog,
  ){
    this.form = new FormGroup({
      text : new FormControl('', Validators.required),
      action : new FormControl('', Validators.required),
      minScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      maxScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      passScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      rankId : new FormControl('', Validators.required),
      blockId : new FormControl('', Validators.required),
      eventTypeIds : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.eventTypes$ = this.appService.getEventTypes();
    this.questionBlocks$ = this.appService.getQuestionsBlocks();
    this.ranks$ = this.appService.getRanks();
  }

  submit(): void{
    const questionSets: IQuestionSet[] = [];
    this.form.value.eventTypeIds.forEach(id => {
      questionSets.push({eventTypeId : id, questionPoolId: this.form.value.id, isActive: true});
    });

    delete this.form.value.eventTypeIds;
    const result = {...this.form.value, questionSets};

    this.appService.addQuestion(result).subscribe(question => {
      this.dialogRef.close(question);
    });
  }

  openAddQuestionFormDialog(): void{
    const dialogRef = this.dialog.open(CheckListAddFormComponent, {
    });
    dialogRef.afterClosed().subscribe((result: IQuestionSet) => {
      if (result){
         this.questionBlocks$ = merge(this.questionBlocks$, of(result));
      }
    });
  }
  openAddRankFormDialog(): void{
    const dialogRef = this.dialog.open(RankAddFormComponent, {
    });
    dialogRef.afterClosed().subscribe((result: IQuestionSet) => {
      if (result){
         this.ranks$ = merge(this.ranks$, of(result));
      }
    });
  }


  // selected(event: MatSelectChange): void {
  //   console.log(event.source.selected);
  //   const item = {name: event.value};
  //   this.fruits.push(item);
  //   this.selectEventType.open();
  // }

}
