import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[appLog]',
    standalone: true,
    host: {
        '(click)': 'onLog()',
    },
})

// HOST DIRECTIVE
// Example - a directive that applies to a number of elements
// We create a logging directive, logs which host element was clicked
export class LogDirective {
    private elementRef = inject(ElementRef);

    onLog() {
        console.log('clicked on');
        console.log(this.elementRef.nativeElement);
    }
}
