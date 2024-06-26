import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //Component Input
  @Input({ required: true }) id!: string;
  @Input({ required: true }) avatar!: string;
  @Input({ required: true }) name!: string;

  // Signal Input
  // avatar = input.required<string>();
  // name = input.required<string>();

  // getter
  get imagePath() {
    return 'assets/users/' + this.avatar;
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
    this.select.emit(this.id);
  }
}
