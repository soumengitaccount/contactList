import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb :FormBuilder, 
    private authService :AuthService,
    private  route:Router
    ) { }
    protected contactslist=[''];
    loginform:FormGroup = this.fb.group({
       email:['',Validators.required],
       password:['',[Validators.required]]
    });

  ngOnInit(): void {
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  
  form_submit_status:any='';
  form_msg:any='';
  submitted: boolean = false;

  userLogin():any{
  
    if(this.loginform.valid)
     {
      let res= this.authService.login(this.loginform.value).subscribe((res: any)=>{
        if(res.status){
         this.form_submit_status = res.status;
         this.form_msg = res.msg;
         this.loginform.reset();
         localStorage.setItem('token',res.token);
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
     else
     {
      this.submitted= true;
     }
 }
  
  logout(){
    // this is done in auth service
  }

}
