import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

declare var alertify:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  loginForm !: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  login(){
    if ( this.loginForm.invalid )  {
      alertify.warning('Todos los campos son obligatorios')
      this.loginForm.markAllAsTouched();
      return;
    }

    this.userService.login(this.loginForm.value).subscribe({
      next: ({ access_token }: any) => {
        localStorage.setItem('token', access_token)
        this.router.navigate(['/profile'])
      },
      error: (err) => {
        alertify.error('Credenciales invalidas')
      }
    })
  }

}
