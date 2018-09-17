import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {

  recipename:string;
  ingredients:string;
  directions:string;
  preptime:number;
  cooktime:number;
  readytime:number;
  serves:number;
  notes:string;
  rate:string;
  catagory:String;
  description:string;
  imageUrl:String = "../../../assets/images/defualt.jpg";
  fileToUpload:File = null;



  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
    private _location: Location
  ) { }

  ngOnInit() {
  }
addrecipe(){
  const newrecipe={
  recipename:this.recipename,
  ingredients:this.ingredients,
  directions:this.directions,
  preptime:this.preptime,
  cooktime:this.cooktime,
  readytime:this.readytime,
  serves:this.serves,
  notes:this.notes,
  rate:this.rate,
  catagory:this.catagory,
  description:this.description,
  fileToUpload:this.fileToUpload
  }

 console.log(newrecipe);
 this.authservice.addrecipe(newrecipe).subscribe(res=>{
  if(res.state){
  this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: true,timeout: 4000,type: 'success'});
  console.log(res.msg);
  this.router.navigate(['foodrecipe']);
  }
  else{
  console.log(res.msg);
  this.ngFlashMessageService.showFlashMessage({messages: [res.msg],dismissible: false,timeout: 4000,type: 'danger'});
 
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
