import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GuardsCheckEnd, GuardsCheckStart, NavigationCancel, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit, OnDestroy{
  public title = 'Password-manager';
  public loading: boolean

  private readonly destroy$ = new Subject<boolean>()

  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPage()
  }

  private loadPage(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      this.changeDetectorRef.markForCheck()
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
      }
      if (event instanceof GuardsCheckEnd || event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
