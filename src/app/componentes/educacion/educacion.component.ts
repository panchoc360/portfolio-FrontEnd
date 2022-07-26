import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Educacion } from 'src/app/Modelos';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  verAgregarEducacion: boolean = false;
  editareducacion: boolean = false;
  eduaeditar: string = "";
  formNuevo: FormGroup;
  formEditar: FormGroup;

  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
    this.formNuevo = this.formBuilder.group({
      nombreInstitucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required,]],
      fin: [''],
      urlImagen: ['', [Validators.required]],
    })
    this.formEditar = this.formBuilder.group({
      idEducacion: [''],
      nombreInstitucion: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      urlImagen: ['', [Validators.required]],
    })
   }
  datosEducacion:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;
  text:string = "";
  day: string = "";

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datosEducacion = data.educacion;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }
  AgregarEducacion(){
    let nuevaEducacion: Educacion = this.formNuevo.value;
    console.log(nuevaEducacion);
    this.http.post<Educacion>('http://localhost:8080/crear/educacion/', nuevaEducacion)
    .subscribe(data => this.ngOnInit());
    this.verAgregarEducacion = false;
  }
  salirAgregarEducacion(){
    this.verAgregarEducacion = false;
  }
  VerAgregarEducacion(){
    this.verAgregarEducacion = true;
  }

  editareducacionparticular(eduid : number)
  {
    let editarEducacion: Educacion = this.datosEducacion[eduid - 1];
    this.formEditar.patchValue({
      idEducacion: eduid,
      nombreInstitucion: editarEducacion.nombreInstitucion,
      titulo: editarEducacion.titulo,
      inicio: editarEducacion.inicio,
      fin: editarEducacion.fin,
      urlImagen: editarEducacion.urlImagen
    })
    this.eduaeditar = String(eduid);
  }

  editable() : string
  {
    return this.eduaeditar;
  }
  salirEdicionEducacion(){
    this.eduaeditar = "";

  }
  EditarEducacion(){ 
       let editarEducacion: Educacion = this.formEditar.value;
    this.http.put<Educacion>('http://localhost:8080/editar/educacion/', editarEducacion)
    .subscribe(data => this.ngOnInit());
    this.eduaeditar = "";
  }
  eliminarEducacion(eduid : string){
    console.log("Eliminar " + eduid)
    this.http.delete<any>('http://localhost:8080/borrar/educacion/' + eduid)
    .subscribe(data => {console.log(data)});
  }
}
