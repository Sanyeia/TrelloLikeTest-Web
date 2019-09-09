import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users:Array<any> = [];
  public displayedColumns: string[] = ['firstname', 'lastname', 'username', 'email'];

  constructor(
    public _uS: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._uS.index().subscribe((res: any) => {
      console.log(res.data);
      this.users = res.data;
    });
  }
}
