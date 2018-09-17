import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService, 
        private router:Router,
        private ngFlashMessageService: NgFlashMessageService){}

    canActivate(){
        if(this.auth.loggedIn()){
            return true;
        } else {
            this.ngFlashMessageService.showFlashMessage({messages: ["You Should login first!"],dismissible: true,timeout: 4000,type: 'danger'});
            this.router.navigate(['/login']);
            return false;
        }
    }
}