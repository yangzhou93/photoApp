import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import {ProfileComponent} from './profile/profile.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoComponent} from './photos/photo/photo.component';
import { PhotosListComponent } from './photos/photos-list/photos-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  //set up routing
  { path: 'photos',
    component: PhotosComponent,
    children:[
      {
        path: ':id',
        component: PhotoComponent,
        canActivate : [AuthGuardService]
      },
      {
        path: '',
        component: PhotosListComponent
      }
    ]},
  { path: 'users/:id', component: ProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}, //www.xx.com would direct to photos component
  { path: '**', pathMatch: 'full', redirectTo: '/login' } // wildcard, redirect to homepage if no url matched
]; // sets up routes constant where you define your routes


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
