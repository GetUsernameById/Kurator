import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestionBlock } from 'src/app/app.models';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './check-list-edit-form.component.html',
  styleUrls: ['./check-list-edit-form.component.scss', '../form.component.scss']
})
export class CheckListEditFormComponent implements OnInit {

  public checkListForm: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IQuestionBlock,
    public dialogRef: MatDialogRef<CheckListEditFormComponent>,
    public appService: AppService,
  ){
    this.checkListForm = new FormGroup({
      name : new FormControl(this.data.name, Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.editQuestionBlock({...this.data, ...this.checkListForm.value}).subscribe(block =>{
      console.log(block);
      this.dialogRef.close(block);
    });
  }

}
