import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

declare var alertify: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  userForm: any = FormGroup;

  private isEmail = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

  constructor(private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.initForm()
  }

  guardarItem(): void {
    if ( this.userForm.invalid )  {
      alertify.warning('Todos los campos son obligatorios')
      this.userForm.markAllAsTouched();
      return;
    }

    const datos = {
      user: this.userForm.value.user,
      name: this.userForm.value.name,
      lastname: this.userForm.value.lastName,
      type_identifications_id: this.userForm.value.type,
      identification: this.userForm.value.identification,
      day_of_birth: this.userForm.value.date,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    }
    this.userForm.reset();
    this.userService.addUser(datos).subscribe(({ status }) => {
      if (status) {
        alertify.error('El usuario ya existe')
      } else {
        alertify.success('Se creo el usuario')
      }
    })
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      user: ['', Validators.required],
      name: ['', Validators.required],
      identification: ['', Validators.required],
      lastName: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
    })
  }

}
