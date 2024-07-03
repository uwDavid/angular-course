import { Directive, input } from "@angular/core";

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
    // accept input for directive - use input() or @Input
    queryParam = input("myapp"); // 'myapp' is default value

    constructor() {
        console.log("SafeLinkDirective is active!");
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do you want to leave the app?");
        if (wantsToLeave) {
            const address = (event.target as HTMLAnchorElement).href;
            //here we use a TS type casting
            (event.target as HTMLAnchorElement).href = address + "?from=" + this.queryParam();
            // here we actually change the navigation url, append the from query param
            return;
        }
        // if user chooses no => cancel navigation
        event.preventDefault();
    }
}
