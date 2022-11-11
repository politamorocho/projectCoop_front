import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { AllServicesService } from 'src/app/services/all-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UnidadModel } from '../../models/unidad.model';

declare function cerrarModal(params:string):any;

@Component({
  selector: 'app-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.scss']
  
})
export class VerUnidadComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  elements: any = [];
  elements1: any = [];
  searchText: string = '';
  previous: string;
 
  url = environment.apiUrl+'bus';

  i:UnidadModel;

  constructor(private allService: AllServicesService, private cdRef: ChangeDetectorRef) { }

  @HostListener('input') oninput() {
    this.searchItems();
  }  

// -------------------------------------------onInit--------------------------------------------
  ngOnInit(): void {
    this.listarTodos();
  }

   //  ================================BÚSQUEDA EN LA TABLA============================================ 
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

 //  ================================PAGINACIÓN DE LA TABLA============================================ 
ngAfterViewInit() {
  this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

  this.mdbTablePagination.calculateFirstItemIndex();
  this.mdbTablePagination.calculateLastItemIndex();
  this.cdRef.detectChanges();
}
// ========================================FORMULARIOS====================================================

formCrearUnidad= new FormGroup({

  numeroDisco : new FormControl('', [Validators.required,Validators.minLength(1),
    Validators.pattern('[0-9]*'), Validators.maxLength(3)]),
  placa: new FormControl('', [ Validators.required,  Validators.pattern('[a-z A-Z]{3}[-]\[0-9]{3,4}')])

})


formEditarUnidad = new FormGroup({
  numeroDisco : new FormControl('', [Validators.required,Validators.minLength(1),
    Validators.pattern('[0-9]*'), Validators.maxLength(3)]),
  placa: new FormControl('', [ Validators.required,  Validators.pattern('[a-z A-Z]{3}[-]\[0-9]{3,4}')])
  })



  get f()
{
    return this.formCrearUnidad.controls;   
}
  get f1()
{
    return this.formEditarUnidad.controls;   
}


// ENVIAR UNIDAD
enviarUnidad(el:any){
  this.elements1 =el;
  }

  // RESETEAR FORM
resetearForm(){
  this.formCrearUnidad.setValue({
    'numeroDisco':'',
    'placa': ''
  })
}
resetear(){
 this.formCrearUnidad.reset();
}


// =============================================================== CRUD UNIDAD====================================================

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



//CREAR UNIDAD
crearUnidad(form: UnidadModel){

  this.allService.postALL(form, this.url).subscribe(data=>{
    console.log("esto debe guardarse ", data);
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Unidad creada correctamente'
      });
      this.formCrearUnidad.reset();
      this.listarTodos();
        cerrarModal('#modalCrearUnidad');
     
  },(err)=>{    
Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: err.error.message,
})      
    console.log(err.error.message);
      // this.formCrearUnidad.reset();
  }) 
}

// =========================================== OBTENER POR ID ===========================================

//OBTENER POR ID
obtenerPorID(id:string){
  this.allService.getForID(this.url, id).then((unidad:any)=>{
    this.elements1 = unidad.data;
    console.log("Datos unicos=", this.elements1);
    this.formEditarUnidad.setValue({
  'numeroDisco': this.elements1.numeroDisco,
  'placa': this.elements1.placa
});
console.log("datos form", this.formEditarUnidad.value);
    
  })
}

// =========================================== EDITAR-UNIDAD ==============================================

editarUnidad( form:UnidadModel, id: string){

  this.allService.putALL(form, this.url,id).subscribe(data=>{
    console.log("unidad mofificada"); 
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Unidad actualizada correctamente'
      }); 
      cerrarModal("#modalEditarUnidad");
      this.listarTodos();
  },(err)=>{    
    Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: err.error.message,
    })      
        console.log(err.error.message);
          // this.formCrearUnidad.reset();
      }) 
  
}

// ====================================== ELIMINAR UNIDAD =============================================
eliminarUnidad( id:string){
  let form:UnidadModel = this.formEditarUnidad.value;

  console.log("id =>", id);
  
  this.allService.deleteALL(form, id, this.url).subscribe(data =>{
    console.log("lo que se va a eliminar", data);

    Swal.fire({
      icon: 'success',
      title: 'Unidad inhabilitada',
      text: '¡La unidad se ha inhabilitado correctamente!',
      
    })
  this.listarTodos();
  })



}

// ========================================== HABILITAR UNIDAD =========================================

habilitarUnidad(id:string){

  let form:UnidadModel = this.formEditarUnidad.value;
  this.allService.putALL(form, this.url+'/h',id).subscribe(data=>{
    console.log("Unidad habilitada", data);

    Swal.fire({
      icon: 'success',
      title: 'Unidad habilitada',
      text: '¡La unidad se ha habilitado correctamente!',   
    })
   this.listarTodos();
    
  })
}


}
