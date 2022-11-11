import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { IngresoModel } from '../../models/ingreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.scss']
})
export class LogueoComponent implements OnInit {

  logueo: IngresoModel   = new IngresoModel();
  constructor(private route: Router, private service:AuthServiceService) { }

  ngOnInit(): void {
  }

  ingresar(form:NgForm){
    if(form.invalid){
      return;
    }

    Swal.fire({
    allowOutsideClick:false,
    icon:'info',
    title:'info',
    text:'Espere por favor'

    });
    Swal.showLoading();

    this.service.login(this.logueo)
    .subscribe(resp =>{
      Swal.close();   
      this.route.navigateByUrl("/suspensiones/ver_suspension");
      console.log('esto me devuelve', resp);
      
    }, (err) =>{
    
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text:'Error en la combinación Usuario-Contraseña', 
      })
      console.log(err.error.error.message);
      form.resetForm();
    }
       
    )
  
  }
}
