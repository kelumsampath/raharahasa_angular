import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search:string;
  recipe:any;
  imgurl:String;
  searchstatus:boolean;
  recipecount:boolean;
  constructor(
    private authservice:AuthService,
    private ngFlashMessageService: NgFlashMessageService,
    private router:Router,
  ) {
    this.searchstatus=false;
   }

  ngOnInit() {
  }

  searchrecipe(){
    this.searchstatus=true;
    const recipename={
      recipename:this.search
    }
    this.authservice.searchrecipe(recipename).subscribe(res=>{
      
      if(res.state){
        this.recipecount=res.recipecount;
      if(res.recipecount){
      this.recipe = res.recipe;
      this.imgurl = res.pic_url;
      }else{
        document.getElementById("norecipe").innerHTML = "Hello World";
      }
      //console.log(res);
      } else{
      //console.log(res.msg);
      this.ngFlashMessageService.showFlashMessage({messages: ["Server Error!"],dismissible: false,timeout: 4000,type: 'danger'});
      console.log(res)
      }
    });
  }
}
