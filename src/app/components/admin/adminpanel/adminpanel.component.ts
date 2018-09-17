import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  recipe:any;
  imgurl:String;
  catogary:any;
  mystate:String;
  headline:String;
  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) {
    this.isadmin();
    this.mystate="pending";
    this.headline="Pending Posts";
    this.catogary={
      "mycatogory":"all"}

      this.catogary={
        "mycatogory":"all"}
      this.authservice.getAllRecipe().subscribe(res=>{
        if(res.state){
          this.recipe = res.recipe;
          this.imgurl = res.pic_url;
          //console.log("ds");
         // console.log(res.recipe);
          //this.recipe=res.recipe;
          //console.log(this.recipe);
        }
          else{
            this.ngFlashMessageService.showFlashMessage({messages: ["SERVER ERROR OCCUERED!"],dismissible: true,timeout: 4000,type: 'danger'});
          }
      });
      
   }

  ngOnInit() {
  }

  accepted(){
    this.mystate="accepted";
    this.headline="Accepted Posts";;
  }
  rejected(){
    this.mystate="rejected";
    this.headline="Rejected Posts";;
  }
  pending(){
    this.mystate="pending";
    this.headline="Pending Posts";
  }

  isadmin(){
    if(this.authservice.loggedIn()){
    //return true;
    this.authservice.Isadmin().subscribe(res=>{
      if(res.state){
      
    }
      else{
        this.router.navigate(['/']);
      }
    });
    }
  }

}
