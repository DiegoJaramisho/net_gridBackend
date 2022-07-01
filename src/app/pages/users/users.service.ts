import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  constructor( private http: HttpClient ) {}

  getUsers(): Observable<any> {
    return this.http.get( `${this.apiUrl}/user` );
  }
  addUser(item:any): Observable<any> {
    return this.http.post( `${this.apiUrl}/user`, item);
  }
  editUser(id:any, item:any): Observable<any> {
    return this.http.put( `${this.apiUrl}/user/${id}`, item )
  }
  deleteUser(id:any): Observable<any> {
    return this.http.delete( `${this.apiUrl}/user/${id}` );
  }

  login(item: any){
    return this.http.post( `${this.apiUrl}/auth/login`, item);
  }

  validarToken(token:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post( `${this.apiUrl}/auth/me`, null, { headers });
  }
}
