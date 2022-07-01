import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: ''
    }
  };
  user:any = null
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()
    this.user = navigation?.extras?.state
    if (!this.user) {
      router.navigate(['/list'])
    }
  }

  ngOnInit(): void {
  }

  onGotoEdit(): void{
    if(this.navigationExtras.state !== undefined){
      this.navigationExtras.state["value"] = this.user;
    }
    this.router.navigate(['edit'], this.navigationExtras)
  }

  onGoBack(): void{
    this.router.navigate(['list'])
  }

  onDelete(): void{
    alert('deleted')
  }

}
