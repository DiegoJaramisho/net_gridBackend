import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UsersService } from '../users.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: ''
    }
  };

  constructor(private router: Router, private userService: UsersService) {

  }
  api_url:any = 'http://127.0.0.1:8000/api'
  users:any = []
  conditionalDelete:any = false

  ngOnInit(): void {

    this.getUsers()
  }

  getUsers(): void{

    this.userService.getUsers().subscribe(({ data }) => {
      this.users = data
    })
  }

  onGotoEdit(item: any): void{
    if(this.navigationExtras.state !== undefined){
      this.navigationExtras.state["value"] = item;
    }
    this.router.navigate(['edit'], this.navigationExtras)
  }
  onGotoView(item: any): void{
    if(this.navigationExtras.state !== undefined){
      this.navigationExtras.state["value"] = item;
    }
    this.router.navigate(['details'], this.navigationExtras)
  }
  agregarItem(): void{
    this.router.navigate(['new'], this.navigationExtras)
  }
  onGotoDelete(): void{
    $('#example').show()
  }
  saveChange(item:any){
    console.log(item);

    this.userService.deleteUser(item.id).subscribe(() => {
      $('#example').hide();
      this.getUsers()
    })

  }
  closeModal(){
    $('#example').hide();
  }

}
