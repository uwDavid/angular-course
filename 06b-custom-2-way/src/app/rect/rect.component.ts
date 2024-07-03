import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-rect",
    standalone: true,
    imports: [],
    templateUrl: "./rect.component.html",
    styleUrl: "./rect.component.css",
})
export class RectComponent {
    // to enable custom 2-way binding
    @Input({ required: true }) size!: { width: string; height: string };

    // onReset - we want to set the size back to standard size
    // but, we can't just do this.size = {} ; b/c size is just an input
    // we need 2-way binding
    // we do this by using an Output
    // Note: 2-way binding is essentially input+output
    @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();
    // Note: this is a special naming convention for Angular
    // tells Angular that these 2 are a pair - Angular does the heavy lifting
    // this Output is to change the value in the parent component
    onReset() {
        this.sizeChange.emit({
            width: "200",
            height: "100",
        });
    }
}
