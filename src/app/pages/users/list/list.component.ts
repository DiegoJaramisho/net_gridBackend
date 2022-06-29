import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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

  constructor(private router: Router) {

  }
  api_url:any = 'http://127.0.0.1:8000/api'
  user:any = []

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void{
    fetch(`${this.api_url}/user`).then(res => res.json())
    .then((res) => {
      const { data } = res[0]
      this.user = data
      console.log(data);


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
  onGotoDelete(item: any): void{
    console.log(`deleted ${item}`)
  }

}
