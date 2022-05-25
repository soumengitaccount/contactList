import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { errorMonitor } from 'events';
import { application } from 'express';
import { catchError, map, Observable, Observer, throwError } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
   RestApi:String = "http://localhost:2000/api";

  constructor(private httpClint: HttpClient) { }

  addContact(contact_data:Contact):any{

   let headers = new HttpHeaders().set('Content-Type','application/json');
   let Api_url = this.RestApi+'/add-contact';
    console.log(Api_url);
    return this.httpClint.post(Api_url,contact_data,{headers:headers}).pipe(catchError(this.handelError));

 }

 
 getContacts():any{
  let Api_url = this.RestApi+'/contact-list';
  return this.httpClint.get(Api_url);
 }


 getContactById(id:any){
  let Api_url = `${this.RestApi}/getbyid`;
  let headers = new HttpHeaders();
   headers.append('content-Type','application/json')
  let data= {'_id':id};
  return this.httpClint.post(Api_url,data,{headers:headers}).pipe(catchError(this.handelError));
 }


 delContacts(_id: any){
  let Api_url = this.RestApi+'/delete-contact/'+_id;
  return this.httpClint.get(Api_url);
 }
 bulkDelete(){
   let Api_url = this.RestApi+'/bulk-delete';
   return this.httpClint.get(Api_url);
 }
updateContacts(contact_data:any){
  let headers = new HttpHeaders();
   headers.append('content-Type','application/json');
  let Api_url = this.RestApi+'/update-contacts';
  return this.httpClint.post(Api_url,contact_data,{headers:headers}).pipe(catchError(this.handelError));
 }
 
handelError(error: HttpErrorResponse) {
  let errmsg ='';
  if(error.error instanceof ErrorEvent){
    // Handele Clint side error 
    errmsg = error.error.message;
   
  }
  else{
    // server side error
    errmsg= "Eroor Code" +error.status+ "Message: "+error.message;
  }
  console.log(errmsg);
  return throwError(errmsg);
}

}
