import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();
  private userServce = inject(UsersService);

  userName = computed(
    () => this.userServce.users.find((u) => u.id === this.userId())?.name
  );
}
