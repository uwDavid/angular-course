import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  form = new FormGroup({
    // key-value pair = one control || nested FormGroup
    email: new FormControl(''), // empty initial value
    password: new FormControl(''),
  });

  onSubmit() {
    this.form.value.email; // access form value
  }
}
