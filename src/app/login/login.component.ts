import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SharedService } from '../_services/shared.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    public shared: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
    });

  }
  //Submit login data
  onSubmit() {
    if (this.loginForm.invalid) {
			return
		}
    const formData: any = {}
    formData['email'] = this.loginForm.controls.email.value;
    formData['password'] = this.loginForm.controls.password.value;

    if (!this.loading) {
      this.loading = true;
      this.authenticationService.login(formData).subscribe((res: any) => {
        if (res) {
          this.authenticationService.currentUserLogin.next(res.data);
          this.loading = false;
          let JWTdecoded: any = jwt_decode(res.data.accessToken);
          this.authenticationService.setLocalStorage('authToken', res.data.accessToken);
          this.authenticationService.setLocalStorage('ID', JWTdecoded._id);
          this.authenticationService.setLocalStorage('expiresIn', JWTdecoded.exp);
          this.authenticationService.setLocalStorage('Time', JWTdecoded.ist);
          this.authenticationService.setLocalStorage('role', res.data.role);
          this.shared.swalSuccess(res.message);
          this.router.navigate(['/home']);
        }
      }, err => {
        this.loading = false;
        this.shared.swalError(err);
      });
    }

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

   // helpers for View
	isControlValid(controlName: string): boolean {
		const control = this.loginForm.controls[controlName];
		return control.valid && (control.dirty || control.touched);
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.loginForm.controls[controlName];
		return control.invalid && (control.dirty || control.touched);
	}

	controlHasError(validation:any, controlName:any): boolean {
		const control = this.loginForm.controls[controlName];
		return control.hasError(validation) && (control.dirty || control.touched);
	}

	isControlTouched(controlName: any): boolean {
		const control = this.loginForm.controls[controlName];
		return control.dirty || control.touched;
	}
}
