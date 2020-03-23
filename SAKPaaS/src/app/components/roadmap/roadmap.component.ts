import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})
export class RoadmapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  events = [
    {
      id: 0,
      title: '#WirVsVirus Hackathon',
      content: 'Als Team SAKPaaS haben wir uns beim Hackathon der Bundesregierung vernetzt und 2 Tage lang die Tastatur geprügelt. Am Ende stand ein funktionaler Prototype, der überzeugt.',
      date: '21. bis 22.03.2020',
      icon: 'https://cdn.discordapp.com/icons/690584145419829299/e87b3588a928c2addf078c55239f7e36.jpg?size=256'
    },
    {
      id: 3,
      title: 'Weitere Entwicklung',
      content: 'HappyHamster wird auch nach dem Hackathon weiterenwickelt!',
      date: '23.03.2020 bis heute',
      icon: '/assets/icons/Logo_White.png'
    }
  ];

}
