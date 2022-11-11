import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: boolean, traducir:string[]=["Deshabilitado", "Habilitado"]): string {

    if(value == false){
      return(traducir[0]);
    }else{
      return (traducir[1]);
    }
    
  }

}
