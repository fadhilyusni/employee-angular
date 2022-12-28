import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee, Search } from '../../model/employee.model';
import { EmployeeServiceService } from '../../service/employee-service.service';
import Swal from 'sweetalert2';
import { employees } from 'src/app/constant/employee';
import { FormControl, FormGroup } from '@angular/forms';
import { he } from 'date-fns/locale';
import { tableList } from 'src/app/constant/list-table';
// import {emp}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private readonly employeeService: EmployeeServiceService // private storage: Storage = sessionStorage
  ) {}
  @ViewChild('empSearchInput') empSearchInput!: ElementRef;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  tableSizes: any = [10, 30, 50, 100];
  collectionSize = employees.length;
  editTable: boolean = true;
  searchTest: any;
  employees: Employee[] = [];
  isSearching: boolean = false;
  search: Search[] = [];
  searched: any = [];
  show: boolean = false;
  orderHeader: String = '';
  isDescOrder: boolean = true;
  searchInput = { username: '', email: '' };
  reverse: boolean = true;
  headList = tableList;

  ngOnInit(): void {
    this.employeeService.list().subscribe({
      next: (bookings: Employee[]) => {
        this.employees = bookings;
      },
    });
    this.employeeService.show().subscribe({
      next: (searchs: Search[]) => {
        this.search = searchs;
      },
    });
  }
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  delete(employeeId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.remove(employeeId).subscribe();
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // pagination and Search
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  cari(): void {
    const x = this.searchForm.value;
    this.employeeService.cari(x).subscribe();
  }
}
