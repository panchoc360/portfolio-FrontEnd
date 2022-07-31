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
  skillaeditar?: number;
  formNuevo: FormGroup;
  formEditar: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private portfolioService: PortfolioService, private loggeado: AutenticacionService, private http: HttpClient) {
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
    this.portfolioService.obtenerDatos().subscribe(data =>{
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
 this.portfolioService.agregarSkill(nuevaSkill).subscribe(data => this.ngOnInit());
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
    let editarSkill: Skill = this.datosskills[skillid];
    this.formEditar.patchValue({
      idSkill: editarSkill.idSkill,
      skill: editarSkill.skill,
      nivel: editarSkill.nivel,
    })
    this.skillaeditar = skillid;
  }

  editable() : number | undefined
  {

    return this.skillaeditar;
  }
  salirEdicionSkill(){
    this.skillaeditar = undefined;

  }
  EditarSkill(){
    let editarSkill: Skill = this.formEditar.value;
    this.portfolioService.editarSkill(editarSkill).subscribe(data => this.ngOnInit());
    this.skillaeditar = undefined;
  }

  EliminarSkill(skillid : number){
    this.portfolioService.eliminarSkill(skillid).subscribe(data => {console.log(data)});
  }
}
