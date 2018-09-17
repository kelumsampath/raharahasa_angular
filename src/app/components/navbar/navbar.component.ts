import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router:Router,
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
  ) { }

  ngOnInit() {
  }

  logoutUser(){
    this.authservice.logOut().subscribe(res=>{
    //console.log(res)
  })
    this.ngFlashMessageService.showFlashMessage({messages: ["You are successfully logged out!"],dismissible: true,timeout: 4000,type: 'success'});
    this.router.navigate(['/login']);
    return false;
  }


}
