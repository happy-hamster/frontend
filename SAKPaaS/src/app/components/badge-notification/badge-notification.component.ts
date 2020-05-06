import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthKeycloakService } from 'src/app/core/services/auth-keycloak.service';

@Component({
  selector: 'app-badge-notification',
  templateUrl: './badge-notification.component.html',
  styleUrls: ['./badge-notification.component.scss']
})
export class BadgeNotificationComponent implements OnInit {

  constructor(
    public authService: AuthKeycloakService,
    public dialogRef: MatDialogRef<BadgeNotificationComponent>
  ) { }

  ngOnInit(): void {
  }

  closeNotification() {
    this.dialogRef.close();
  }
}
