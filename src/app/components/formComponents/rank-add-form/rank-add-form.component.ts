import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-rank-form',
  templateUrl: './rank-add-form.component.html',
  styleUrls: ['./rank-add-form.component.scss', '../form.component.scss']
})
export class RankAddFormComponent implements OnInit {

  public checkListForm: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RankAddFormComponent>,
    public appService: AppService,
  ){
    this.checkListForm = new FormGroup({
      name : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.addRank(this.checkListForm.value).subscribe(block => {
      console.log(block);
      this.dialogRef.close(block);
    });
  }

}
