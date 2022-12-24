import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee, Search } from '../../model/employee.model';
import { EmployeeServiceService } from '../../service/employee-service.service';
import Swal from 'sweetalert2';
import { employees } from 'src/app/constant/employee';
import { FormControl, FormGroup } from '@angular/forms';

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
  tableSize: number = 5;
  count: number = 0;
  tableSizes: any = [5, 10, 15];
  collectionSize = employees.length;
  editTable: boolean = true;
  searchTest: any;
  employees: Employee[] = [];
  isSearching: boolean = false;
  search: Search[] = [];
  searched: any = [];
  show: boolean = false;

  onTableSizeChange(event: any) {
    this.tableSizes = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  ngOnInit(): void {
    this.employeeService.list().subscribe({
      next: (bookings: Employee[]) => {
        this.employees = bookings;
      },
    });
    this.employeeService.show().subscribe({
      next: (searchs: Search[]) => {
        this.search = searchs;
        console.log(this.search);
      },
    });
  }
  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  cari(): void {
    const x = this.searchForm.value;
    this.employeeService.cari(x).subscribe();
  }

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
  // filterSearch(name: string) {
  //   return this.search.filter(
  //     (val: any) => val.toLowerCase().includes(name.toLowerCase()) == true
  //   );
  // }
  // getCars(name: any): Observable<any> {
  //   return of(this.filterSearch(name));
  // }
  // carSearch() {
  //   const search$ = fromEvent(this.empSearchInput.nativeElement, 'keyup').pipe(
  //     map((event: any) => event.target.value),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     tap(() => (this.isSearching = true)),
  //     switchMap((term) => (term ? this.getCars(term) : of<any>(this.search))),
  //     tap(() => {
  //       (this.isSearching = false), (this.show = true);
  //     })
  //   );

  //   search$.subscribe((data) => {
  //     this.isSearching = false;
  //     this.searched = data;
  //   });
  // }
  // setCarName(name: any) {
  //   this.searched = this.filterSearch(name);
  //   this.empSearchInput.nativeElement.value = name;
  //   this.show = false;
  // }

  // trackById(index: any, item: any): void {
  //   return item._id;
  // }
}
