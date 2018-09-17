import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  loginUser(){
    const user ={
    username:this.username,
    password:this.password,
    }
    this.authservice.loginUser(user).subscribe(res=>{
      if(res.state){
        this.authservice.storeData(res.token,res.user);
        this.ngFlashMessageService.showFlashMessage({messages: ["You are loggedin!"],dismissible: true,timeout: 4000,type: 'success'});
        this.router.navigate(['/..']);
        //this._location.back();
      }
        else{
        this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
        this.router.navigate(['/login']);
        }
    })
  };

  fogotpassword(){
    var myname={
      myname:prompt("Enter User name:","Username")
    } 

    if(myname.myname!=null){
      this.authservice.fogotpassword(myname).subscribe(res=>{
        if(res.state){
         
          this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
          //this.router.navigate(['../']);
         
        }
          else{
          this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
          }
      })
    }
  }
}
