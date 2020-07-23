import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './check-list-add-form.component.html',
  styleUrls: ['./check-list-add-form.component.scss', '../form.component.scss']
})
export class CheckListAddFormComponent implements OnInit {

  public checkListForm: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CheckListAddFormComponent>,
    public appService: AppService,
  ){
    this.checkListForm = new FormGroup({
      name : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.addQuestionBlock(this.checkListForm.value).subscribe(block =>{
      console.log(block);
      this.dialogRef.close(block);
    });
  }

}
