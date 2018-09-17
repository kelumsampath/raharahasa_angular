import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../service/auth.service";
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allrecipe',
  templateUrl: './allrecipe.component.html',
  styleUrls: ['./allrecipe.component.css']
})
export class AllrecipeComponent implements OnInit {
  recipe:any;
  //heroes:any;
  imgurl:String;
  sidebarrecipe:any;
  sidebarimgurl:String;
  catogary:any;
  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) {
    this.catogary={
      "mycatogory":"all"}
    this.authservice.getAllacceptedRecipe().subscribe(res=>{
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
    this.authservice.getMostliked().subscribe(res=>{
      if(res.state){
        this.sidebarrecipe = res.recipe;
        this.sidebarimgurl = res.pic_url;
        //console.log("ds");
       // console.log(res.recipe);
        //this.recipe=res.recipe;
        //console.log(this.sidebarrecipe);
      }
        else{
          this.ngFlashMessageService.showFlashMessage({messages: ["SERVER ERROR OCCUERED!"],dismissible: true,timeout: 4000,type: 'danger'});
        }
    })
   }

  ngOnInit() {
  
  }
 // title = 'Tour of Heroes';
 // heroes = ['Windstorm', 'Bombasto', 'Magneta'];
 // myHero = this.heroes[0];
 all(){
  this.catogary={
    "mycatogory":"all"}
  
 }
 riceNcurry(){
  this.catogary={
    "mycatogory":"Rice and Curry"}
 }
 cakes(){
  this.catogary={
    "mycatogory":"Cakes"}
 }
 shortmeals(){
  this.catogary={
    "mycatogory":"Short Meal"}
 }
 other(){
  this.catogary={
    "mycatogory":"Other"}
 }

 
}
