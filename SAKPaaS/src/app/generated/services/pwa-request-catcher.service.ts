import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaRequestCatcherService {
  private pwaEvent;

  constructor() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      this.pwaEvent = deferredPrompt;
    });
  }

  public getPwaRequest() {
    return this.pwaEvent;
  }
}
