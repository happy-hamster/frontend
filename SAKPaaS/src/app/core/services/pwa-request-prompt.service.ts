import { Injectable } from '@angular/core';
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
    this.pwaRequestCatcherService.getPwaRequest()?.prompt(); // ! This feature could be obsolete.
  }
}
