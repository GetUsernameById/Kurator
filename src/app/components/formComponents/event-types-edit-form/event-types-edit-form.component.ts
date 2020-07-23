import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IDepartment, IEventType } from 'src/app/app.models';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './event-types-edit-form.component.html',
  styleUrls: ['./event-types-edit-form.component.scss', '../form.component.scss']
})
export class EventTypesEditFormComponent implements OnInit {

  public depsSelect: IDepartment[];

  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEventType,
    public dialogRef: MatDialogRef<EventTypesEditFormComponent>,
    public appService: AppService,
  ){
    this.form = new FormGroup({
      name : new FormControl(data.name, Validators.required),
      departmentId : new FormControl(data.departmentId, Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.data);

    this.appService.getDepartments().subscribe((deps: IDepartment[]) => {
      this.depsSelect = deps;
    });
  }


  submit(){
    const selecetedDep = this.depsSelect.find(dep => dep.id === this.form.value.departmentId);
    this.form.value.departmentName = selecetedDep.name;
    const result = { ...this.data, ...this.form.value};
    this.appService.editEventType(result).subscribe(status => {
      this.dialogRef.close(result);
    });
  }

}
