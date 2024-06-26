import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // 1 - create event emitter
  @Output() cancel = new EventEmitter<void>();

  // 2 - emit event via event emitter
  onCancel() {
    this.cancel.emit();
  }

  // Get Form Data
  enteredTitle = signal(''); // signal formal
  // enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  // to emit data to tasks
  // @Output() add = new EventEmitter<{
  //   title: string;
  //   summary: string;
  //   date: string;
  // }>();
  @Output() add = new EventEmitter<NewTaskData>();

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle(),
      summary: this.enteredSummary,
      date: this.enteredDate,
    });
  }
}
