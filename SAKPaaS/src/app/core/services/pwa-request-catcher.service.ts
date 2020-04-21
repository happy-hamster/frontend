import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PwaRequestCatcherService {
  private pwaEvent;
  private prompted = false;

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.pwaEvent = e;

      // to prevent a loop of this call
      if (this.prompted === false) {
        timer(1000 * 30).subscribe( () => {
          this.pwaEvent.prompt();
          this.prompted = true;
        });
      }
    });
  }

  public getPwaRequest() {
    return this.pwaEvent;
  }
}
