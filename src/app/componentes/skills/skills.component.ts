import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Skill } from 'src/app/Modelos';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  verAgregarSkill: boolean = false;
  editarskill: boolean = false;
  skillaeditar: string = "";
  formNuevo: FormGroup;
  formEditar: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private datosPortfolio: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
    this.formNuevo = this.formBuilder.group({
      skill: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
    })
    this.formEditar = this.formBuilder.group({
      idSkill: [''],
      skill: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
    })
  }

  datosskills:any;
  editIcon = faPen;
  faCheck = faCheck;
  faX = faX;
  agregarIcono = faAdd;
  faeliminar = faTrash;

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.datosskills = data.skill;
    })
  }
  UsuarioLogueado(){
    let currentUser = this.loggeado.IsLogged;
    if (currentUser && currentUser.token)
    return true;
    else
    return false;
  }

  AgregarSkill(){
    let nuevaSkill: Skill = this.formNuevo.value;
    console.log(nuevaSkill);
    this.http.post<Skill>('http://localhost:8080/crear/skill/', nuevaSkill)
    .subscribe(data => this.ngOnInit());
    this.verAgregarSkill = false;
  }
  salirAgregarSkill(){
    this.verAgregarSkill = false;
  }
  VerAgregarSkill(){
    this.verAgregarSkill = true;
  }

  editarskillparticular(skillid : number)
  {
    let editarSkill: Skill = this.datosskills[skillid - 1];
    this.formEditar.patchValue({
      idSkill: skillid,
      skill: editarSkill.skill,
      nivel: editarSkill.nivel,
    })
    this.skillaeditar = String(skillid);
  }

  editable() : string
  {

    return this.skillaeditar;
  }
  salirEdicionSkill(){
    this.skillaeditar = "";

  }
  EditarSkill(){
    let editarSkill: Skill = this.formEditar.value;
    this.http.put<Skill>('http://localhost:8080/editar/skill/', editarSkill)
    .subscribe(data => this.ngOnInit());
    this.skillaeditar = "";
  }

  EliminarSkill(skillid : string){
    console.log("Eliminar " + skillid)
    this.http.delete<any>('http://localhost:8080/borrar/skill/' + skillid)
    .subscribe(data => {console.log(data)});
  }
}
