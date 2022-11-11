import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { AllServicesService } from 'src/app/services/all-services.service';
import { RolModel } from '../../models/rol.model';

declare function cerrarModal(params:string):any;

@Component({
  selector: 'app-ver-roles',
  templateUrl: './ver-roles.component.html',
  styleUrls: ['./ver-roles.component.scss']
})
export class VerRolesComponent implements OnInit {
  rol = new RolModel();

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  elements: any = [];
  elements1: any = [];
  searchText: string = '';
  roles:any;
  previous: string;
  url = environment.apiUrl+'rol';
  i: RolModel;

  constructor(private allService: AllServicesService, private cdRef: ChangeDetectorRef) { }
  
  @HostListener('input') oninput() {
    this.searchItems();
  }  


  ngOnInit(){

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


enviarRol(el:any){
this.elements1 =el;

}

resetearForm(){
  this.formCrearRol.reset();
}

// ==============================================FORMULARIOS=====================================================

formCrearRol = new FormGroup({
 
  nombre: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]{8,19}')]),
  descripcion: new FormControl('', [Validators.required]),
  
})

formEditarRol = new FormGroup({

  nombre: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]{8,19}')]),
  descripcion: new FormControl('', [Validators.required]),
  
})

get f()
{
    return this.formCrearRol.controls;   
}
  get f1()
{
    return this.formEditarRol.controls;   
}

// ==========================================+ METODOS CRUD ROLES +======================================================

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


crearRol(form: RolModel){
console.log("info", form);

this.allService.postALL(form, this.url).subscribe(data=>{
  console.log("esto debe guardarse ", data);

  Swal.fire({
    allowOutsideClick:false,
    icon:'info',
    title:'info',
    text:'Rol creado correctamente'
    });
    this.formCrearRol.reset();
    cerrarModal('#modalCrearRol');
    this.listarTodos();
  
},(err)=>{    
  Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: err.error.message,
  })    

}
)}
// ------------------------------------------------OBTENER POR ID----------------------------------------------------------


obtenerPorID(id:string){
  this.allService.getForID(this.url, id).then((ruta:any)=>{
    this.elements1 = ruta.data;
    console.log("Datos unicos=", this.elements1);
    this.formEditarRol.setValue({
  'nombre': this.elements1.nombre,
  'descripcion': this.elements1.descripcion
});
console.log("datos form", this.formEditarRol.value);
    
  })
}

// --------------------------------------------------EDITAR ROl------------------------------------------------------------


editarRol(form: RolModel, id:string){

  console.log("Form a actualizar", form);

  this.allService.putALL(form, this.url,id).subscribe(data=>{

    console.log("Rol se ha actualizado");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Rol editado correctamente'
      });
      this.formEditarRol.reset();
      cerrarModal('#modalEditarRol');
  },(err)=>{    
    Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: err.error.message,
    })    
  
  }
  )   
  }

    // -----------------------------------------------------ELIMINAR ROL-------------------------------------------------------------


    eliminarRol(id:string){
      let form:RolModel = this.formEditarRol.value;
  
      console.log("id =>", id);
      
      this.allService.deleteALL(form, id, this.url).subscribe(data =>{
        console.log("lo que se va a eliminar", data);
        Swal.fire({
          icon: 'success',
          title: 'Rol inhabilitado',
          text: '¡El rol se ha inhabilitado correctamente!',
          
        })
        this.listarTodos();
        
      },(err)=>{    
        Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: err.error.message,
        })      
     
    })
  
  }

// ========================================== HABILITAR UNIDAD =========================================

habilitarRol(id:string){

  let form:RolModel = this.formEditarRol.value;
  this.allService.putALL(form, this.url+'/h',id).subscribe(data=>{
    console.log("Unidad habilitada", data);

    Swal.fire({
      icon: 'success',
      title: 'Rol habilitado',
      text: '¡El rol se ha habilitado correctamente!',   
    })
   this.listarTodos();
    
  })
}





}
