import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  dataRaw:any = null
  userForm:any = FormGroup;

  private isEmail = "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"

  constructor(private router: Router, private fb: FormBuilder, private userService: UsersService) {
    const navigation = this.router.getCurrentNavigation()
    this.dataRaw = navigation?.extras?.state
    if (!this.dataRaw) {
      router.navigate(['/list'])
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  guardarItem():void {
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

    this.userService.editUser(this.userForm.value.id, datos)
      .subscribe(res => {
        console.log(res);
      })
  }

  private initForm(): void {
    const { value: datos } = this.dataRaw
    this.userForm = this.fb.group({
      id: [/* A destructuring assignment. */
      /* A destructuring assignment. */
      datos.id, Validators.required],
      user: [datos.user, Validators.required],
      name: [datos.name, Validators.required],
      identification: [datos.identification, Validators.required],
      lastName: [datos.lastname, Validators.required],
      type: [datos.type_identifications_id, Validators.required],
      email: [datos.email, [Validators.required, Validators.email]],
      date: [datos.day_of_birth, Validators.required],
    })
  }

}
