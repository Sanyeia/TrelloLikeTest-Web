import { User } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePass = true;

  registerForm: FormGroup;
  attributes: any = {
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('o'),
  };

  constructor(
    public _uS: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup(this.attributes);
  }

  register(){
    if(this.registerForm.valid){
      let user: User = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        password: this.registerForm.value.password,
        gender: this.registerForm.value.gender,
      };
      this._uS.create(user).subscribe( resp => this.router.navigate(['/login']) );
    }
  }

}
