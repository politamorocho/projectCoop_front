import { Component, HostListener, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { RutaModel } from '../../models/ruta.models';
import Swal from 'sweetalert2';
import { AllServicesService } from 'src/app/services/all-services.service';
declare function cerrarModal(params:string):any;

@Component({
  selector: 'app-ver-rutas',
  templateUrl: './ver-rutas.component.html',
  styleUrls: ['./ver-rutas.component.scss']
})
export class VerRutasComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  searchText: string = '';
  previous: string;
  elements:any=[];
  elements1:any=[];
  url = environment.apiUrl+'ruta';
  i:RutaModel;

  constructor( private cdRef: ChangeDetectorRef, private allService :AllServicesService) { }

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
// ==============================================FORMULARIOS=====================================================

formCrearRuta = new FormGroup({
  origen: new FormControl('', [Validators.required]),
  destino: new FormControl('', [Validators.required]),
  duracionAprox: new FormControl('', [Validators.required]) 
  
})

formEditarRuta = new FormGroup({
  origen: new FormControl('', [Validators.required]),
  destino: new FormControl('', [Validators.required]),
  // duracionAprox: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}[:]\[3-5]{1}\[0-9]{1}')]) 
  duracionAprox: new FormControl('', [Validators.required]) 
})


enviarRuta(el:any){
  this.elements1=el;

}
get f()
{
    return this.formCrearRuta.controls;   
}
  get f1()
{
    return this.formEditarRuta.controls;   
}

resetearForm(){
this.formCrearRuta.setValue({
  'origen':'',
  'destino':'',
  'duracionAprox':''
})
}
resetear(){
  this.formCrearRuta.reset();
  // this.formCrearRuta.setValue({
  //   'origen':'',
  //   'destino':'',
  //   'duracionAprox': this.formCrearRuta.get('duracionAprox')?.reset()
  // })
 }
 



// ==========================================+METODOS CRUD RUTAS +======================================================


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
crearRuta(form:RutaModel){
  console.log("form", form);
  
  this.allService.postALL(form, this.url).subscribe(data=>{
    console.log("esto debe guardarse ", data);
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Ruta creada correctamente'
      });
      this.resetear();
      cerrarModal("#modalCrearRuta");
      this.listarTodos();
  },(err)=>{    
Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: err.error.message,
})      
    console.log(err.error.message);
    // this.resetearForm();
  })
}

// ------------------------------------------------OBTENER POR ID----------------------------------------------------------


obtenerPorID(id:string){

  this.allService.getForID(this.url, id).then((ruta:any)=>{
    this.elements1 = ruta.data;
    console.log("Datos unicos=", this.elements1);
    console.log("Cedula=", this.elements1._id);
    this.formEditarRuta.setValue({
  'origen': this.elements1.origen,
  'destino': this.elements1.destino,
  'duracionAprox':this.elements1.duracionAprox

});
console.log("datos form", this.formEditarRuta.value);
    
  })
}

// --------------------------------------------------EDITAR RUTA------------------------------------------------------------


editarRuta(form: RutaModel, id:string){

  console.log("Form a actualizar", form);

  this.allService.putALL(form, this.url,id).subscribe(data=>{

    console.log("La ruta se ha actualizado");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Ruta editada correctamente'
      });
      // this.formEditarRuta.reset();
      cerrarModal('#modalEditarRuta');
      this.listarTodos();
  },(err)=>{    
    Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: err.error.message,
    })      
        console.log(err.error.message);
          // this.resetearForm();
      })    
  }

  // -----------------------------------------------------ELIMINAR RUTA-------------------------------------------------------------


  eliminarRuta(id:string){
    let form:RutaModel = this.formEditarRuta.value;

    console.log("id =>", id);
    
    this.allService.deleteALL(form, id, this.url).subscribe(data =>{
      console.log("lo que se va a eliminar", data);
      Swal.fire({
        icon: 'success',
        title: 'Ruta inhabilitada',
        text: '¡La ruta se ha inhabilitado correctamente!',
        
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

habilitarRuta(id:string){

  let form:RutaModel = this.formEditarRuta.value;
  this.allService.putALL(form, this.url+'/h',id).subscribe(data=>{
    console.log("Ruta habilitada", data);

    Swal.fire({
      icon: 'success',
      title: 'Ruta habilitada',
      text: '¡La ruta se ha habilitado correctamente!',   
    })
   this.listarTodos();
    
  })
}

}

