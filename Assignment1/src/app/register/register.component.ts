import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  // User: FormGroup = new FormGroup({
  //   firstname: new FormControl('', [Validators.required]),
  //   lastname: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   confirmPassword: new FormControl('', [Validators.required])
  // });

  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ matching: true });
        return { matching: true };
      }
      return null;
    };
  }

  // Getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Check if form is invalid
    if (this.registerForm.invalid) {
      // Reset password fields only if there are password-related errors
      if (this.f['password'].errors || this.f['confirmPassword'].errors) {
        this.registerForm.patchValue({
          password: '',
          confirmPassword: ''
        });
      }
      return;
    }

    // TODO: Implement your registration logic here
    console.log('Registration successful', this.registerForm.value);
    
    // Navigate to login page after successful registration
    this.router.navigate(['/login']);
  }
}
