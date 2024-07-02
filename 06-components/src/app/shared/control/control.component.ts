import {
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    // event listener
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  label = input.required<string>();

  // another way to add class to component
  // @HostBinding() className = 'control';
  // // 'class' = actual property to bind to
  // @HostBinding('class') className = 'control';

  // access Host Element programmatically
  private el = inject(ElementRef);

  // Content Child
  // @ContentChild('input') private control?: ElementRef<
  //   HTMLInputElement | HTMLTextAreaElement
  // >;

  // Content Child Signal
  private control =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  onClick() {
    console.log('Clicked');
    console.log(this.el);

    // Using Content Child
    // console.log(this.control);
    console.log(this.control());
  }

  // @HostListener('click') onClick() {
  //   console.log('Clicked');
  // }
}
