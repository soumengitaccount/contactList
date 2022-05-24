import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb :FormBuilder, 
    private contactService :ContactService,
    private  route:Router
    ) { }
    protected contactslist=[''];
    loginform:FormGroup = this.fb.group({
       email:['',Validators.required],
       password:['',[Validators.required,Validators.maxLength(10)]]
    });
  ngOnInit(): void {
  }
  form_submit_status:any='';
  form_msg:any='';
  onSubmit():any{
    // console.log(this.loginform.value);
     let res= this.contactService.addContact(this.loginform.value).subscribe((res: any)=>{
       if(res.status){
        this.form_submit_status = res.status;
        this.form_msg = res.msg;
        this.loginform.reset();
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
