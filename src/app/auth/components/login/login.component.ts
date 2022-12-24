import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginResponse } from '../../model/login.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  ngOnInit(): void {}
  onSubmit(): void {
    const payload = this.loginForm.value;
    this.authService.Login(payload).subscribe({
      next: (token: LoginResponse | null) => {
        if (token) {
          this.router.navigate(['pages']).finally();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email atau Password salah!',
          });
        }
      },
    });
  }
  isFormValid(formField: string): string {
    const control: AbstractControl = this.loginForm.get(
      formField
    ) as AbstractControl;

    let className = '';
    if (control && control.invalid && (control.dirty || control.touched)) {
      className = 'is-invalid';
    } else if (control && control.valid && (control.dirty || control.touched)) {
      className = 'is-valid';
    }
    return className;
  }
}
