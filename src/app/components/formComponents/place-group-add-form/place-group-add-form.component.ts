import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-place-group-add-form',
  templateUrl: './place-group-add-form.component.html',
  styleUrls: ['./place-group-add-form.component.scss', '../form.component.scss']
})
export class PlaceGroupAddFormComponent implements OnInit {
  departaments$: Observable<object>;
  public checkListForm: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlaceGroupAddFormComponent>,
    public appService: AppService,
  ){}

  ngOnInit(): void {
    this.checkListForm = new FormGroup({
      name : new FormControl('', Validators.required),
      departmentId : new FormControl('', Validators.required),
    });
    this.departaments$ = this.appService.getDepartments();
  }


  submit(){
    this.appService.addPlaceGroup(this.checkListForm.value).subscribe(block =>{
      console.log(block);
      this.dialogRef.close(block);
    });
  }

}
