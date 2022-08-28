import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit {
  public form: FormGroup

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly auth: AngularFireAuth,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  public onLogin(): void {
    const {email, password} = this.form.value
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/home'])}
    ).catch(err => {
      this._snackBar.open(err,'', {
        duration: 5000
      })
    })
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
