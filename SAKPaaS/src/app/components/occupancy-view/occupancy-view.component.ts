import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Occupancy } from 'src/app/generated/models';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-occupancy-view',
  templateUrl: './occupancy-view.component.html',
  styleUrls: ['./occupancy-view.component.scss']
})
export class OccupancyViewComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();

  lowBorder = 0.34;
  mediumBorder = 0.67;

  @Input() occupancy: Occupancy;
  @Input() showOccupancyCount: boolean;

  text: string;
  iconPath: string;
  styleClass: string;

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.text = this.getText();
    this.iconPath = this.getIconPath();
    this.styleClass = this.getStyleClass();
  }

  getIconPath(): string {
    const noData = 'assets/icons/icon-availability-no-data.svg';
    const low = 'assets/icons/icon-availability-low.svg';
    const medium = 'assets/icons/icon-availability-moderate.svg';
    const high = 'assets/icons/icon-availability-full.svg';

    return this.getStringForOcc(low, medium, high, noData);
  }

  getText(): string {
    const noData: string = this.translate.instant('occupancy.no-data');
    const low: string = this.translate.instant('occupancy.low.text');
    const medium: string = this.translate.instant('occupancy.medium.text');
    const high: string = this.translate.instant('occupancy.high.text');

    return this.getStringForOcc(low, medium, high, noData);
  }

  getStyleClass(): string {
    const noData = 'noData';
    const low = 'low';
    const medium = 'medium';
    const high = 'high';

    return this.getStringForOcc(low, medium, high, noData);
  }

  getStringForOcc(low: string, medium: string, high: string, noData: string): string {
    if (!this.occupancy.value || this.occupancy.value < 0) {
      return noData;
    }
    if (this.occupancy.value < this.lowBorder) {
      return low;
    }

    if (this.occupancy.value < this.mediumBorder) {
      return medium;
    }

    if (this.occupancy.value <= 1) {
      return high;
    }

    return noData;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
