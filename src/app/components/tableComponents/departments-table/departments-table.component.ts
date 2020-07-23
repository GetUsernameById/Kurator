import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDepartment } from '../../../app.models';
import { AppService } from '../../../services/app.service';
import { DepartmentAddFormComponent } from '../../formComponents/department-add-form/department-add-form.component';
import { DepartmentEditFormComponent } from '../../formComponents/department-edit-form/department-edit-form.component';

@Component({
  selector: 'app-checklist-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['./departments-table.component.scss', '../table.component.scss']
})
export class DepartmentsTableComponent implements OnInit {

  public departments: IDepartment[];

  constructor(public dialog: MatDialog, public appService: AppService) {}

  ngOnInit(): void {
    this.appService.getDepartments().subscribe((departments: IDepartment[]) => {
      this.departments = departments;
    });
  }

  openAddFormDialog(): void{
    const dialogRef = this.dialog.open(DepartmentAddFormComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.addRow(result); }
    });
  }

  openEditFormDialog(department): void{
    const dialogRef = this.dialog.open(DepartmentEditFormComponent, {
      data: department
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.editRow(result); }
    });
  }



  deleteRow(id): void{
    this.appService.deleteDepartment(id).subscribe( department => {
        this.departments = this.departments.filter(row => row.id !== id);
      }
    );
  }

  addRow(department): void{
    this.departments.push(department);
  }

  editRow(data): void{
    this.departments = this.departments.map((row)  => {
      if (row.id === data.id) { return data; }
      return row;
    });
  }

}
