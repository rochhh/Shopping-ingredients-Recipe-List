import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http : HttpClient) { }

  login( email : string , password: string ){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFQabusi7-txeUyg01ahVLlPji7Gja1r8', 
    {
      email : email ,
      password : password,
      returnSecureToken : true       
    } )
    .pipe( catchError(this.handleError))
  }

  signup( email: string , password : string ){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFQabusi7-txeUyg01ahVLlPji7Gja1r8', 
    {
      email : email ,
      password : password,
      returnSecureToken : true 

    }).pipe(catchError(this.handleError) )
  }

  private handleError ( errorRes : HttpErrorResponse ){
    let errorMessage = 'An unknown error occured';

    if ( !errorRes.error || !errorRes.error.error ){
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'this exail does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' Password incorrect';
        break;
        
    }
    return throwError(errorMessage)
  }

}


export interface AuthResponseData {

  idToken	:string;	
  email:	string	;
  refreshToken:	string;	
  expiresIn	:string	;
  localId	:string;
  registered? : boolean;

}