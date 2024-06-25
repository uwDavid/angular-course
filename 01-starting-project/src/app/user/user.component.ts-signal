import { Component, Input, computed, input } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //Component Input
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;

  // Signal Input
  avatar = input.required<string>();
  name = input.required<string>();

  // getter
  // get imagePath() {
  //   return 'assets/users/' + this.avatar;
  // }

  // computed imagePath
  imagePath = computed(() => {
    return 'assets/users/' + this.avatar;
  });

  onSelectUser() {}
}
