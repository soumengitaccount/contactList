import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/service/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(
    private fb :FormBuilder, 
    private contactService :ContactService,
    private  route:Router
    ) { }
    protected contactslist=[''];
    contactform:FormGroup = this.fb.group({
       name:['',Validators.required],
       number:['',[Validators.required,Validators.maxLength(10)]]
    });
  ngOnInit(): void {
  }
  form_submit_status:any='';
  form_msg:any='';
  onSubmit():any{
    // console.log(this.contactform.value);
     let res= this.contactService.addContact(this.contactform.value).subscribe((res: any)=>{
       if(res.status){
        this.form_submit_status = res.status;
        this.form_msg = res.msg;
        this.contactform.reset();
        console.log(res);
         setTimeout(()=>{
           this.route.navigate(['/contacts'])
         },1500)
       }
       else{
        this.form_submit_status = res.status;
        this.form_msg = res.msg;
       }
    
     });
    
  }
}
