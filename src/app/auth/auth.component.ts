import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLoginMode : boolean =true;
  isLoading : boolean = false;
  error : string = null ;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode
  }

  onSubmit(form : NgForm){
    

    this.isLoading = true;

    if (!form.valid){
      return ;
    }
    const email = form.value.email;
    const password =form.value.password;
    let authObs: Observable<AuthResponseData> ;

    if (this.isLoginMode){
     

      authObs=this.authService.login(email , password)

    }
    else {
      authObs =this.authService.signup(email , password)
    }

    authObs.subscribe(  
      response => {
        console.log(response)
        this.isLoading = false
      } , errorMessage=> {
        console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false
      }
      
    )

    form.reset();
  }
  

  constructor(private authService  : AuthserviceService) { }

  ngOnInit(): void {
  }

}
