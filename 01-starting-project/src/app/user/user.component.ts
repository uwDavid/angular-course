import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  input,
  output,
} from '@angular/core';

import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent],
})
export class UserComponent {
  //Component Input
  // @Input({ required: true }) user!: {
  //   id: string;
  //   avatar: string;
  //   name: string;
  // };
  @Input({ required: true }) user!: User;

  // Signal Input
  // avatar = input.required<string>();
  // name = input.required<string>();

  // getter
  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  // computed imagePath
  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar;
  // });

  // Emit Event - Output Decorator
  // @Output() select = new EventEmitter();
  @Output() select = new EventEmitter<string>();

  // Emit Event - output
  // select = output<string>();

  // event emit handler stays the same
  onSelectUser() {
    this.select.emit(this.user.id);
  }

  // Highlight on select feature
  @Input({ required: true }) selected!: boolean;
}
