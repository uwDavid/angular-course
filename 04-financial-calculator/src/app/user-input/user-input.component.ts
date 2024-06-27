import { Component, EventEmitter, output, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from '../investment-input.model';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  // enteredInitialInvestment = '0';
  // enteredAnnualInvestment = '0';
  // enteredExpectedReturn = '5';
  // enteredDuration = '10';

  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');
  // TS infers type from initial value -> no need to set type <>

  // emit calculate event to app component
  // @Output() calculate = new EventEmitter<{
  //   initialInvestment: number;
  //   duration: number;
  //   annualInvestment: number;
  //   expectedReturn: number;
  // }>();
  // @Output() calculate = new EventEmitter<InvestmentInput>();

  calculate = output<InvestmentInput>();

  onSubmit() {
    // console.log(this.enteredAnnualInvestment);
    this.calculate.emit({
      initialInvestment: +this.enteredInitialInvestment(),
      duration: +this.enteredDuration(),
      annualInvestment: +this.enteredAnnualInvestment(),
      expectedReturn: +this.enteredExpectedReturn(),
    });

    // this.enteredAnnualInvestment.set('0');
  }
}
