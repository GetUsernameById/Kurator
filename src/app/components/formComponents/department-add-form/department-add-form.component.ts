import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './department-add-form.component.html',
  styleUrls: ['./department-add-form.component.scss', '../form.component.scss']
})
export class DepartmentAddFormComponent implements OnInit {

  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepartmentAddFormComponent>,
    public appService: AppService,
  ){
    this.form = new FormGroup({
      name : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }


  submit(){
    this.appService.addDepartment(this.form.value).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

}
