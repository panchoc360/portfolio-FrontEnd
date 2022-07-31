import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
url="https://backendfrancisco.herokuapp.com/iniciarsesion";
//url="http://localhost:8080/iniciarsesion";

currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
  }

  IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url, credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  get IsLogged(){

    return this.currentUserSubject.value;
  }

  Salir(){
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
