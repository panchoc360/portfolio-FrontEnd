import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  @Input() logged: boolean = false;
  @Output() salir = new EventEmitter();
  form: FormGroup;

  constructor(private FormBuilder:FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router) {
    this.form=this.FormBuilder.group({
      email:['',[Validators.required, Validators.email]],
      contra:['',[Validators.required, Validators.minLength(8)]],
    })
  }

  token: string = "";
  ngOnInit(): void {
  }

  get Email(){
    return this.form.get("email");
  }
  get Password(){
    return this.form.get("contra");
  }

  onEnviar(event:Event){
    event.preventDefault;
    console.log(this.form.value);
    this.autenticacionService.IniciarSesion(this.form.value).subscribe(data=>{
      this.token = data.token;
      this.logged = true;
      this.salir.emit();
      this.ruta.navigate(['/portfolio']);
    },
    err => console.log("No autorizado")

    )
    
    
  }
}
