import { Component, OnInit} from '@angular/core';
import { PlaceFormEditComponent } from '../../formComponents/place-form-edit/place-form-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../services/app.service';
import { PlaceFormAddComponent } from '../../formComponents/place-form-add/place-form-add.component';
import { IPlaceItem, IPlaceItemResponse } from '../../../app.models';



@Component({
  selector: 'app-places-table',
  templateUrl: './places-table.component.html',
  styleUrls: ['./places-table.component.scss', '../table.component.scss'],
})
export class PlacesTableComponent implements OnInit{

  data: IPlaceItem[];

  constructor(public dialog: MatDialog, public appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getPlaces().subscribe((places: IPlaceItemResponse) => {
      this.data = places.items;
    });
  }

  openEditFormDialog(item: IPlaceItem): void{

    const dialogRef = this.dialog.open(PlaceFormEditComponent, {
      // width: '540px',
      data : item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.editRow(result);
      }
    });
  }

  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(PlaceFormAddComponent, {
      // width: '540px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.addRow(result);
      }
    });
  }

  deleteRow(id): void{
    this.appService.deletePlace(id).subscribe((deletedItem) => {
      this.data = this.data.filter(row => row.id !== id);
    });
  }

  editRow(place: IPlaceItem): void{
    this.data = this.data.map((row: IPlaceItem)  => {
      if (row.id === place.id) { return place; }
      return row;
    });
  }


  addRow(place: IPlaceItem): void{
    this.data.push(place);
  }
}
