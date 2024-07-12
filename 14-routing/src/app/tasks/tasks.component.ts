import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // query parameter
  userId = input.required<string>();
  // for this to work - we need to set paramsInheritanceStrategy: 'always'
  // b/c it's a nested route
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId())
  );

  // order = input<'asc' | 'desc'>();
  order?: 'asc' | 'desc';
  // extra query param via Observables
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => (this.order = params['order']),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
