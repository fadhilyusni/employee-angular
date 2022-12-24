import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { employees, search } from 'src/app/constant/employee';
import { Employee, Search } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  private employees: Employee[] = [];
  private search: Search[] = [];

  private storage: Storage = sessionStorage;
  list(): Observable<Employee[]> {
    return new Observable<Employee[]>((observer: Observer<Employee[]>) => {
      try {
        const sessionEmployee: string = this.storage.getItem(
          'employee'
        ) as string;
        if (!sessionEmployee) {
          this.employees = employees;
          observer.next(this.employees);
        } else {
          this.employees = JSON.parse(sessionEmployee);
          observer.next(this.employees);
        }
        this.setToStorage();

        // const books: Book[] = sessionTodo
        //   ? JSON.parse(sessionTodo)
        //   : [
        //       {
        //         id: '1',
        //         status: 'reserved',
        //         roomNumber: '123',
        //         duration: '2',
        //         guestCount: '5',
        //         reservee: {
        //           id: '1',
        //           name: 'fadhil',
        //           email: 'fadhil@gmail.com',
        //           phone: '081803333',
        //         },
        //       },
        //     ];
        // this.bookings = books;
        // this.setToStorage();
        // observer.next(this.bookings);
      } catch (err: any) {
        observer.error(err.message);
      }
    });
  }
  show(): Observable<Search[]> {
    return new Observable<Search[]>((observer: Observer<Search[]>) => {
      try {
        const sessionSearch: string = this.storage.getItem('search') as string;
        if (!sessionSearch) {
          this.search = search;
          observer.next(this.search);
        } else {
          this.search = JSON.parse(sessionSearch);
          observer.next(this.search);
        }
        this.setToStorage();
      } catch (err: any) {
        observer.error(err.message);
      }
    });
  }
  cari(search: Search): Observable<void> {
    return new Observable<void>((obs: Observer<void>) => {
      this.search.push(search);
      this.storage.setItem('search', JSON.stringify(this.search));
      console.log(this.search);
    });
  }
  save(booked: Employee): Observable<void> {
    return new Observable<void>((obs: Observer<void>) => {
      try {
        if (booked.id) {
          this.employees = this.employees.map((t) => {
            if (t.id === booked.id) t = booked;
            console.log(t);
            return t;
          });
        } else {
          booked.id = this.employees.length + 1;
          this.employees.push(booked);
          obs.next();
        }
        this.setToStorage();
      } catch (err: any) {
        obs.error(err.message);
      }
    });
  }
  get(id: number): Observable<Employee> {
    return new Observable<Employee>((observer: Observer<Employee>) => {
      try {
        observer.next(this.employees.find((t) => t.id === id) as Employee);
      } catch (err: any) {
        return err.message;
      }
    });
  }
  remove(employeeId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        for (let index = 0; index < this.employees.length; index++) {
          if (this.employees[index].id === employeeId) {
            this.employees.splice(index, 1);
          }
        }
        this.setToStorage();
        observer.next();
      } catch (err: any) {
        observer.error(err.message);
      }
    });
  }

  constructor() {}
  private setToStorage(): void {
    this.storage.setItem('employee', JSON.stringify(this.employees));
  }
}