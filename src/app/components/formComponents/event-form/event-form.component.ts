import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
import { IDepartment, IEvent } from 'src/app/app.models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-check-list-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss', '../form.component.scss']
})
export class EventFormComponent implements OnInit {

  public depsSelect: IDepartment[];

  public form: FormGroup;
  // public storeForm = new Form();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IEvent,
    public dialogRef: MatDialogRef<EventFormComponent>,
    public appService: AppService,
  ){
    this.form = new FormGroup({
      name : new FormControl(data.name, Validators.required),
      userId : new FormControl(data.userName, Validators.required),
      placeId : new FormControl(data.placeName, Validators.required),
      startPlan : new FormControl(formatDate(data.startPlan, 'dd/MM/yy  HH:mm', 'en'),   Validators.required),
      startFact : new FormControl(formatDate(data.startFact, 'dd/MM/yy  HH:mm', 'en'), Validators.required),
      endFact : new FormControl(formatDate(data.endFact, 'dd/MM/yy  HH:mm', 'en'), Validators.required),
      latitudeStart : new FormControl(data.latitudeStart, Validators.required),
      latitudeEnd : new FormControl(data.latitudeEnd, Validators.required),
      longitudeStart : new FormControl(data.longitudeStart, Validators.required),
      longitudeEnd : new FormControl(data.longitudeEnd, Validators.required),
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
