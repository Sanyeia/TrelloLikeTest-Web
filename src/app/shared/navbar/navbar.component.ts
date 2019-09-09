import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material';
import { TasksComponent } from 'src/app/pages/tasks/tasks.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tgglSearch:boolean = false;
  public options:Array<any> = [];

  constructor(
    public _uS: UserService,
    public _tS: TaskService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this._uS.logout();
    this.router.navigate(['/login']);
  }

  openDialog(list_id, task_id): void {
    const dialogRef = this.dialog.open(TasksComponent, {
      width: '350px',
      data: { list: list_id, task: task_id }
    });
  }

  updateSelect(search){
    if(search.length >= 2){
      this._tS.search(search).subscribe( (resp:any) => {
        this.options = resp.data;
      })
    }
  }

}
