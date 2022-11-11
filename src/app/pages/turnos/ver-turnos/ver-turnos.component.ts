
import { TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { AllServicesService } from 'src/app/services/all-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TurnoModel } from '../../models/turno.model';


declare function cerrarModal(params:string):any;

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.scss']
})
export class VerTurnosComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  searchText: string = '';
  previous: string;

  elements: any = [];
  usuarios: any = [];
  unidades: any = [];
  rutas: any = [];
  elements1: any = [];

  opcionSeleccionado:string ='';
  verSeleccion:string ='';

  url = environment.apiUrl+'reporte';
  urlT = environment.apiUrl+'viaje'
  urlE2='/ayu'
  // urlU = environment.apiUrl+'usuario'
  urlB = environment.apiUrl+'bus/a'
  urlR = environment.apiUrl+'ruta/a'
  urlEA = environment.apiUrl+'usuario/ea';

  i: TurnoModel;
  // urlAE = environment.apiUrl+'ayu?id=';

  constructor(private cdRef: ChangeDetectorRef, private allService:AllServicesService, private pipe: TitleCasePipe) { }

  @HostListener('input') oninput() {
    this.searchItems();
  } 

  ngOnInit() {
    // tablaAExcel();
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

capturar(empleado2:string) {

    this.verSeleccion = this.opcionSeleccionado; 
}

enviarUsuario(){
  this.allService.getALL(this.urlEA).then((user:any)=>{
      this.usuarios = user.data;
      // this.elements = this.roles;
      console.log("Usuarios recibidos ", this.usuarios);})
}
enviarUnidad(){
  this.allService.getALL(this.urlB).then((user:any)=>{
      this.unidades = user.data;
      // this.elements = this.roles;
      console.log("Unidades recibidos ", this.usuarios);})
}
enviarRuta(){
  this.allService.getALL(this.urlR).then((user:any)=>{
      this.rutas = user.data;
      // this.elements = this.roles;
      console.log("Rutas recibidos ", this.usuarios);})
}


// ==============================================FORMULARIOS=====================================================
// FORM NUEVO TURNO
formCrearTurno= new FormGroup({
  
  ruta: new FormControl('', [Validators.required]),
  bus: new FormControl('',[Validators.required]),
  empleado1: new FormControl('',[Validators.required]),
  tipoEmpleado1: new FormControl('', [Validators.required]),
  empleado2: new FormControl(),
  tipoEmpleado2: new FormControl()

})

// FORM EDITAR TURNO
formEditarTurno= new FormGroup({
  
  ruta: new FormControl('', [Validators.required]),
  bus: new FormControl('',[Validators.required]),
  empleado1: new FormControl('',[Validators.required]),
  tipoEmpleado1: new FormControl('', [Validators.required]),
  empleado2: new FormControl(),
  tipoEmpleado2: new FormControl()
  

})

formNuevoEmpleado = new FormGroup({
  empleado2 : new FormControl('', [Validators.required]),
  tipoEmpleado2 : new FormControl('', [Validators.required])
})


enviarTurno(el:any){
  this.elements1 = el;
}
resetearForm(){
  // this.formCrearTurno.reset();
  
  this.formCrearTurno.setValue({
    'bus': '',
    'ruta': '',
    'empleado1': '',
    'tipoEmpleado1': '',
    'empleado2': '',
    'tipoEmpleado2': ''
  });
  
}

//  ==========================================+ METODOS CRUD TURNOS +======================================================

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
crearTurno(form:any){

  console.log("Turno a crear => ", form);

  this.allService.postALL(form, this.urlT).subscribe(data=>{
    console.log("Turno creado con éxito");
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Turno creado correctamente'
  
      });
      this.formCrearTurno.reset();
      cerrarModal('#modalCrearTurno');
      this.listarTodos();
    
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

  console.log("id que me llega", id);
  
  this.allService.getForID(this.urlT, id).then((suspension:any)=>{

    this.elements1 = [Object.values(suspension.data)];

    console.log("Datos unicos=", this.elements1);
    console.log("Dato particular =", this.elements1[0][0]);
    console.log("Dato particular =", this.elements1[0][3]._id);


    this.formEditarTurno.setValue({
  'bus': this.elements1[0][3]._id,
  'ruta': this.elements1[0][2]._id,
  'empleado1': this.pipe.transform(this.elements1[0][7].nombre +" "+this.elements1[0][7].apellido),
  // 'empleado1': this.elements1[0][7]._id,
  'tipoEmpleado1': this.elements1[0][6],
  'empleado2': this.elements1[0][5],
  'tipoEmpleado2': this.elements1[0][4]
});
console.log("datos form", this.formEditarTurno.value);
    
  })
}


// ----------------------------------------------- AGREGAR EMPLEADO AL TURNO ----------------------------------------------


agregarEmpleadoAlTurno(form: TurnoModel, id:string){

  console.log("id que me llega => ",id);


  console.log("Form a actualizar", this.formEditarTurno.value);

  this.allService.putALL(form, this.urlT+'/ayu',id).subscribe(data=>{

    console.log("Usuario se ha actualizado");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Se ha agregado el Empleado2 correctamente'
      });
      
      cerrarModal('#modalAgregarEmpleado');
      this.listarTodos();

       
},(err)=>{
  Swal.fire({
    icon: 'error',
    title: '¡Error!',
    text: err.error.message,
})      
  })

}
}

