import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, Locale } from 'date-fns';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';
import { Employee } from '../../model/employee.model';
import { EmployeeServiceService } from '../../service/employee-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  today: Date = new Date();
  locale: Locale = id;
  emp?: Employee;
  editTable: boolean = true;
  status: string = '';
  constructor(
    private readonly empService: EmployeeServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  format = format(this.today, 'yyyy-MM-dd', { locale: id });
  dateNow = format(this.today, 'dd-MM-yyyy', { locale: id });

  employeeForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    basicSalary: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    group: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    const payload = this.employeeForm.value;
    this.empService.save(payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil Disimpan',
        });
      },
    });
    this.employeeForm.reset();
    this.router.navigateByUrl('pages');
  }
  // onSubmitReservation(): void {
  //   this.empService.save(this.employeeForm.value).subscribe();
  //   console.log('aaa');
  //   this.employeeForm.reset();
  //   this.router.navigateByUrl('pages');
  // }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const { id } = params;
        console.log(params);
        this.empService.get(+id).subscribe({
          next: (emp: Employee) => {
            if (emp) {
              this.emp = emp;
              console.log(this.emp);
              this.setFormValue(this.emp);
            }
          },
        });
      },
    });
  }
  setFormValue(employee: Employee) {
    if (employee) {
      this.employeeForm.get('id')?.setValue(employee.id);
      this.employeeForm.get('username')?.setValue(employee.username);
      this.employeeForm.get('firstName')?.setValue(employee.firstName);
      this.employeeForm.get('lastName')?.setValue(employee.lastName);
      this.employeeForm.get('email')?.setValue(employee.email);
      this.employeeForm.get('birthDate')?.setValue(employee.birthDate);
      this.employeeForm.get('basicSalary')?.setValue(employee.basicSalary);
      this.employeeForm.get('status')?.setValue(employee.status);
      this.employeeForm.get('group')?.setValue(employee.group);
      this.employeeForm.get('description')?.setValue(employee.description);
    }
  }
  isFormValid(employeeField: string) {
    const control: AbstractControl = this.employeeForm.get(
      employeeField
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }
}
