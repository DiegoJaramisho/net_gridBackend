import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  value:any = null
  userForm:any = FormGroup;

  private isEmail = "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"

  constructor(private router: Router, private fb: FormBuilder) {
    const navigation = this.router.getCurrentNavigation()
    this.value = navigation?.extras?.state
  }

  DATA_FORM = {
    USER: '',
    NAME: '',
    LAST_NAME: '',
    EMAIL: '',
    DATE: ''
  }

  ngOnInit(): void {
    this.initForm()
  }

  guardarItem():void {

    fetch('', )
    console.log(this.userForm.value);

    // console.log('saved', this.userForm.value)
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: [this.DATA_FORM.NAME, Validators.required],
      lastname: [this.DATA_FORM.LAST_NAME, Validators.required],
      email: [this.DATA_FORM.EMAIL, Validators.required],
      dateBirth: [this.DATA_FORM.DATE, Validators.required],
    })
  }

}
