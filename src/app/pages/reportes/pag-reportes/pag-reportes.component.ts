import { Component, OnInit } from '@angular/core';import { Subject } from 'rxjs';
;
import { AllServicesService } from 'src/app/services/all-services.service';
import { environment } from 'src/environments/environment';


// declare function tablaAExcel():any;

@Component({
  selector: 'app-pag-reportes',
  templateUrl: './pag-reportes.component.html',
  styleUrls: ['./pag-reportes.component.scss']
})
export class PagReportesComponent implements OnInit {

    url = environment.apiUrl+'reporte';
    elements: any = [];
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    
  constructor(private allService: AllServicesService) { }



  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: false,
      searching: true,
      
      // scrollY: 285,
      lengthMenu: [5, 10, 25, 50, 100],

      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
     
        'excel',
        'pdf'
        
      ],
    //   columns: [
    //     //any column configuration
    //     { visible: true }, //col 1
    //     { visible: true }, //col 2
    //     { visible: true }, //col 3
    //     { visible: true }, //col 4
    //     { visible: true }, //col 5
    //     { visible: true }, //col 6 
    //     { visible: true }, //col 7
    //     { visible: true }, //col 8 
    //     { visible: true }  //col 9 
    // ],
      language:{

        "decimal": "",
      "emptyTable": "No hay información",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
      "infoEmpty": " 0 to 0 of 0 Entradas",
      "infoFiltered": "(Filtrado de _MAX_ total entradas)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ Entradas",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": ">",
          "previous": "<"
      }
      },
      responsive: true,
    //   columns: [
    //     { responsivePriority: 1 },
    //     { responsivePriority: 2 },
    //     { responsivePriority: 3 },
    //     { responsivePriority: 4 },
    //     { responsivePriority: 5 },
    //     { responsivePriority: 6 }
    // ]
   
    };

 
    // tablaAExcel();
  this.allService.getALL(this.url).then((reporte:any)=>{
        this.elements = reporte.data;
        console.log("Info para reportes: ", this.elements);

        this.dtTrigger.next();
        
  })
    
  }




}
