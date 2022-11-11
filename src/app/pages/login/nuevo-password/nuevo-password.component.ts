import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { AllServicesService } from 'src/app/services/all-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NuevoPasswordModel } from '../../models/nuevoPassword.model';

@Component({
  selector: 'app-nuevo-password',
  templateUrl: './nuevo-password.component.html',
  styleUrls: ['./nuevo-password.component.scss']
})
export class NuevoPasswordComponent implements OnInit {

  url= environment.apiUrl+'usuario/nc';

  // formNuevoPassword = new NuevoPasswordModel();
  constructor( private allService: AllServicesService) { }

  ngOnInit(): void {
  }  


//                                 FORM NUEVA CLAVE
// ================================================================================
formNuevoPassword = new FormGroup({
 claveNueva : new FormControl('', [Validators.required]), 
 codigo : new FormControl('', [Validators.required]), 
}) 


get f()
{
    return this.formNuevoPassword.controls;
    console.log(this.formNuevoPassword.controls);
}


generarNuevoPassword(form: NuevoPasswordModel){


  console.log(this.url);
  
  this.allService.putClave(form, this.url).subscribe(data =>{
    console.log("esto debe guardarse ", data);
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'La contraseña se ha modificado correctamente'
      });
      this.formNuevoPassword.reset();
  },(err)=>{    
Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: err.error.message,
})      
    console.log(err.error.message);
      this.formNuevoPassword.reset();
  }) 

 

}
}
