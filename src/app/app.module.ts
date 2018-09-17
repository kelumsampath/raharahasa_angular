import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgFlashMessagesModule } from 'ng-flash-messages';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Router } from '@angular/router/src/router';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { RootComponent } from './components/root/root.component';
import { TestComponent } from './components/test/test.component';
import { FoodrecipeComponent } from './components/foodrecipes/foodrecipe/foodrecipe.component';
import { AddrecipeComponent } from './components/foodrecipes/addrecipe/addrecipe.component';
import { AllrecipeComponent } from './components/foodrecipes/allrecipe/allrecipe.component';
import { RecieviewComponent } from './components/foodrecipes/recieview/recieview.component';
import { AdminpanelComponent } from './components/admin/adminpanel/adminpanel.component';
import { SearchComponent } from './components/search/search.component';
import { FooterComponent } from './components/footer/footer.component';


const applicationRoutes:Routes = [
  {path:'',component:RootComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'foodrecipe',component:FoodrecipeComponent},
  {path:'test',component:TestComponent},
  {path:'addrecipe',component:AddrecipeComponent, canActivate: [AuthGuard]},
  {path:'allrecipe',component:AllrecipeComponent},
  {path:'allrecipe/:recipename',component:RecieviewComponent},
  {path:'profile/:recipename',component:RecieviewComponent},
  {path:'adminpanel',component:AdminpanelComponent, canActivate: [AuthGuard]},
  {path:'adminpanel/:recipename',component:RecieviewComponent,canActivate: [AuthGuard]},
  {path:'search',component:SearchComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RootComponent,
    TestComponent,
    FoodrecipeComponent,
    AddrecipeComponent,
    AllrecipeComponent,
    RecieviewComponent,
    AdminpanelComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SlideshowModule,
    RouterModule.forRoot(applicationRoutes),
    NgFlashMessagesModule.forRoot()
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
