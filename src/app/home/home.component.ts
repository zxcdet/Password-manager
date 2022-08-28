import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {filter, Subject, takeUntil} from "rxjs";

import {DialogComponent} from "../dialog/dialog.component";
import {PasswordInterface} from "../types/password.interface";
import {LOCAL_STORAGE_TOKEN} from "../services/localStorageToken";
import {LocalStorageService} from "../services/localStorage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, OnDestroy {
  public passwordList: PasswordInterface[] = []
  public itemPage: number = 4
  public page: number = 1;
  public paginatLenght: number;

  private readonly destroy$ = new Subject<boolean>()

  constructor(
    private readonly dialog: MatDialog,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(LOCAL_STORAGE_TOKEN) private readonly localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.setDefaultValue()
    this.passwordList = JSON.parse(this.localStorageService.getContacts('password'))
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '450px',
      data: {
        id: Date.now()
      }
    })

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(value => !!value)
      ).subscribe((result: PasswordInterface) => {
        this.changeDetectorRef.markForCheck()
        this.passwordList.push(result)
        this.paginatLenght = this.passwordList.length
        this.localStorageService.setContacts('password', JSON.stringify(this.passwordList))
      })
  }

  public deleteCard(event: number): void {
    const selectCard = this.passwordList.find(value => value?.id === event)
    const index = this.passwordList.indexOf(selectCard)
    this.passwordList.splice(index, 1)
    this.localStorageService.setContacts('password', JSON.stringify(this.passwordList))
    this.paginatLenght = this.passwordList.length
  }

  public editCards(event): void {
    let selectedContaacts = this.passwordList.find(value => value?.id === event?._id)
    const index = this.passwordList.indexOf(selectedContaacts)
    this.passwordList[index] = event.action
    this.localStorageService.setContacts('password', JSON.stringify(this.passwordList))
  }

  private setDefaultValue(): void {
    const currentState = this.localStorageService.getContacts('password')
    if (currentState) {
      return
    } else {
      this.localStorageService.setContacts('password', JSON.stringify([
        {
        name: 'User1',
        password: '123456',
        id: 1,
        purpose: 'some1'
        },
        {
          name: 'User2',
          password: 'asd23e',
          id: 2,
          purpose: 'some2'
        },
        {
          name: 'User3',
          password: '123456ads',
          id: 3,
          purpose: 'some3'
        }
        ])
      )
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
