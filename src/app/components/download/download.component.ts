import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/services/app.service';
import { IAttachment } from '../../app.models';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  public form: FormGroup;
  public images: IAttachment[];
  fileToUpload: File = null;
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      download : new FormControl(''),
    });

    this.appService.getAttachment().subscribe(attachment => {
      this.galleryOptions = [
        {
            width: '600px',
            height: '100px',
            thumbnailsColumns: 5,
            imageSwipe: true,
            imageAnimation: NgxGalleryAnimation.Slide,
            image: false,
        },
        // max-width 800
        {
            breakpoint: 800,
            width: '100%',
            height: '600px',
            imagePercent: 80,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
        },
        // max-width 400
        {
            breakpoint: 400,
            //preview: false
        }
      ];

      this.galleryImages = attachment;
    });

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }

  uploadFileToActivity() {
    this.appService.postFile(this.fileToUpload).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  submit(){
    console.log('submit');
    console.log(this.form.value);
  }


}
