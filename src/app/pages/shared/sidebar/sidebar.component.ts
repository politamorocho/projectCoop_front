import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UnidadModel } from '../../models/unidad.model';
import { UsuarioModel } from '../../models/usuario.model';
import { AllServicesService } from '../../../services/all-services.service';
declare function botonNav():any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  elements:any[];
  url = environment.apiUrl+'usuario';
  i:UsuarioModel;
  
  constructor(private auth: AuthServiceService, private allService : AllServicesService) { }

  ngOnInit(): void {
    botonNav();
    this.listarTodos();
  }

  logout(){
    this.auth.logout();
  }

  listarTodos(){
    this.allService.getALL(this.url).then((data:any) => {
      console.log(data);
        this.elements= data.data;
    //  console.log("Datos de usuario => ", this.elements[1]);
     
      });
  }





}
