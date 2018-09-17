import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user:any;
  authtoken:any;
 

  constructor(
    private http:Http,
  ) { }
  registerUser(user){
    const formData: FormData = new FormData();
  formData.append('profpic', user.fileToUpload,user.fileToUpload.name);
  formData.append('fullname',user.fullname);
  formData.append('lastname',user.lastname);
  formData.append('email',user.email);
  formData.append('phoneno',user.phoneno);
  return this.http.post("http://localhost:3000/user/register", formData).map(res=>res.json()); 
  };

  loginUser(user){
    let headers = new Headers();
    headers.append('content-Type','application/json');
    return this.http.post("http://localhost:3000/user/login",user,{headers:headers}).map(res=>res.json());
  };

  storeData(token,userdata){
    localStorage.setItem("tokenid",token);
    localStorage.setItem("user",JSON.stringify(userdata));
    this.authtoken = token;
    this.user = userdata;
  };

getprofile(){
  this.fetchtoken();
  let headers = new Headers();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.get("http://localhost:3000/user/profile",{headers:headers}).map(res=>res.json());
  
};
fetchtoken(){
  const token = localStorage.getItem("tokenid");
  this.authtoken = token;
};


logOut(){

  this.fetchtoken();
  let headers = new Headers();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  this.authtoken = null;
  this.user = null;
  localStorage.clear();
  return this.http.get("http://localhost:3000/user/logout",{headers:headers}).map(res=>res.json()); 
}


loggedIn(){
  return tokenNotExpired('tokenid');
  
}

testing(user){
  const formData: FormData = new FormData();
  formData.append('profpic', user.fileToUpload,user.fileToUpload.name);
  formData.append('fullname',user.fullname);
  return this.http.post("http://localhost:3000/foodrecipe/c", formData).map(res=>res.json()); 
}

addrecipe(newrecipe){
  //this.fetchtoken();
  const token = localStorage.getItem("tokenid");
  //let headers = new Headers();
  const formData: FormData = new FormData();
  formData.append('Authorization',token);
  //formData.append('content-Type','application/json');
  
  formData.append('foodimg', newrecipe.fileToUpload,newrecipe.fileToUpload.name);
  formData.append('recipename',newrecipe.recipename);
  formData.append('ingredients',newrecipe.ingredients);
  formData.append('directions',newrecipe.directions);
  formData.append('preptime',newrecipe.preptime);
  formData.append('cooktime',newrecipe.cooktime);
  formData.append('readytime',newrecipe.readytime);
  formData.append('serves',newrecipe.serves);
  formData.append('notes',newrecipe.notes);
  formData.append('rate',newrecipe.rate);
  formData.append('catagory',newrecipe.catagory);
  formData.append('description',newrecipe.description);
  return this.http.post("http://localhost:3000/foodrecipe/addrecipe", formData).map(res=>res.json()); 
};

getAllacceptedRecipe(){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/getallacceptedrecipe",{headers:headers}).map(res=>res.json());
}

getAllRecipe(){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/getallrecipe",{headers:headers}).map(res=>res.json());
}

getMostliked(){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/getmostliked",{headers:headers}).map(res=>res.json());
}

getviewRecipe(recipename){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/getviewrecipe",recipename,{headers:headers}).map(res=>res.json());
}

likeRecipe(recipename){
  const recipeData={
    "recipename":recipename
  }
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/likerecipe",recipeData,{headers:headers}).map(res=>res.json());
}

unlikeRecipe(recipename){
  const recipeData={
    "recipename":recipename
  }
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/unlikerecipe",recipeData,{headers:headers}).map(res=>res.json());
}

checklike(recipename){
  const recipeData={
    "recipename":recipename
  }
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/checklike",recipeData,{headers:headers}).map(res=>res.json());
}

getuserrecipes(myusername){
  let headers = new Headers();
  this.fetchtoken();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/getuserrecipies",myusername,{headers:headers}).map(res=>res.json());
}

editUser(editData){
  let headers = new Headers();
  this.fetchtoken();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/user/updateprofile",editData,{headers:headers}).map(res=>res.json());
}

editimage(image){
  
  const token = localStorage.getItem("tokenid");
  const formData: FormData = new FormData();
  formData.append('Authorization',token);
  formData.append('editprofpic', image.editimage,image.editimage.name);
  return this.http.post("http://localhost:3000/user/profpicchange", formData).map(res=>res.json()); 
};

deleterecipe(recipename){
  const recipeData={
    "recipename":recipename
  }
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/deleterecipe",recipeData,{headers:headers}).map(res=>res.json());
}

changepassword(password){
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/user/changepassword",password,{headers:headers}).map(res=>res.json());
}

Isadmin(){
  this.fetchtoken();
  let headers = new Headers();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/user/isadmin",{sdsd:"sdd"},{headers:headers}).map(res=>res.json());
}

acceptRecipe(recipeData){
  let headers = new Headers();
  this.fetchtoken();
  //console.log(this.authtoken);
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/acceptrecipe",recipeData,{headers:headers}).map(res=>res.json());
}

searchrecipe(recipename){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/foodrecipe/searchrecipe",recipename,{headers:headers}).map(res=>res.json());
}

deleteacc(pass){
  const password={
    password:pass
  }
  this.fetchtoken();
  let headers = new Headers();
  headers.append('Authorization',this.authtoken);
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/user/deleteuser",password,{headers:headers}).map(res=>res.json());
}

fogotpassword(username){
  let headers = new Headers();
  headers.append('content-Type','application/json');
  return this.http.post("http://localhost:3000/user/fogotpassword",username,{headers:headers}).map(res=>res.json());
}


}
