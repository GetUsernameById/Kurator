import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { IQuestionPool, IQuestionSet, IEventType } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';
import { Observable, merge, of } from 'rxjs';
import { CheckListAddFormComponent } from '../check-list-add-form/check-list-add-form.component';
import { RankAddFormComponent } from '../rank-add-form/rank-add-form.component';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-edit-form.component.html',
  styleUrls: ['./question-edit-form.component.scss', '../form.component.scss']
})
export class QuestionEditFormComponent implements OnInit {
  eventTypes$: Observable<object>;
  questionBlocks$: Observable<object>;
  ranks$: Observable<object>;
  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestionPool,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionEditFormComponent>,
    private appService: AppService,
  ){}

  ngOnInit(): void {
    this.eventTypes$ = this.appService.getEventTypes();
    this.questionBlocks$ = this.appService.getQuestionsBlocks();
    this.ranks$ = this.appService.getRanks();

    const eventTypeIds = [];
    this.data.questionSets.forEach((set: IQuestionSet) => {
      eventTypeIds.push(set.eventTypeId);
    });

    console.log(this.data);

    this.form = new FormGroup({
      text : new FormControl(this.data.text, Validators.required),
      action : new FormControl(this.data.action, Validators.required),
      minScore : new FormControl(this.data.minScore, [Validators.pattern('[0-9]*'), Validators.required]),
      maxScore : new FormControl(this.data.maxScore, [Validators.pattern('[0-9]*'), Validators.required]),
      passScore : new FormControl(this.data.passScore, [Validators.pattern('[0-9]*'), Validators.required]),
      rankId : new FormControl(this.data.rankId, Validators.required),
      blockId : new FormControl(this.data.blockId, Validators.required),
      isActive : new FormControl(this.data.isActive, Validators.required),
      id : new FormControl(this.data.id, Validators.required),
      eventTypeIds : new FormControl(eventTypeIds, Validators.required),
    });
  }


  submit(){
    const questionSets: IQuestionSet[] = [];
    this.form.value.eventTypeIds.forEach(id => {
      questionSets.push({eventTypeId : id, questionPoolId: this.form.value.id, isActive: true});
    });

    delete this.form.value.eventTypeIds;
    const result = {...this.form.value, questionSets};

    this.appService.editQuestion(result).subscribe(question => {
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

}
