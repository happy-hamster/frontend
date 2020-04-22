import { Injectable } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  private didInit = false;

  constructor() {
  }

  /**
   * Push new action to mixpanel.
   *
   * @param id Name of the action to track.
   * @param [action={}] Actions object with custom properties.
   */
  track(id: MixpanelId, action: any = {}): void {
    if (!this.didInit) {
      mixpanel.init('a603c032ca10b66c68e18c9aa1789c3a');
      this.didInit = true;
    }
    mixpanel.track(id, action);
  }
}

export enum MixpanelId {
  INIT = 'app-init'
}
