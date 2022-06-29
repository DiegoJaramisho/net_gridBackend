import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  value: any = null
  userForm: any = FormGroup;

  private isEmail = "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation()
    this.value = navigation?.extras?.state
  }
  api_url:any = 'http://127.0.0.1:8000/api'

  DATA_FORM = {
    USER: '',
    NAME: '',
    LAST_NAME: '',
    TYPE_IDENTIFICATION: '',
    EMAIL: '',
    DATE: ''
  }

  ngOnInit(): void {
    this.initForm()
  }

  guardarItem(): void {

    fetch(`${this.api_url}/user`, {
      method: "POST",
      body: JSON.stringify(this.userForm.value),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(res => res.json())
    .then(data => console.log(data));

    // console.log('saved', this.userForm.value)
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      user: [this.DATA_FORM.USER, Validators.required],
      name: [this.DATA_FORM.NAME, Validators.required],
      lastname: [this.DATA_FORM.LAST_NAME, Validators.required],
      type_identifications_id: [this.DATA_FORM.TYPE_IDENTIFICATION, Validators.required],
      email: [this.DATA_FORM.EMAIL, Validators.required],
      dateBirth: [this.DATA_FORM.DATE, Validators.required],
    })
  }

}
