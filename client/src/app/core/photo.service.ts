import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

//custome modules
import { IPhoto } from '../shared/interface';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root' //make this service availabel for the whole app
})

export class PhotoService {
  baseUrl = environment.baseUrl; //'extract baseUrl from environment setting'

  //CRUD operations as follows. returning observable to accomodate asynchronous call
  getPhotos(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/photos`,{ withCredentials: true });
  }

  getPhoto(photoId): Observable<any>{
    //this observable returns the full response from the server, including headers, status, etc.
    return this.http.get(`${this.baseUrl}api/photos/${photoId}`,{ observe: 'response' })
  }

  deletePhoto(photoId: number){
    return this.http.delete(`${this.baseUrl}api/photos/${photoId}`);
  }

  uploadPhoto(data){
    return this.http.post(`${this.baseUrl}api/photos/`,data)
  }

  updatePhoto(id,data){
    return this.http.put(`${this.baseUrl}api/photos/${id}`,data)
  }


  constructor(
    private http: HttpClient
  ) { }
}
