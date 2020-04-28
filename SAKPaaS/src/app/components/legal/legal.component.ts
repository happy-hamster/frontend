import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent {

  navLinks = [
    {
      labelKey: 'legal.impressum',
      link: './impressum',
      index: 0
    }, {
      labelKey: 'legal.privacy-policy',
      link: './privacy-policy',
      index: 1
    }, {
      labelKey: 'legal.cookies',
      link: './cookies',
      index: 2
    },
];

  constructor(
  ) { }

}
