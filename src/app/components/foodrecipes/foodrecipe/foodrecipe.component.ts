import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foodrecipe',
  templateUrl: './foodrecipe.component.html',
  styleUrls: ['./foodrecipe.component.css']
})
export class FoodrecipeComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit() {
  }
  imageSources = ["../../../assets/images/ta.jpg",
  "../../../assets/images/cook1.jpg",
  "../../../assets/images/2c.jpg"];

}
