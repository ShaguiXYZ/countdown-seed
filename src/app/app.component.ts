import {
  Component,
  OnInit,
  OnDestroy,
  VERSION,
  HostListener,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CountDownService } from './countdown';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CountDownService],
})
export class AppComponent implements OnInit, OnDestroy {
  name = 'Angular ' + VERSION.major;

  private subscriptions: Subscription[] = [];

  public counter: number;
  public expired: boolean;

  constructor(private countDown: CountDownService) {}

  ngOnInit(): void {
    this.start();

    this.subscriptions.push(
      this.countDown.onTick().subscribe((tick) => (this.counter = tick)),
      this.countDown
        .onWarn()
        .subscribe((tick) => console.log(`(${tick}) Warn!!!`)),
      this.countDown.onExpired().subscribe(() => (this.expired = true))
    );
  }

  ngOnDestroy(): void {
    this.countDown.stopCountdown();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  @HostListener('mousemove', ['$event'])
  onMouseMoveEvent(event: MouseEvent): void {
    this.countDown.resetCountdown();
  }

  public start = () => {
    this.expired = false;
    this.countDown.startCountdown();
  };
}
