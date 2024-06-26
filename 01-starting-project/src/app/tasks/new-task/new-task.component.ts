import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTaskData } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  // DI
  private tasksService = inject(TasksService);

  @Input({ required: true }) userId!: string;

  // 1 - create event emitter
  @Output() close = new EventEmitter<void>();

  // 2 - emit event via event emitter
  onCancel() {
    this.close.emit();
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
  // @Output() add = new EventEmitter<NewTaskData>();

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}
