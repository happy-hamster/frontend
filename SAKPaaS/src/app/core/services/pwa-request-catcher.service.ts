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
      console.log('catched event object beforeinstallpromt: ' + e); // HAS TO BE REMOVED FOR PRODUCTION
      deferredPrompt = e;
      this.pwaEvent = deferredPrompt;
    });
  }

  public getPwaRequest() {
    console.log('getPwaRequest'); // HAS TO BE REMOVED FOR PRODUCTION
    return this.pwaEvent;
  }
}
