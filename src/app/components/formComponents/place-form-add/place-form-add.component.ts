import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { PlaceGroupAddFormComponent } from '../place-group-add-form/place-group-add-form.component';
import { IPlaceGroup } from 'src/app/app.models';
import { Observable, merge, of } from 'rxjs';



@Component({
  selector: 'app-store-form',
  templateUrl: './place-form-add.component.html',
  styleUrls: ['./place-form-add.component.scss', '../form.component.scss']
})
export class PlaceFormAddComponent implements OnInit {
  public storeForm: FormGroup;
  public placeGroups$: Observable<object>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlaceFormAddComponent>,
    public dialog: MatDialog,
    public appService: AppService,
  ){}

  ngOnInit(): void {
    this.storeForm = new FormGroup({
      name : new FormControl('', Validators.required),
      mail : new FormControl('', [Validators.email]),
      latitude : new FormControl('', [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      longitude : new FormControl('', [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      groupId : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      codeSm: new FormControl('',   [Validators.pattern('[0-9]*')]),
      code1C: new FormControl('', Validators.maxLength(5)),
    });

    this.placeGroups$ = this.appService.getPlaceGroups();
  }


  submit(){

    this.appService.addPlace(this.storeForm.value).subscribe(result => {
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
