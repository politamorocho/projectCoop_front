import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RecuperarModel } from '../../models/recuperar.model';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
  styleUrls: ['./recuperar-cuenta.component.scss']
})
export class RecuperarCuentaComponent implements OnInit {

  recu = new RecuperarModel();

  url =environment+'usuario/ec';

  constructor(private http: AuthServiceService) { }

  ngOnInit(): void {
  }

  recuperar(form: NgForm){

    this.recu
    if(form.invalid){
      return;
  }
  this.http.enviarCorreo(this.recu).subscribe(resp=>{
    console.log("correoEnviado correctamente");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Correo enviado correctamente'
      });
      form.reset();
    
  },(err)=>{    
    Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: err.error.message,
    })    
  
  })
    




}}
