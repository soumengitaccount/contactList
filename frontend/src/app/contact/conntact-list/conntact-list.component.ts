import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/service/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-conntact-list',
  templateUrl: './conntact-list.component.html',
  styleUrls: ['./conntact-list.component.css']
})
export class ConntactListComponent implements OnInit {

  constructor(  private contactService :ContactService,
    private route: Router) { }

   allcontacts:Contact[]= [];
   search_value:any=""; //use for filtering contacts
   base_url = 'http://localhost:2000/'

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((res:any)=>{
this.allcontacts= res;

// console.log('all contacts'+this.allcontacts);
    })
  }


  
  // delete the contact list one 
    delete(_id: any){
      if(window.confirm("Click Yes To Delete Contact"))
      this.contactService.delContacts(_id).subscribe((res:any)=>{
        console.log(res);
        this.ngOnInit();
      });
      
     }

     blulkDelete(){
      if(window.confirm("Click Yes To Delete Contact")){
        this.contactService.bulkDelete().subscribe((res:any)=>{
        this.ngOnInit();
        console.log(res);
       });
      }
     }
     editContact(id:any){
      this.route.navigate([`/edit-contact`,id]);;
     }

}
