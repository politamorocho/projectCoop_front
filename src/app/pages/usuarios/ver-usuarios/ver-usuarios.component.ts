import { ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AllServicesService } from 'src/app/services/all-services.service';
import { RolModel } from '../../models/rol.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare function cerrarModal(params:string):any;

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.scss']
})
export class VerUsuariosComponent implements OnInit {


  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  roles:any =[];
  searchText: string = '';
  opcionSeleccionado:string ='';
  verSeleccion:string ='';
  elements: any = [];
  elements1: any = [];
  elements2: any = [];
  previous: string;
  validador :boolean;
  cedula:string ="";

  url = environment.apiUrl+'usuario';
  urlR = environment.apiUrl+'rol';

  i: UsuarioModel;
  i2: RolModel;

  constructor(private allService: AllServicesService, private cdRef: ChangeDetectorRef) { }

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

 capturar(rol:string) {

    this.verSeleccion = this.opcionSeleccionado;
    // console.log('Esto se captura =>', this.verSeleccion );
    
}
 capturar2(roles:any) {
    
this.roles = roles;
   for (let i = 0; i < this.roles.length; i++) {
        const element = this.roles[i].nombre;
        if(this.opcionSeleccionado == this.roles[i]._id){
          this.verSeleccion = this.roles[i].nombre
          console.log('esto se va al html', this.verSeleccion);  
      }
      
  }

}

ngAfterViewInit() {
  this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
  this.mdbTablePagination.calculateFirstItemIndex();
  this.mdbTablePagination.calculateLastItemIndex();
  this.cdRef.detectChanges();
}

validarCedula(cedula: String) {
  let cedulaCorrecta = false;
  
  if (cedula.length == 10)
  {    
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
      
          // El ultimo digito se lo considera dígito verificador
          let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];       
          let verificador = parseInt(cedula.substring(9, 10));
          let suma:number = 0;
          let digito:number = 0;
          for (let i = 0; i < (cedula.length - 1); i++) {
              digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];      
              suma += ((parseInt((digito % 10)+'') + (parseInt((digito / 10)+''))));
        //      console.log(suma+" suma"+coefValCedula[i]); 
          }
          
          suma= Math.round(suma);
        
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);

          if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10)== verificador)) {
              cedulaCorrecta = true;
          } else if ((10 - (Math.round(suma % 10))) == verificador) {
              cedulaCorrecta = true;
          } else {
              cedulaCorrecta = false;
          }
      } else {
          cedulaCorrecta = false;
      }
  } else {
      cedulaCorrecta = false;
  }


this.validador= cedulaCorrecta;

  
}



// ==============================================FORMULARIOS=====================================================
// FORM NUEVO USUARIO
formCrearUsuario = new FormGroup({
   id : new FormControl(''),
  rol: new FormControl('', [Validators.required]),
  nombre:  new FormControl('', [Validators.required]),
  apellido :  new FormControl('', [Validators.required]),
  cedula: new FormControl('', [Validators.required, Validators.minLength(10)]),

  // ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$ 
  correo: new FormControl('', [Validators.required,Validators.pattern('^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')]),
  // correo: new FormControl('', [Validators.pattern(' ^ [_ a-zA-Z0-9 -] + (\. [_ A-zA-Z0-9 -] +) * @ [a-zA-Z0-9 -] + (\. [a-zA-Z0-9 -] +) * (\. [a-zA-Z] {2,}) $ /')]),
  claveUsuario:  new FormControl('',[Validators.required, Validators.minLength(6)]),
  tipo:  new FormControl()

})


formEditarUsuario = new FormGroup({
  _id: new FormControl( [Validators.required]),
  rol: new FormControl('', [Validators.required]),
  nombre:  new FormControl('', [Validators.required]),
  apellido :  new FormControl('', [Validators.required]),
  cedula: new FormControl('', [Validators.required]),
  correo: new FormControl(''),
  // claveUsuario:  new FormControl(''),
  tipo:  new FormControl(''),
  // estado :  new FormControl('')
})



get f()
{
    return this.formCrearUsuario.controls;   
}
  get f1()
{
    return this.formEditarUsuario.controls;   
}

// Enviar datos a los componentes

enviarUsuario(el:any){
  this.elements1 = [Object.values(el)];
  console.log("esto envío: ", this.elements1);
  
}


enviarRol(){
  this.allService.getALL1(this.urlR+'/a', this.i2).subscribe(data=>{
    this.elements2 =data;
    this.elements2 = this.elements2.data;
    console.log("id de rol", this.elements2[0]._id); 
  })
}

resetearForm(){
this.formCrearUsuario.setValue({
  'id' : '',
  'rol': '',
  'nombre':  '',
  'apellido' :  '',
  'cedula':'',
  'correo':'',
  'claveUsuario': '', 
  'tipo': ''
})
}
resetearE(form:any){
form.reset;
console.log("Form Reseteado");

}

resetear(){
  this.formCrearUsuario.reset();
}
// resetearE(){
//   this.formEditarUsuario.reset();
// }

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
crearUsuario(form:any){

  console.log("Usuario a crear => ", form);

  this.allService.postALL(form, this.url).subscribe(data=>{
    console.log("usuario creado con éxito");
    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Usuario guardado correctamente'
  
      });
      this.formCrearUsuario.reset();
      cerrarModal("#modalCrearUsuario");
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

obtenerPorID(id:string ){
  
  this.allService.getForID(this.url, id).then((usuarios:any)=>{
    this.elements1 = [Object.values(usuarios.data)];
  

    if(this.elements1[0][3].nombre =='empleado'){
      this.formEditarUsuario.setValue({ 
        '_id':this.elements1[0][0],
        'rol':  this.elements1[0][3].nombre,
        'nombre': this.elements1[0][7],
        'apellido' :  this.elements1[0][6],
        'cedula': this.elements1[0][4],
        'correo': '',
        // 'claveUsuario':  this.elements1.claveUsuario,
        'tipo': this.elements1[0][2]
  
  });

    }else{

    console.log("Datos unicos =", this.elements1);
    console.log("Dato particular =", this.elements1[0][0]);
    console.log("id de rol =", this.elements1[0][3].nombre);
    this.formEditarUsuario.setValue({ 
      '_id':this.elements1[0][0],
      'rol':  this.elements1[0][3].nombre,
      'nombre': this.elements1[0][7],
      'apellido' :  this.elements1[0][6],
      'cedula': this.elements1[0][4],
      'correo': this.elements1[0][5],
      // 'claveUsuario':  this.elements1.claveUsuario,
      'tipo': ''
      // 'tipo': this.elements1[0][2]

});
console.log("datos form", this.formEditarUsuario.value);
}
  })
}
// --------------------------------------------------EDITAR USUARIO------------------------------------------------------------

editarUsuario(form: UsuarioModel, id:string){

  console.log("id que me llega => ",id);
  

  console.log("Form a actualizar", this.formEditarUsuario.value);

  this.allService.putALL(form, this.url,id).subscribe(data=>{

    console.log("Usuario se ha actualizado");

    Swal.fire({
      allowOutsideClick:false,
      icon:'info',
      title:'info',
      text:'Usuario editado correctamente'
      });
      this.formEditarUsuario.reset();
      cerrarModal('#modalEditarUsuario');
      this.listarTodos();
  }, (err)=>{
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: err.error.message,
  })      
    })   
  }


// ELIMINAR UNIDAD
eliminarUsuario( id:string){
  let form:UsuarioModel = this.formEditarUsuario.value;

  console.log("id =>", id);
  
  this.allService.deleteALL(form, id, this.url).subscribe(data =>{
    console.log("lo que se va a eliminar", data);

    Swal.fire({
      icon: 'success',
      title: 'Usuario inhabilitado',
      text: '¡El usuario se ha inhabilitado correctamente!',
      
    })
    this.listarTodos();
    
  })

  
  // this.formEditarUnidad.reset();
 
}

// ========================================== HABILITAR UNIDAD =========================================

habilitarUsuario(id:string){

  let form:UsuarioModel = this.formEditarUsuario.value;
  this.allService.putALL(form, this.url+'/h',id).subscribe(data=>{
    console.log("Usuario habilitado", data);

    Swal.fire({
      icon: 'success',
      title: 'Usuario habilitado',
      text: '¡El usuario se ha habilitado correctamente!',   
    })
   this.listarTodos();
  
    
  })
}



}

