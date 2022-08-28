import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {filter, Subject, takeUntil} from "rxjs";

import {PasswordInterface} from "../types/password.interface";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-card-password',
  templateUrl: './card-password.component.html',
  styleUrls: ['./card-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CardPasswordComponent implements OnInit, OnDestroy {
  @Input() public password: PasswordInterface;

  @Output() private readonly deleteEvent: EventEmitter<number> = new EventEmitter<number>;
  @Output() private readonly updateEvent: EventEmitter<{action: PasswordInterface, _id: number}> = new EventEmitter<{action: PasswordInterface, _id: number}>;

  public length: number
  public newStr: string
  public visible: boolean = false

  private readonly destroy$ = new Subject<boolean>()

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.visibleMethod()
    this.password.result = true
  }

  public onClick(): void {
    this.visible = !this.visible;
  }

  public onDelete(): void {
    this.deleteEvent.emit(this.password?.id)
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '450px',
      data: this.password
    })

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
      filter(value => !!value)
    ).subscribe((result: PasswordInterface) => {
      this.updateEvent.emit({action: result, _id: result.id})
    })
  }

  private visibleMethod(): void {
    this.newStr = this.password.password
    for (let value of this.password.password) {
      this.newStr = this.newStr.replace(value, "*")
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
