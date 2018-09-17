import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fullname:String;
  lastname:String;
  email:String;
  phoneno:Number;
  imageUrl:String = "../../../assets/images/defualt.jpg";
  fileToUpload:File = null;

  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

registerData(){
  const user={
    fullname:this.fullname,
    lastname:this.lastname,
    email:this.email,
    phoneno:this.phoneno,
    fileToUpload:this.fileToUpload
  }
  this.authservice.registerUser(user).subscribe(res=>{
    if(res.state){
    this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
    this.router.navigate(['/login']);}
    else{
    //console.log(res.msg);
    this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
    this.router.navigate(['/register']);
    }
  });
  
}
handleFileInput(file:FileList){
  this.fileToUpload = file.item(0);

  //preview image
  var reader = new FileReader();
  reader.onload = (event:any)=>{
    this.imageUrl = event.target.result; 

  }
  reader.readAsDataURL(this.fileToUpload);
}

}
