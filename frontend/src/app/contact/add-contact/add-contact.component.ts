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
      photo: ['',Validators.required],
       name:['',Validators.required],
       number:['',[Validators.required,Validators.maxLength(10)]]
    });
  ngOnInit(): void {
  }
  form_submit_status:any='';
  form_msg:any='';
  progresbar:any = false;
  uploadProgress:any = 0;
  imgSrc:any ='';
  // progressvalue:String='';

  formdata = new FormData();
  showImage(event:any){
    this.progresbar = true;
    this.uploadProgress=30;
    // this.progressvalue = `width: ${this.uploadProgress}%;`

    const file: File = event.target.files[0];
   
    // const formdata = new FormData();
   
    this.formdata.append('photo',file);
    console.log(this.formdata);

    this.contactform.patchValue({photo: this.formdata});
    this.contactform.updateValueAndValidity();
    console.log(this.contactform.value.name);

    const reader = new FileReader();// 
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(file); 

    
  }
  onSubmit():any{
    // console.log(this.contactform.value);
    this.formdata.append('name', this.contactform.value.name);
    this.formdata.append('number', this.contactform.value.number);

     let res= this.contactService.addContact(this.formdata).subscribe((res: any)=>{
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
