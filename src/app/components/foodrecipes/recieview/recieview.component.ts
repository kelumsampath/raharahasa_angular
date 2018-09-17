import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { AuthGuard } from '../../../service/auth.guard'

@Component({
  selector: 'app-recieview',
  templateUrl: './recieview.component.html',
  styleUrls: ['./recieview.component.css']
})
export class RecieviewComponent implements OnInit {
  recipename: string;
  recipe:any;
  imgurl:String;
  myrecipe:any;
  likeDeta:any;
  Islike:boolean;
  likes:Number;
  isrealuser:boolean;
  admin:boolean;
  status:String;
  constructor(private activatedRoute: ActivatedRoute,
              private authservice:AuthService,
              private ngFlashMessageService: NgFlashMessageService,
              private router:Router,
              private authguard:AuthGuard
  ) {
    this.admin=false;
    this.myrecipe={
      recipename:this.activatedRoute.snapshot.paramMap.get('recipename')
    }
   // console.log(this.myrecipe);
    
  
    this.authservice.getviewRecipe(this.myrecipe).subscribe(res=>{
      if(res.state){
        this.recipe = res.recipe;
        this.likes=this.recipe.likes;
        this.myrecipe={
          "author":this.recipe.username,
          "recipename":this.recipe.recipename,
          "ingredients":this.recipe.ingredients,
          "directions" :this.recipe.directions,
          "preptime" :this.recipe.preptime,
          "cooktime" :this.recipe.cooktime,
          "readytime" :this.recipe.readytime,
          "serves" :this.recipe.serves,
          "notes" :this.recipe.notes,
          "rate" :this.recipe.rate,
          "catagory" :this.recipe.catagory,
          "description" :this.recipe.description,
          "imageUrl" :this.recipe.imageUrl,
          "likes":this.likes,
          }
        this.status=res.recipe.status;
        //console.log(myrecipe);
       /// console.log(this.recipe.recipename);
        //this.recipe=res.recipe;
        //console.log(this.myrecipe.directions);
      }
        else{
          this.ngFlashMessageService.showFlashMessage({messages: ["SERVER ERROR OCCUERED!"],dismissible: true,timeout: 4000,type: 'danger'});
        }
    });

    this.authservice.checklike(this.myrecipe.recipename).subscribe(res=>{
      if(res.state){
        //console.log("liked");
       this.Islike=true;
      }
        else{
         // this.ngFlashMessageService.showFlashMessage({messages: ["NOT LIKED"],dismissible: true,timeout: 4000,type: 'danger'});
         this.Islike=false;
        }
    });
    this.isadmin();
   }

  ngOnInit() {
  if(this.authservice.loggedIn()){
    this.authservice.getprofile().subscribe(res=>{
      if(res.state){
        if(res.loggeduser.username==this.myrecipe.author){
         // console.log("real user" );
        this.isrealuser=true;
        }else{
          this.isrealuser=false;
        }
      }
        else{
          this.isrealuser=false;
          }
    });
  }
  }

  

  like(){
    if(this.authguard.canActivate()){
    this.authservice.likeRecipe(this.myrecipe.recipename).subscribe(res=>{
      if(res.state){
       this.Islike=true;
      
      this.likes=res.likecount;
      }
        else{
          this.ngFlashMessageService.showFlashMessage({messages: ['SOMETHING WENT WRONG!'],dismissible: true,timeout: 4000,type: 'danger'});
        }
    });
  }
  }

  unlike(){
    if(this.authguard.canActivate()){
    this.authservice.unlikeRecipe(this.myrecipe.recipename).subscribe(res=>{
      if(res.state){
      this.Islike=false;
      
      this.likes=res.likecount;
      }
        else{
          this.ngFlashMessageService.showFlashMessage({messages: ['SOMETHING WENT WRONG!'],dismissible: true,timeout: 4000,type: 'danger'});
        }
    });
  }
}

deleterecipe(){
  if (window.confirm("Do you really want to delete this recipe?")) { 
    this.authservice.deleterecipe(this.myrecipe.recipename).subscribe(res=>{
      if(res.state){
        //console.log("liked");
        this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
        this.router.navigate(['/..']);
      }
        else{
         this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'danger'});
         
        }
    });
  }
}

isadmin(){
  if(this.authservice.loggedIn()){
  //return true;
  this.authservice.Isadmin().subscribe(res=>{
    if(res.state){
    this.admin=true;
  }
    else{
    this.admin=false;
    }
  });
  }
}

accept(){
  var comment=prompt("Admin comment:","Nice recipe!");
  const statusdata={
    recipename:this.myrecipe.recipename,
    status:"accepted",
    comment:comment
  }
  this.authservice.acceptRecipe(statusdata).subscribe(res=>{
    if(res.state){
    this.status="accepted"
    }
      else{
        this.ngFlashMessageService.showFlashMessage({messages: ['SOMETHING WENT WRONG!'],dismissible: true,timeout: 4000,type: 'danger'});
      }
  });
}

pending(){
  var comment=prompt("Admin comment:","pending for administrator review!");
  const statusdata={
    recipename:this.myrecipe.recipename,
    status:"pending",
    comment:comment
  }
  this.authservice.acceptRecipe(statusdata).subscribe(res=>{
    if(res.state){
    this.status="pending"
    }
      else{
        this.ngFlashMessageService.showFlashMessage({messages: ['SOMETHING WENT WRONG!'],dismissible: true,timeout: 4000,type: 'danger'});
      }
  });
}

reject(){
  var comment=prompt("Admin comment:","Unfitted Content!");
  const statusdata={
    recipename:this.myrecipe.recipename,
    status:"rejected",
    comment:comment
  }
  this.authservice.acceptRecipe(statusdata).subscribe(res=>{
    if(res.state){
    this.status="rejected"
    }
      else{
        this.ngFlashMessageService.showFlashMessage({messages: ['SOMETHING WENT WRONG!'],dismissible: true,timeout: 4000,type: 'danger'});
      }
  });
}

}
