import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResults } from './investment-results.model';
import { InvestmentResultsComponent } from './investment-results/investment-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {
  // resultsData?: InvestmentResults[];

  // Convert to Signal
  resultsData = signal<InvestmentResults[] | undefined>(undefined);
  // TS way to define 2 possible types

  // onCalculateInvestmentResults(data: {
  //   initialInvestment: number;
  //   duration: number;
  //   annualInvestment: number;
  //   expectedReturn: number;
  // }) {

  onCalculateInvestmentResults(data: InvestmentInput) {
    // de-structure data
    const { initialInvestment, annualInvestment, expectedReturn, duration } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    // console.log(annualData);
    // this.resultsData = annualData;

    // convert to signal
    this.resultsData.set(annualData);
  }
}
