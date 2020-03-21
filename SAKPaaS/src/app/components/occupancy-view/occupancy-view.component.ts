import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-occupancy-view',
  templateUrl: './occupancy-view.component.html',
  styleUrls: ['./occupancy-view.component.scss']
})
export class OccupancyViewComponent implements OnInit {

  lowBorder = 0.34;
  midBorder = 0.67;

  @Input() occupancy: number;

  text: string;
  iconPath: string;
  styleClass: string;

  constructor() { }

  ngOnInit(): void {
    this.text = this.getText();
    this.iconPath = this.getIconPath();
    this.styleClass = this.getStyleClass();

    console.log(this.text);
  }

  getIconPath(): string {
    const low = 'assets/icons/icon-availability-low.svg';
    const mid = 'assets/icons/icon-availability-moderate.svg';
    const high = 'assets/icons/icon-availability-full.svg';

    return this.getStringForOcc(low, mid, high);
  }

  getText(): string {
    const low = 'Geringe Auslastung';
    const mid = 'Normale Auslastung';
    const high = 'Hohe Auslastung!';

    return this.getStringForOcc(low, mid, high);
  }

  getStyleClass(): string{
    const low = 'low';
    const mid = 'mid';
    const high = 'high';

    return this.getStringForOcc(low, mid, high);
  }

  getStringForOcc(low: string, mid: string, high: string): string {
    if(this.occupancy < this.lowBorder)
      return low;

    if(this.occupancy < this.midBorder)
      return mid;

    return high;
  }
}
