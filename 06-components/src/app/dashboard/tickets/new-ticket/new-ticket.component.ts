import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
  imports: [ControlComponent, FormsModule],
})
export class NewTicketComponent {
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  // private form = viewChild<ElementRef<HTMLFormElement>>('form'); // this is a signal
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form'); // this guarantees element
  // arg = template variable
  // ElementRef is a wrapper around the template var -> need to specify underlying type
  // initially undefined - loads after init
  onSubmit(title: string, request: string) {
    // this.form?.nativeElement.reset();
    this.form().nativeElement.reset();
  }
}
