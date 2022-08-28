import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {PasswordInterface} from "../types/password.interface";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogComponent implements OnInit {
  public form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PasswordInterface,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  public onClick(): void {
    this.dialogRef.close({
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value,
      purpose: this.form.get('purpose')?.value,
      id: this.data.id
    })
  }

  public onClickCancel(): void {
    this.dialogRef.close()
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data.name ?? '', Validators.required],
      password: [this.data.password ?? '', Validators.required],
      purpose: [this.data.purpose ?? '', Validators.required]
    })
  }

}
