import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { PwaRequestCatcherService } from './pwa-request-catcher.service';

@Injectable({
  providedIn: 'root'
})
export class PwaRequestPromptService {

  constructor(
    private pwaRequestCatcherService: PwaRequestCatcherService,
  ) { }

  /**
   * **Invokes the PWA-Install prompt**
   *
   * Please note that the current implementation might be obsolete.
   */
  public showPwaRequest(): void {
    this.pwaRequestCatcherService.getPwaRequest().prompt(); // ! This feature could be obsolete.
    console.log('Showed PWA installation prompt manually'); // HAS TO BE REMOVED FOR PRODUCTION
  }

  /**
   * **Invokes a timed PWA-Install prompt.**
   *
   * @param time: amount of time the prompt will be delayed after the event is triggered (in milliseconds
   */
  public showPwaRequestScheduled(time: number): void {
    console.log('Start PWA installation prompt schedule');
    const pwaTimer = timer(time);
    pwaTimer.subscribe(() => {
      this.showPwaRequest();
      console.log('PWA installation prompt sent scheduled'); // HAS TO BE REMOVED FOR PRODUCTION
    });
  }
}
