import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { PlaceFormEditComponent } from '../../formComponents/place-form-edit/place-form-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../../services/app.service';
import { PlaceFormAddComponent } from '../../formComponents/place-form-add/place-form-add.component';
import { IPlaceItem, IPlaceItemResponse } from '../../../app.models';
import { MatSort} from '@angular/material/sort';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { merge, of, Observable, from } from 'rxjs';
import { switchMap, startWith, catchError, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-places-super-table',
  templateUrl: './places-super-table.component.html',
  styleUrls: ['./places-super-table.component.scss', '../table.component.scss'],
})
export class PlacesSuperTableComponent implements OnInit, AfterViewInit {

  data: IPlaceItem[] = [];
  sortedData: IPlaceItem[];

  // MatPaginator Inputs
  totalCount = 10;
  pageSize = 3;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, public appService: AppService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.appService.getPlaces(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe((data: IPlaceItemResponse) => {
        this.data = data.items;
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
      this.totalCount -= 1;
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
    this.totalCount += 1;
  }
}
