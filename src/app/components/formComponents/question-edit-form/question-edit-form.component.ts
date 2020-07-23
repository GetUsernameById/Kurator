import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestion } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-edit-form.component.html',
  styleUrls: ['./question-edit-form.component.scss', '../form.component.scss']
})
export class QuestionEditFormComponent implements OnInit {
  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestion,
    public dialogRef: MatDialogRef<QuestionEditFormComponent>,
    private appService: AppService,
  ){
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
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.editQuestion(this.form.value).subscribe(question => {
      this.dialogRef.close(question);
    });
  }

}
