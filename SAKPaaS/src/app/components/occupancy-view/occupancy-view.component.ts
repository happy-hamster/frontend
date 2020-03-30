import { Component, Input, OnInit } from '@angular/core';
import { Occupancy } from 'src/app/generated/models';

@Component({
  selector: 'app-occupancy-view',
  templateUrl: './occupancy-view.component.html',
  styleUrls: ['./occupancy-view.component.scss']
})
export class OccupancyViewComponent implements OnInit {

  lowBorder = 0.34;
  midBorder = 0.67;

  @Input() occupancy: Occupancy;

  text: string;
  iconPath: string;
  styleClass: string;

  constructor() { }

  ngOnInit(): void {
    this.text = this.getText();
    this.iconPath = this.getIconPath();
    this.styleClass = this.getStyleClass();
  }

  getIconPath(): string {
    const noData = 'assets/icons/icon-availability-no-data.svg';
    const low = 'assets/icons/icon-availability-low.svg';
    const mid = 'assets/icons/icon-availability-moderate.svg';
    const high = 'assets/icons/icon-availability-full.svg';

    return this.getStringForOcc(low, mid, high, noData);
  }

  getText(): string {
    const noData = 'Unbekannte Auslastung';
    const low = 'Geringe Auslastung';
    const mid = 'Normale Auslastung';
    const high = 'Hohe Auslastung!';

    return this.getStringForOcc(low, mid, high, noData);
  }

  getStyleClass(): string {
    const noData = 'noData';
    const low = 'low';
    const mid = 'mid';
    const high = 'high';

    return this.getStringForOcc(low, mid, high, noData);
  }

  getStringForOcc(low: string, mid: string, high: string, noData: string): string {
    if (!this.occupancy.value || this.occupancy.value < 0) {
      return noData;
    }
    if (this.occupancy.value < this.lowBorder) {
      return low;
    }

    if (this.occupancy.value < this.midBorder) {
      return mid;
    }

    if (this.occupancy.value <= 1) {
      return high;
    }

    return noData;
  }
}
