import { Directive } from "@angular/core";

@Directive({
    selector: "a[appSafeLink]",
    // same as component selector,
    // we typically don't just use the tag selector: 'app'
    // instead, we use the attribute selector: '[]'
    // here we apply this directive to any <a> element with the "appSafeLink" attribute
    standalone: true,
    // false - if Directive is for a NgModule
    host: {
        "(click)": "onConfirmLeavePage($event)",
    },
})

// Feature Overview
// Implement a dialog pop-up to confirm if user really want to leave
export class SafeLinkDirective {
    constructor() {
        console.log("SafeLinkDirective is active!");
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do you want to leave the app?");
        if (wantsToLeave) {
            return;
        }
        // if user chooses no => cancel navigation
        event.preventDefault();
    }
}
