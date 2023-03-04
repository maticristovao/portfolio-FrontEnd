import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faEye, faEyeSlash, faKey, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorMatcher } from 'src/assets/error-matchers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  show: boolean = false;
  faBack = faArrowLeft;
  faUsername = faUserShield;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  matcher: ErrorMatcher = new ErrorMatcher();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private toastService: ToastrService) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    });
  }

  get Username() {
    return this.form.get('username');
  }
  get Password() {
    return this.form.get('password');
  }
  get Remember() {
    return this.form.get('remember');
  }

  toggleVisibility() {
    this.show = !this.show;
  }

  logIn(logData: LoginData) {
    this.authService.login(logData.username, logData.password, logData.remember);

    if (this.authService.isLogged) {
      this.toastService.success('Inicio de sesión exitoso', 'Log In', { positionClass: 'valid-log-container', progressBar: false });
    } else {
      this.toastService.error('Credenciales inválidas', 'Log In', { positionClass: 'invalid-log-container', progressBar: false });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const LOGDATA = this.form.value;
      this.logIn(LOGDATA);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
interface LoginData {
  username: string,
  password: string,
  remember: boolean
}