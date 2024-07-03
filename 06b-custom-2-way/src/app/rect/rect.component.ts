import { Component, EventEmitter, Input, model, Output } from "@angular/core";

@Component({
    selector: "app-rect",
    standalone: true,
    imports: [],
    templateUrl: "./rect.component.html",
    styleUrl: "./rect.component.css",
})
export class RectComponent {
    // Method 1 - Input Output
    // to enable custom 2-way binding
    // @Input({ required: true }) size!: { width: string; height: string };

    // onReset - we want to set the size back to standard size
    // but, we can't just do this.size = {} ; b/c size is just an input
    // we need 2-way binding
    // we do this by using an Output
    // Note: 2-way binding is essentially input+output
    // Note: this is a special naming convention for Angular
    // tells Angular that these 2 are a pair - Angular does the heavy lifting
    // this Output is to change the value in the parent component
    // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

    // onReset() {
    //     this.sizeChange.emit({
    //         width: "200",
    //         height: "100",
    //     });
    // }

    // Angular 17.2+
    // size = a ModelSignal
    size = model.required<{ width: string; height: string }>();

    onReset() {
        this.size.set({
            width: "200",
            height: "100",
        });
    }
}
