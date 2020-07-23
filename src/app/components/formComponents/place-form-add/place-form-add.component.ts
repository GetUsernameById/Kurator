import { Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AppService } from '../../../services/app.service';



@Component({
  selector: 'app-store-form',
  templateUrl: './place-form-add.component.html',
  styleUrls: ['./place-form-add.component.scss', '../form.component.scss']
})
export class PlaceFormAddComponent implements OnInit {
  public storeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PlaceFormAddComponent>,
    public appService: AppService,
  ){

    this.storeForm = new FormGroup({
      name : new FormControl('', Validators.required),
      mail : new FormControl('', [Validators.email]),
      latitude : new FormControl('', [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      longitude : new FormControl('', [Validators.pattern('[0-9]+[.]?[0-9]*'), Validators.required]),
      groupId : new FormControl('', [Validators.pattern('[0-9]*'), Validators.required]),
      codeSm: new FormControl('',   [Validators.pattern('[0-9]*')]),
      code1C: new FormControl('', Validators.maxLength(5)),
    });
  }

  ngOnInit(): void {
  }


  submit(){

    this.appService.addPlace(this.storeForm.value).subscribe(result => {
      this.dialogRef.close(result);
    });
  }
}
