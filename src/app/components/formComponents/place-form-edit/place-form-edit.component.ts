import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { PlaceGroupAddFormComponent } from '../place-group-add-form/place-group-add-form.component';
import { IPlaceGroup } from 'src/app/app.models';
import { merge, of, Observable } from 'rxjs';

@Component({
  selector: 'app-store-form',
  templateUrl: './place-form-edit.component.html',
  styleUrls: ['./place-form-edit.component.scss', '../form.component.scss']
})
export class PlaceFormEditComponent implements OnInit {
  public storeForm: FormGroup;
  public placeGroups$: Observable<object>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlaceFormEditComponent>,
    public dialog: MatDialog,
    public appService: AppService,
  ){}

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      name : new FormControl(this.data.name, Validators.required),
      mail : new FormControl(this.data.mail, [Validators.email]),
      latitude : new FormControl(this.data.latitude, [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      longitude : new FormControl(this.data.longitude, [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      groupId : new FormControl(this.data.groupId, [Validators.pattern('[0-9]*'), Validators.required]),
      codeSm: new FormControl(this.data.codeSm,   [Validators.pattern('[0-9]*')]),
      code1C: new FormControl(this.data.code1C,  Validators.maxLength(5)),
    });
    this.placeGroups$ = this.appService.getPlaceGroups();
  }


  submit(){
    this.appService.editPlace({...this.data, ...this.storeForm.value}).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  openAddPlaceGroupFormDialog(): void{
    const dialogRef = this.dialog.open(PlaceGroupAddFormComponent, {
    });
    dialogRef.afterClosed().subscribe((result: IPlaceGroup) => {
      if (result){
         this.placeGroups$ = merge(this.placeGroups$, of(result));
      }
    });
  }
}
