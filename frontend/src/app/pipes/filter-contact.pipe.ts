import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContact'
})
export class FilterContactPipe implements PipeTransform {

  transform(value: any, search_value: String) {
   if(value.length === 0 || search_value==='' )
   {
    // console.log(value);
     return value;
   }
  
     const allcontacts =[];
     for (const user of value)
     {
       if(user.name.toLowerCase().match(search_value.toLocaleLowerCase()) || user.number.match(search_value)){
        
        allcontacts.push(user);
       }
    
     }

   return allcontacts;
  }

}
