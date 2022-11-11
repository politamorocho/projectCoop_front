import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalService, MdbTableDirective, MdbTablePaginationComponent, ModalModule } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllServicesService } from '../../../services/all-services.service';
import { SuspensionModel } from '../../models/suspension.model';

declare function cerrarModal(params:string):any;


@Component({
  selector: 'app-ver-suspension',
  templateUrl: './ver-suspension.component.html',
  styleUrls: ['./ver-suspension.component.scss']
})
export class VerSuspensionComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;

  searchText: string = '';
  previous: string;
  usuarios:any = [];
  elements: any = [];
  elements1: any = [];
  url = environment.apiUrl+'suspension';
  // urlU = environment.apiUrl+'usuario';
  urlEA = environment.apiUrl+'usuario/ea';

  i:SuspensionModel;
  


  constructor(private cdRef: ChangeDetectorRef, private allService:AllServicesService, private date: DatePipe) { }
  @HostListener('input') oninput() {
    this.searchItems();
  } 
  ngOnInit(): void {
 
this.listarTodos();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
        this.mdbTable.setDataSource(this.previous);
        this.elements = this.mdbTable.getDataSource();     
    }
        
    if (this.searchText) {
        this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
        this.mdbTable.setDataSource(prev);
    }

}
ngAfterViewInit() {
  this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

  this.mdbTablePagination.calculateFirstItemIndex();
  this.mdbTablePagination.calculateLastItemIndex();
  this.cdRef.detectChanges();
}

enviarUsuario(){
  this.allService.getALL(this.urlEA).then((user:any)=>{
      this.usuarios = user.data;
      // this.elements = this.roles;
      console.log("usuarios recibidos ", this.usuarios);})
}

enviarSuspension(el:any){
  this.elements1 = el;
}

resetearForm(){
  this.formCrearSuspension.setValue({
    'inicio':'',
    'final':'',
    'descripcion':'',
    'usuario':''
  })
}


// ==============================================FORMULARIOS=====================================================
// FORM NUEVO USUARIO
formCrearSuspension= new FormGroup({
  
  inicio: new FormControl('', [Validators.required]),
  final:  new FormControl('', [Validators.required]),
  descripcion :  new FormControl('', [Validators.required]),
  usuario: new FormControl('', [Validators.required]),

})


formEditarSuspension = new FormGroup({
  _id : new FormControl('', [Validators.required]),
  inicio: new FormControl('', [Validators.required]),
  final:  new FormControl('', [Validators.required]),
  descripcion :  new FormControl('', [Validators.required]),
  usuario: new FormControl('', [Validators.required]),

})
//  ==========================================+ METODOS CRUD ROLES +======================================================

listarTodos(){
  this.allService.getALL1(this.url,this.i).subscribe(data => {
    console.log(data);
      this.elements= data;
      this.elements = this.elements.data;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
}


// ------------------------------------------------CREAR-----------------------------------------------------------
crearSuspension(form:any){
  

  console.log("Suspension a crear => ", form);

  this.allService.postALL(form, this.url).subscribe(data=>{
    console.log("usuario creado con éxito");
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Suspensión guardada correctamente'
  
      });
      this.formCrearSuspension.reset();
      this.listarTodos();
      cerrarModal('#modalCrearSuspension');
    
},(err)=>{
  Swal.fire({
    icon: 'error',
    title: '¡Error!',
    text: err.error.message,
})      
  })


}

// ------------------------------------------------OBTENER POR ID----------------------------------------------------------

obtenerPorID(id:string){
  this.allService.getForID(this.url, id).then((suspension:any)=>{

    this.elements1 = [Object.values(suspension.data)];


    console.log("Datos unicos=", this.elements1);
    console.log("ID =", this.elements1[0][0]);
    console.log("fecha Inicio =", this.elements1[0][4]);
    console.log("fecha Fin =", this.elements1[0][3]);
    console.log("Dato particular =", this.elements1[0][1].nombre);


    this.formEditarSuspension.setValue({

      // datePipe.transform('2019-04-13T00:00:00', 'yyyy-MM-dd');
     '_id':this.elements1[0][0], 
  'inicio': this.date.transform (this.elements1[0][4],'yyyy-MM-dd','UTC'),
  'final': this.date.transform (this.elements1[0][3],'yyyy-MM-dd','UTC'),


  // 'inicio':this.elements1[0][4],
  // 'final': this.elements1[0][3],


  'descripcion': this.elements1[0][2],
  'usuario': this.elements1[0][1]._id
});
console.log("datos form", this.formEditarSuspension.value);
    
  })
}

// --------------------------------------------------EDITAR USUARIO------------------------------------------------------------


editarSuspension(form: SuspensionModel, id:string){

  console.log("id que me llega => ",id);
  

  console.log("Form a actualizar", this.formEditarSuspension.value);

  this.allService.putALL(form, this.url,id).subscribe(data=>{

    console.log("Usuario se ha actualizado");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Suspensión editada correctamente'
      });
      this.formEditarSuspension.reset();

      this.listarTodos();
      cerrarModal('#modalEditarSuspension');
  })   
  }


  // / -------------------------------------------------- ELIMINAR LA SUSPENSION ------------------------------------------------------------




eliminarSuspension( id:string){
  let form:SuspensionModel = this.formEditarSuspension.value;

  console.log("id =>", id);
  
  this.allService.deleteALL(form, id, this.url).subscribe(data =>{
    console.log("lo que se va a eliminar", data);
    
  })

  Swal.fire({
    icon: 'success',
    title: 'Suspensión eliminada',
    text: '¡La suspensión se ha eliminado correctamente!',
    
  })
  // this.formEditarUnidad.reset();
 
}

}
