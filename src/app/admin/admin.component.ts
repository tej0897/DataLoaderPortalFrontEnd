import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminServiceService } from './admin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    this.getAllPatients();
  }

  displayedColumns: string[] = [
    'patientName',
    'address',
    'dob',
    'email',
    'phone',
    'drugID',
    'drugName',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: AdminServiceService, private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    });
  }

  getAllPatients() {
    this.api.getPatients().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log('Error while Fetching records');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editPatient(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
  }
  
}
