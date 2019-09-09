import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  userForm: FormGroup;
  attributes: any = {
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  };

  constructor(
    public _uS: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup(this.attributes);
  }

  login(){
    if(this.userForm.valid){
      let credential = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
      };
      this._uS.login(credential).subscribe( (resp) => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
