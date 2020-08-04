import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IAnswer } from 'src/app/app.models';

@Component({
  selector: 'app-place-group-add-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss', '../form.component.scss']
})
export class AnswerFormComponent implements OnInit {
  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AnswerFormComponent>,
    public appService: AppService,
  ){}

  ngOnInit(): void {
    this.form = new FormGroup({
      id : new FormControl(this.data.payload.id),
      setId : new FormControl(this.data.payload.setId),
      eventId : new FormControl(this.data.payload.eventId),
      score : new FormControl(this.data.payload.score, Validators.required),
      timestamp : new FormControl(this.data.payload.timestamp),
    });
  }


  submit(){
    switch (this.data.type) {
      case 'questionSet': {
        this.appService.editAnswerByQustion(this.form.value).subscribe(block => {
          this.dialogRef.close(block);
        });
        break;
      }
      case 'event': {
        this.appService.editAnswerByEvent(this.form.value).subscribe(block => {
          this.dialogRef.close(block);
        });
        break;
      }
   }
  }

}
