import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


 constructor(
    private fb :FormBuilder, 
    private authService :AuthService,
    private  route:Router
    ) { }
    
    protected contactslist=[''];
    registerform:FormGroup = this.fb.group({
       email:['',Validators.required],
       password:['',[Validators.required]]
    });
    get f(): { [key: string]: AbstractControl } {
      return this.registerform.controls;
    }
    
  ngOnInit(): void {
  }


  form_submit_status:any='';
  form_msg:any='';
  submitted: boolean = false;
  registerUser():any{
    // console.log(this.registerform.value);
   
    if(this.registerform.valid)
    {
      let res= this.authService.register(this.registerform.value).subscribe((res: any)=>{
        if(res.status){
         this.form_submit_status = res.status;
         this.form_msg = res.msg;
         this.registerform.reset();
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

}
