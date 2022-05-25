import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  RestApi:String = "http://localhost:2000/api";

  constructor(private httpClint: HttpClient) { }


  register(user_data:any){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    let Api_url = this.RestApi+'/register';
    return this.httpClint.post(Api_url,user_data,{headers:headers}).pipe(catchError(this.handelError));
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
