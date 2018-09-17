import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  fullname: string;
  imageUrl:String = "../../../assets/images/defualt.jpg";
  fileToUpload:File = null;

  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  test(){
    const user={
      fullname:"ddsdfd",
     fileToUpload:this.fileToUpload
    }
    this.authservice.testing(user).subscribe(res=>{
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
