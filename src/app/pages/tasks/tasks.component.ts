import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskForm: FormGroup;
  task: any;

  public taskAttributes:any = {
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    status: new FormControl('1'),
  };

  constructor(
    public taskModal: MatDialogRef<TasksComponent>,
    public _tS: TaskService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit() {
    this.taskForm = new FormGroup(this.taskAttributes);
    if(this.data.task){
      this.setFields();
    }
  }

  onCancel(): void {
    this.taskModal.close();
  }

  setFields(): void {
    this._tS.getTask(this.data.task).subscribe( (resp:any) => {
      this.task = resp.data;
      this.taskForm.get('title').setValue(this.task.title);
      this.taskForm.get('description').setValue(this.task.description);
      this.taskForm.get('status').setValue(this.task.status);
    });
  }

  onCreate(): void {
    let task: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      status: this.taskForm.get('status').value,
    };
    this._tS.create(this.data.list, task).subscribe( resp => {
      this.taskModal.close();
    });
  }

  onUpdate(): void {
    let task: Task = {
      title: this.taskForm.get('title').value,
      description: this.taskForm.get('description').value,
      status: this.taskForm.get('status').value,
    };
    this._tS.update(this.data.task, task).subscribe( resp => {
      this.taskModal.close();
    });
  }
}
