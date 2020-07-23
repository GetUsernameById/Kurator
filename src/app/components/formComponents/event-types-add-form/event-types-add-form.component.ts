import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IDepartment, IEventType } from 'src/app/app.models';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './event-types-add-form.component.html',
  styleUrls: ['./event-types-add-form.component.scss', '../form.component.scss']
})
export class EventTypesAddFormComponent implements OnInit {

  public depsSelect: IDepartment[];

  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventTypesAddFormComponent>,
    public appService: AppService,
  ){
    this.form = new FormGroup({
      name : new FormControl('', Validators.required),
      departmentId : new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.appService.getDepartments().subscribe((deps: IDepartment[]) => {
      this.depsSelect = deps;
    });
  }


  submit(){
    console.log(this.form);

    this.appService.addEventType(this.form.value).subscribe((result: IEventType) => {
      const selecetedDep = this.depsSelect.find(dep => dep.id === this.form.value.departmentId);
      result.departmentName = selecetedDep.name;
      this.dialogRef.close(result);
    });
  }

}
