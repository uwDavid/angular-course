import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  // to navigate to url in functions
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    // navigate to: /users/<uid>/tasks
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, //works like a redirect button, prevents users navigate here via back button
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data.'
    );
  }
  return true;
};
