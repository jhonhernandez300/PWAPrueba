import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisService {

  constructor(private http: HttpClient) { }

  obtenerFraseAleatoria(){
    return this.http.get('https://api.chucknorris.io/jokes/random');
  }

}
