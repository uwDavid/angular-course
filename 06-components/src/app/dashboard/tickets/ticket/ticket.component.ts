import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  // collapse ticket feature
  detailsVisible = signal(false);
  onToggleDetails() {
    // Method 1
    // this.detailsVisible.set(!this.detailsVisible());
    // note: this won't set up a subcription
    // to do that we use the effect()
    // Method 2
    // update() automatically pass in the previous state as arg
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  // close ticket feature
  close = output();

  onMarkAsCompleted() {
    this.close.emit();
  }
  // note: we listen for this close signal in tickets component
}
