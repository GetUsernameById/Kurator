import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestion } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-question-add-form',
  templateUrl: './question-add-form.component.html',
  styleUrls: ['./question-add-form.component.scss', '../form.component.scss']
})
export class QuestionAddFormComponent implements OnInit {
  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestion,
    public dialogRef: MatDialogRef<QuestionAddFormComponent>,
    private appService: AppService,
  ){
    this.form = new FormGroup({
      text : new FormControl('', Validators.required),
      action : new FormControl('', Validators.required),
      minScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      maxScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      passScore : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      rankId : new FormControl('', Validators.required),
      blockId : new FormControl(this.data, Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.addQuestion(this.form.value).subscribe(question => {
      this.dialogRef.close(question);
    });
  }

}
