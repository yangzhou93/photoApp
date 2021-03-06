import { Component,Input, OnInit } from '@angular/core';

//import custome modules
import { IPhoto } from '../../shared/interface';
import {PhotoService} from '../../core/photo.service';
import {AuthService} from '../../core/auth.service';
import {PhotosComponent} from '../photos.component';
import {AppComponent} from '../../app.component'

//thirparty modules
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {
  photos
  subTitle: string = 'Gallery'
  photoUrl: string
  user: string = ''
  //fetch all photos from MongoDB from ngOnInit
  getPhotos(): void {
    this.photoService.getPhotos()
        .subscribe(photos => {
          this.photos = photos.reverse();
          });
  }

  getCurrentUser(): void {
    //grab the localStorage user to assign it to variable
    let user = this.authService.getUser();
    if (user){
      let userName = user['nickname']
      this.user = userName
      //set username in appComponent so it will be displayed
      this.appComponent.user = user
    }
  }



  //delete particular photo
  delete(photo): void{
    if (confirm(`Are you sure you want to delete id#: ${photo._id}?`)){
      this.photoService.deletePhoto(photo._id).subscribe(()=>{
        this.getPhotos();
        //if delete a picture, a flash message is displayed
        this._flashMessagesService.show(`Deleted ${photo._id}`, { cssClass: 'alert-success',timeout: 4000 } );
      });
    }
  }

  //like the photo
  upvote(photo){
    photo.likes += 1;
    //sync the likes property on MongoDB
    this.photoService.updatePhoto(photo._id,{likes:photo.likes}).subscribe(()=>{
    }
    )
  }

  constructor(private photoService: PhotoService,
    private photosComponent: PhotosComponent,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private appComponent: AppComponent
  ) { }


  ngOnInit(): void {

    this.photoUrl = this.photoService.baseUrl;
    this.getPhotos(); //fetch photos info from MongoDB
    this.getCurrentUser();
  }

}
