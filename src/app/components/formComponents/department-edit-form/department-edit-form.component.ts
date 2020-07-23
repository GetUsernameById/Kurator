import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IDepartment } from 'src/app/app.models';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './department-edit-form.component.html',
  styleUrls: ['./department-edit-form.component.scss', '../form.component.scss']
})
export class DepartmentEditFormComponent implements OnInit {

  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDepartment,
    public dialogRef: MatDialogRef<DepartmentEditFormComponent>,
    public appService: AppService,
  ){
    this.form = new FormGroup({
      id : new FormControl(this.data.id, Validators.required),
      name : new FormControl(this.data.name, Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.editDepartment(this.form.value).subscribe(result => {
        this.dialogRef.close(result);
      }
    );
  }

}
