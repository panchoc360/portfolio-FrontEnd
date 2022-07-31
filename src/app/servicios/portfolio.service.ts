import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Educacion, Experiencia, Persona, Proyecto, Skill } from '../Modelos';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private url = 'http://localhost:8080';
  //private url = 'https://backendfrancisco.herokuapp.com';

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get(this.url + '/obtener/portfolio');
  }

  editarPersona(datospersonamodificados : Persona):Observable<Persona>{
    return this.http.put<Persona>(this.url + '/editar/persona/', datospersonamodificados);
  }

  agregarEducacion(nuevaEducacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(this.url + '/crear/educacion/', nuevaEducacion);
  }

  eliminarEducacion(educacionaeliminar: number):Observable<any>{
    return this.http.delete<any>(this.url + '/borrar/educacion/' + educacionaeliminar);
  }

  editarEducacion(educacionaeditar : Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(this.url + '/editar/educacion/', educacionaeditar);
  }

  agregarExperiencia(nuevaExperiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(this.url + '/crear/experiencia/', nuevaExperiencia)
  }

  eliminarExperiencia(experienciaaeliminar: number):Observable<any>{
    return    this.http.delete<any>(this.url + '/borrar/experiencia/' + experienciaaeliminar)
  }

  editarExperiencia(experienciaaeditar : Experiencia):Observable<Experiencia>{
    return      this.http.put<Experiencia>(this.url + '/editar/experiencia/', experienciaaeditar);
  }

  agregarProyecto(nuevoProyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(this.url + '/crear/proyecto/', nuevoProyecto)
  }

  eliminarProyecto(proyectoaaeliminar: number):Observable<any>{
    return this.http.delete<any>(this.url + '/borrar/proyecto/' + proyectoaaeliminar)
  }

  editarProyecto(proyectoaeditar : Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(this.url + '/editar/proyecto/', proyectoaeditar)
  }

  agregarSkill(nuevaSkill: Skill):Observable<Skill>{
    return this.http.post<Skill>(this.url + '/crear/skill/', nuevaSkill)
  }

  eliminarSkill(skillaeliminar: number):Observable<any>{
    return this.http.delete<any>(this.url + '/borrar/skill/' + skillaeliminar)
  }

  editarSkill(skillaeditar : Skill):Observable<Skill>{
    return this.http.put<Skill>(this.url + '/editar/skill/', skillaeditar)
  }
}
