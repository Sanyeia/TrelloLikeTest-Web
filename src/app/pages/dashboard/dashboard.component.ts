import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { MatDialog } from '@angular/material';
import { TasksComponent } from '../tasks/tasks.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { List } from '../../interfaces/interfaces';
import { TaskService } from '../../services/task.service';
import { AssignComponent } from '../user/assign/assign.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lists:Array<any> = [];

  constructor(
    public _lS: ListService,
    public _tS: TaskService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this._lS.index().subscribe((res: any) => {
      this.lists = res.data;
    });
  }

  openDialog(list_id, task_id): void {
    let dialogRef = this.dialog.open(TasksComponent, {
      width: '350px',
      data: { list: list_id, task: task_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLists();
    });
  }

  createList(title:string): void {
    let list: List = {
      title
    };
    this._lS.create(list).subscribe( resp => {
      this.getLists();
    });
  }

  deleteList(list_id:string): void {
    this._lS.remove(list_id).subscribe( resp => {
      this.getLists();
    });
  }

  getStatus(status:string) {
    return this._tS.getStatus(status);
  }

  assign(task_id:any) {
    let dialogRef = this.dialog.open(AssignComponent, {
      width: '450px',
      height: '450px',
      data: { task_id }
    });
  }

}
