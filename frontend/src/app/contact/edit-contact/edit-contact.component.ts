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
  progresbar: boolean = false;
  uploadProgress: number= 0;
  imgSrc: string ='';

  
  constructor(
    private fb :FormBuilder, 
    private contactService :ContactService,
    private  route:Router,
    private activateRoute:ActivatedRoute
    ) { }
    protected contactslist=[''];
    contactform:FormGroup = this.fb.group({
      _id :[''],
       photo: [''],
       name:['',Validators.required],
       number:['',[Validators.required,Validators.maxLength(10)]]
    });
    form_submit_status:any='';
    form_msg:any='';
    contactid:any ='';
    contactname:any='';
    contactnumber:any= '';
   base_url = 'http://localhost:2000/'
  ngOnInit(): void {
    let id =this.activateRoute.snapshot.paramMap.get("id");
    this.contactService.getContactById(id).subscribe((res:any)=>{
      console.log(res);
      this.contactname = res[0].name;
      this.contactnumber = res[0].number;
      this.progresbar =true;
      this.imgSrc = `${this.base_url}${res[0].photo}`;
      
    });
    this.contactid = id
  }
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
    reader.onload = e => this.imgSrc = reader.result as string;
    reader.readAsDataURL(file); 

    
  }
  onUpdate():any{
    // console.log(this.contactform.value);
    this.formdata.append('name', this.contactform.value.name);
    this.formdata.append('number', this.contactform.value.number);
    this.formdata.append('_id', this.contactform.value._id);
    
     let res= this.contactService.updateContacts(this.formdata).subscribe((res: any)=>{
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


