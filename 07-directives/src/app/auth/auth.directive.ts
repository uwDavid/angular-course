import {
    Directive,
    effect,
    inject,
    input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
    selector: '[appAuth]',
    standalone: true,
})
export class AuthDirective {
    userType = input.required<Permission>({ alias: 'appAuth' });
    private authService = inject(AuthService);

    // To make this directive work => we need to inject 2 more items
    private templateRef = inject(TemplateRef);
    //Tells Angular: this directive will be used on a TemplateRef
    // we will have ref to everything inside the ng-template
    // ie. content within the template
    private viewContainerRef = inject(ViewContainerRef);
    // Ref to where in the DOM the template is used
    // ie. access to the place in DOM
    // Result: we can tell Angular WHERE to render WHAT

    constructor() {
        // listen to signal via effect()
        // we want to run this code whenever user permission changes || input value changes
        effect(() => {
            if (this.authService.activePermission() === this.userType()) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
                // Tells Angular: take content in ng-template tags => render the content inside in place of the ng-template
                // console.log('Show Element');
            } else {
                this.viewContainerRef.clear();
                // remove content
                // console.log('DO NOT SHOW ELEMENT');
            }
        });
    }
}
