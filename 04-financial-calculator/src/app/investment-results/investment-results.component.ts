import { Component, computed, inject, input, Input } from '@angular/core';
import { InvestmentResults } from '../investment-results.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css',
})
export class InvestmentResultsComponent {
  // results = input<>()
  // @Input() results?: InvestmentResults[];
  // results = input<InvestmentResults[]>();

  private investmentService = inject(InvestmentService);

  // this works for signal
  // get results() {
  //   return this.investmentService.resultsData;
  // }
  // computed value for signal:
  // this results in a read-only signal
  results = computed(() => this.investmentService.resultsData());
  // this also works
  // results = this.investmentService.resultsData.asReadonly();
}
