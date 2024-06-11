import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBook } from './iBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'https://localhost:7104/api/Books';

constructor(private http: HttpClient) { }

GetAll(): Observable<any> {  
    //console.log("Antes de consultar Producto GetAll");   
    return this.http.get(`${this.apiUrl}/GetAll`);
}

Save(book: IBook): Observable<any> {
    console.log("Antes de Save, el libro es " + book);
    return this.http.post(`${this.apiUrl}/Save`, book);
}

Update(book: any): Observable<any> {
  const bookJson = JSON.stringify(book); 
  console.log("Antes de Update, el libro es " + bookJson);

  return this.http.post(`${this.apiUrl}/Update`, bookJson, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

Delete(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}

