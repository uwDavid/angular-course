import { Injectable, signal } from '@angular/core';
import { InvestmentInput } from './investment-input.model';
import { InvestmentResults } from './investment-results.model';

@Injectable({ providedIn: 'root' })
export class InvestmentService {
  //a- return results via property
  // resultsData?: InvestmentResults[];
  //b- return results via signal
  resultsData = signal<InvestmentResults[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
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
    // signal version:
    this.resultsData.set(annualData);

    // convert to signal
    // this.resultsData.set(annualData);
  }
}
