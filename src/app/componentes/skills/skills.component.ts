import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { faPen, faAdd, faTrash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  verAgregarSkill: boolean = false;
  editarskill: boolean = false;
  skillaeditar: string = "";

  constructor(private datosPortfolio: PortfolioService, private loggeado: AutenticacionService) { }

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

    //aca va codigo para agregar la experiencia
  }
  salirAgregarSkill(){
    this.verAgregarSkill = false;
  }
  VerAgregarSkill(){
    this.verAgregarSkill = true;
  }

  editarskillparticular(skillid : string)
  {
    this.skillaeditar = skillid;
    console.log(skillid);
  }

  editable() : string
  {
    return this.skillaeditar;
  }
  salirEdicionSkill(){
    this.skillaeditar = "";

  }
  EditarSkill(){
    console.log("Skill " + this.skillaeditar + " editada");
  }
}
