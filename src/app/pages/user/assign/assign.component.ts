import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['../user.component.css']
})
export class AssignComponent implements OnInit {

  public options:Array<any> = [];
  taskForm: FormGroup;
  task: any;
  users: any;

  public taskAttributes:any = {
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl('1'),
  };

  constructor(
    public assignModal: MatDialogRef<AssignComponent>,
    public _tS: TaskService,
    public _uS: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit() {
    this.taskForm = new FormGroup(this.taskAttributes);
    this.loadUsers();
  }

  onCancel(): void {
    this.assignModal.close();
  }

  loadUsers(): void {
    this._tS.getTask(this.data.task_id).subscribe( (resp:any) => {
      this.task = resp.data;
      this.users = this.task.users;
    });
  }

  onAssign(id:string, action): void {
    this._tS.assign(this.task._id, id, action).subscribe( resp => {
      this.loadUsers();
    });
  }

  updateSelect(search){
    if(search.length >= 2){
      this._tS.usersSearch(this.task._id, search).subscribe( (resp:any) => {
        this.options = resp.data;
      })
    }
  }

}
