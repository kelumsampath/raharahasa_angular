import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  myname:String;
  recipe:any;
  imgurl:String;
  editData:boolean;
  fullname:String;
  lastname:String;
  email:String;
  phoneno:Number;
  editimage:File;
  changepassword:boolean;
  newpassword:string;
  compassword:string;
  oldpassword:String;
  admin:boolean;
  constructor(
    private authservice : AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) {
    this.admin=false;
    this.editData=false;
    this.changepassword=false;
    this.authservice.getprofile().subscribe(res=>{
     if(res.state){
      this.user = res.loggeduser;
      this.myname=this.user.username;
      //console.log(this.user);
     }else{
      this.ngFlashMessageService.showFlashMessage({messages: ['Server Error!'],dismissible: true,timeout: 4000,type: 'danger'});
     }
    });
    const myusername={
      "username":this.myname
    };
    this.authservice.getuserrecipes(myusername).subscribe(res=>{
      if(res.state){
        //console.log(res.recipe);
        this.recipe = res.recipe;
        this.imgurl = res.pic_url;
       }else{
        this.ngFlashMessageService.showFlashMessage({messages: ['Server Error!'],dismissible: true,timeout: 4000,type: 'danger'});
       }
    })
    this.isadmin();
  }

  ngOnInit() {
   
  }
  editform(){
    this.editData=true;
  }
  cancel(){
    this.editData=false;
  }
  saveform(){
    
    const newdata={
      fullname:this.fullname||this.user.fullname,
      lastname:this.lastname||this.user.lastname,
      email:this.email||this.user.email,
      phoneno:this.phoneno||this.user.phoneno
    }
    this.authservice.editUser(newdata).subscribe(res=>{
      if(res.state){
        this.editData=false;
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
      
      this.router.navigate(['/..']);
      }
      else{
      //console.log(res.msg);
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
      ;
      }
    });
    
  }
  
  profpic(file:FileList){
    const image={
      editimage:file.item(0)
    }
    this.authservice.editimage(image).subscribe(res=>{
      if(res.state){
       
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
      //console.log("ela");
      this.router.navigate(['/..']);
      }
      else{
      //console.log(res.msg);
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
      
      }
    });
  }

  changepass(){
    this.changepassword=true;
  }
  chngepasscancel(){
    this.changepassword=false;
  }

  

  Validate() {
    var password = this.newpassword;
    var confirmPassword = this.compassword;
    var oldpassword = this.oldpassword
    //console.log(password+"ds"+confirmPassword);
    if (password != confirmPassword) {
        window.alert("You new Passwords is not similar with confirm password. Please enter same password in both");
       // console.log("ddd")
        
    }else{
     const password={
       oldpassword:this.oldpassword,
       newpassword:this.newpassword
     }
     this.authservice.changepassword(password).subscribe(res=>{
      if(res.state){
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
      this.changepassword=false;
      }
      else{
      //console.log(res.msg);
      this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
      
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

  deleteacc(){
    const password=prompt("Enter Password:");
    if(password!=null){
      this.authservice.deleteacc(password).subscribe(res=>{
        if(res.state){
          this.authservice.logOut().subscribe(res=>{
            if(res.state){
              this.ngFlashMessageService.showFlashMessage({messages: ["Account Deactivated!"],dismissible: true,timeout: 4000,type: 'success'});
              this.router.navigate(['/']);
          }
            else{
              this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
            }
          });
      }
        else{
          this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
        }
      });
    }
  }

}
