import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styles: []
})
export class AssignComponent implements OnInit {

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

  onCreate(): void {
    let task: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      status: this.taskForm.get('status').value,
    };
    this._tS.create(this.data.list, task).subscribe( resp => {
      this.assignModal.close();
    });
  }

  onUpdate(): void {
    let task: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      status: this.taskForm.get('status').value,
    };
    this._tS.update(this.data.task, task).subscribe( resp => {
      this.assignModal.close();
    });
  }
}
