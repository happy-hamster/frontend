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

  milestones = [
    {
      id: 0,
      title: '#WirVsVirus Hackathon',
      content: 'Als Team SAKPaaS haben wir uns beim Hackathon der Bundesregierung vernetzt und 2 Tage lang die ' +
        'Tastatur geprügelt. Am Ende stand ein funktionaler Prototype, der überzeugt.',
      date: '21. bis 22.03.2020',
      icon: '/assets/icons/Ringe_white.png'
    },
    {
      id: 3,
      title: 'Verbesserte Auslastungserfassung',
      content: 'Es werden mehrere Kriterien in die Auslastungsermittlung einbezogen, die unterschiedlich gewichtet ' +
        'werden, und nach unterschiedlichen Zeitintervallen verfallen. Dadurch ist eine bestmögliche Einschätzung der' +
        ' Auslastung möglich.',
      date: '30.03.2020',
      icon: '/assets/icons/availability-no-data_white.png'
    },
    {
      id: 6,
      title: 'Auslastungsprognosen',
      content: 'Zusatzlich zu den Live-Daten werden mit Hilfe künstlicher Intelligenz Auslastungsprognosen erstellt,' +
        ' die den Nutzern eine fruhzeitige Planung ihres Einkaufs ermöglichen.',
      date: '05.04.2020',
      icon: '/assets/icons/availability-low_white.png'
    },
    {
      id: 9,
      title: 'Nutzersystem',
      content: 'Nutzer können sich anmelden und werden für ihre Handlungen belohnt. Eine Einspeicherung von frequent' +
        'besuchten Supermärkten verbessert die Nutzererfahrung und vereinfacht die Handhabung von HappyHamster',
      date: '07.04.2020',
      icon: '/assets/icons/availability-moderate_white.png'
    },
    {
      id: 12,
      title: 'Produkt-Verfügbarkeit',
      titleENG: 'need toilet paper? we got you covered (also software)',
      content: 'Die Verfügbarkeit von häufig gehamsterten Produkten wie Klopapier und Nudeln wird angezeigt. Eine ' +
        'Filterung der angezeigten Märkte nach Lager von bestimmten Produkten wird möglich sein, wodurch ' +
        'der Besuch von mehreren Läden für den haushaltsüblichen Einkauf überflüssig wird.',
      date: '10.04.03.2020',
      icon: '/assets/icons/availability-full_white.png'
    },
    {
      id: 15,
      title: 'Android App',
      content: 'Um die Benutzung von Happy Hamster zu vereinfachen, wird die Website auch als  native Android App' +
        ' angeboten.',
      date: '17.04.2020',
      icon: '/assets/icons/android_hamster_384.png'
    },
    {
      id: 18,
      title: 'iOS App',
      content: 'Nachdem bereits die Android App erfolgreich gewesen sein wird, wird auch Apple Nutzern die ' +
        'Happy Hamster an die Haustüre (beziehungsweise den Home-Button) gebracht.',
      date: '20.04.2020',
      icon: '/assets/icons/apple_hamster_384.png'
    },

  ];

}
