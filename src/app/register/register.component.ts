import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup ,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  error: String ='';


    registerForm = new FormGroup({

     first_name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
     last_name:new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
     age:new FormControl(null,[Validators.required ,Validators.min(16)]),
     email:new FormControl(null,[Validators.required,Validators.email]),
     password:new FormControl(null ,[Validators.required])
    })

  constructor(private _AuthService:AuthService,private _Router:Router) { }
  registration(registerForm:FormGroup){


    this._AuthService.register(registerForm.value).subscribe((response)=>{

     if(response.message =='success'){
  
             this._Router.navigate(['/login'])

     }
     else{
          this.error=response.errors.email.message;
     }

    })
  }

  ngOnInit(): void {
  }

}
