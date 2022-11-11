import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnidadModel } from '../pages/models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  urlEER = '?id=';
  urlGlobal = '/p?id=';
  constructor(private http:HttpClient) { }


// ---------------------------------------------CRUD GENERAL----------------------------------------------------


// METODO GET GENERAL-----------------------------

getALL(url:string){
  return new Promise((resolve)=>{
    this.http.get(url).subscribe(data=>{
      resolve(data);
    })
  })
}

getALL1(url:string, i:any):Observable<any[]>{
  return this.http.get<any[]>(url);

}
//METODO OBTENER POR ID ---------------------------

getForID( url:string, id:string){
  return new Promise ((resolve)=>{
    this.http.get(url+this.urlGlobal+id).subscribe(data=>{
      resolve(data);
    })
  })
}
//MÉTODO POST GENERAL ---------------------------
postALL(form:any, url:string){
  return this.http.post(url, form);

}
// METODO PUT GENERAL -------------------------------

putALL(form:any, url:string, id:string){
  console.log("entro al metodo");
  
  return this.http.put(url+this.urlEER+id, form);
}


// METODO PUT CAMBIO CLAVE -------------------------------

putClave(form:any, url:string){
  console.log("entro al metodo");
  
  return this.http.put(url+this.urlEER, form);
}
// METODO DELETE GENERAL-------------------------------

deleteALL(form: any, id: string, url:string){
  let Options ={
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    }),
    body:form
  }
  return this.http.delete(url+this.urlEER+id, Options)


}

}
