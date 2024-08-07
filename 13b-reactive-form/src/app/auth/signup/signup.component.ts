import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// function equalValues(control: AbstractControl) {
//   const password = control.get('password')?.value;
//   const confirmPassword = control.get('confirmPassword')?.value;

//   if (password === confirmPassword) {
//     return null;
//   }
//   return { passwordNotEqual: true };
// }

// Equal Validator Factory
function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesEqual: false };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        //multi-input validation - form Group
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
    firtName: new FormControl('', { validators: [Validators.required] }),
    lastNmae: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    // drop-down (limited options)
    // see html template
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    // form array
    // note - we can dynamically set the index of the loop for form array
    srouce: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    // must be true to be submitted
    agree: new FormControl(false, { validators: [Validators.required] }),
  });

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      console.log('Invalid form submitted');
      return;
    }
  }

  onReset() {
    this.form.reset();
  }
}
