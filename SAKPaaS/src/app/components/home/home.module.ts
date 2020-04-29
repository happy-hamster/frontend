import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LogoModule } from 'src/app/components/logo/logo.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { MapModule } from 'src/app/components/map/map.module';
import { SearchBarModule } from 'src/app/components/search-bar/search-bar.module';
import { LocateButtonModule } from 'src/app/components/locate-button/locate-button.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { UserCardModule } from '../user-card/user-card.module';
import { LocationPanelModule } from 'src/app/components/location-panel/location-panel.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    LogoModule,
    FooterModule,
    MapModule,
    SearchBarModule,
    LocateButtonModule,
    MatBottomSheetModule,
    UserCardModule,
    LocationPanelModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
