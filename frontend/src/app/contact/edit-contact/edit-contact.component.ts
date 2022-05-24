import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/service/contact';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  
  constructor(
    private fb :FormBuilder, 
    private contactService :ContactService,
    private  route:Router,
    private activateRoute:ActivatedRoute
    ) { }
    protected contactslist=[''];
    contactform:FormGroup = this.fb.group({
      _id :[''],
       name:['',Validators.required],
       number:['',[Validators.required,Validators.maxLength(10)]]
    });
    form_submit_status:any='';
    form_msg:any='';
    contactid:any ='';
    contactname:any='';
    contactnumber:any= '';

  ngOnInit(): void {
    let id =this.activateRoute.snapshot.paramMap.get("id");
    this.contactService.getContactById(id).subscribe((res:any)=>{
      console.log(res[0].name);
      this.contactname = res[0].name;
      this.contactnumber = res[0].number;
      
    });
    this.contactid = id
  }

  onUpdate():any{
    // console.log(this.contactform.value);
     let res= this.contactService.updateContacts(this.contactform.value).subscribe((res: any)=>{
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
function param(param: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

