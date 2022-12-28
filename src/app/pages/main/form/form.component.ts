import { CurrencyPipe } from '@angular/common';
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
  value: string = '';
  basicSalaryFormat!: string;
  group: any = [
    'Digital Developer',
    'Digital Banking',
    'frontend',
    'Backend',
    'Security',
    'IT Support',
    'UI/UX',
    'System Analyst',
    'Aplication Desain',
    'Mobile',
  ];
  formattedAmount: any;
  amount: any;
  constructor(
    private readonly empService: EmployeeServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

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
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const { id } = params;

        this.empService.get(+id).subscribe({
          next: (emp: Employee) => {
            if (emp) {
              this.emp = emp;
              this.setFormValue(this.emp);
            }
          },
        });
      },
    });
  }
  setFormValue(employee: Employee) {
    console.log(employee.birthDate);
    if (employee) {
      this.employeeForm.get('id')?.setValue(employee.id);
      this.employeeForm.get('username')?.setValue(employee.username);
      this.employeeForm.get('firstName')?.setValue(employee.firstName);
      this.employeeForm.get('lastName')?.setValue(employee.lastName);
      this.employeeForm.get('email')?.setValue(employee.email);
      this.employeeForm
        .get('birthDate')
        ?.setValue(
          format(new Date(employee.birthDate), 'yyyy-MM-dd', { locale: id })
        );
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

  // Convert Rupiah
  convertRupiahFormat(amount: number): string {
    return (this.basicSalaryFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount));
  }
  onChangeConvertRupiah(amount: any): void {
    let amountValue = amount.target.value;
    if (amountValue.includes(',')) {
      amountValue = amountValue.slice(0, amountValue.lastIndexOf(','));
    }
    amountValue = amountValue.replace(/\D/g, '');
    this.employeeForm.controls['basicSalary']?.setValue(
      this.convertRupiahFormat(Number(amountValue))
    );
  }
  onChangeAddFraction(amount: any): void {
    let amountValue = amount.target.value;
    if (!amountValue.includes(',')) {
      amountValue = amountValue + ',00';
      this.employeeForm.controls['basicSalary']?.setValue(amountValue);
    }
  }
  rejectNumber(event: any) {
    return (
      (event.charCode != 8 && event.charCode == 0) ||
      (event.charCode >= 48 && event.charCode <= 57)
    );
  }

  // Convert Date
  format = format(this.today, 'yyyy-MM-dd', { locale: id });
  dateNow = format(this.today, 'dd-MM-yyyy', { locale: id });
}
