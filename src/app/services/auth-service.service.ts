import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { IngresoModel } from '../pages/models/ingreso.model';
import { RecuperarModel } from '../pages/models/recuperar.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

   token :any[];

   urlG = environment.apiUrl;
 
   url = this.urlG+"auth/login";

   url2 =this.urlG+'usuario/ec';

  userToken:any;

 constructor(private http : HttpClient) { 
   this.leerToken();
 }

 logout() {
  localStorage.removeItem('token');
}


 login(logueo: IngresoModel){

  let bandera = false;

  console.log("está entrando");

  const authData ={

    cedula:logueo.cedula,

    clave : logueo.clave,

    returnSecureToken: true

  };

  console.log("info de login => ", authData);
  
  return this.http.post(
    this.url,
    authData).pipe(map(resp =>{

      this.token =  Object.values(resp);
    // console.log('TOKEN =>',this.token[0]);
      this.guardarToken(this.token[0]);

    bandera = true;

    console.log("resultado de bandera => ", bandera);
    return bandera;
    
   
    }))
 
    // return bandera;
    
}

private guardarToken( idToken: string ) {

  this.userToken = idToken;
  localStorage.setItem('token', idToken);

  // let hoy = new Date();
  // hoy.setSeconds( 3600 );

  // localStorage.setItem('expira', hoy.getTime().toString() );

}
leerToken() {

  if ( localStorage.getItem('token') ) {
    this.userToken = localStorage.getItem('token');
  } else {
    this.userToken = '';
  }

  return this.userToken;

}


estaAutenticado(): boolean {

  if ( localStorage.getItem('token') == null ) {
return false;

  }
  return true;


}

enviarCorreo(recuperar: RecuperarModel){

  const correoRecuperacion ={
    correo: recuperar.correo
  };
  console.log("Correo al que se envía => ", correoRecuperacion);

  return this.http.post(this.url2, correoRecuperacion);
  
}


}
