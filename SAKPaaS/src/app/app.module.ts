import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { OccupancyReportModule } from 'src/app/components/occupancy-report/occupancy-report.module';
import { SnackBarModule } from 'src/app/components/snack-bar/snack-bar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { loadConfig } from 'src/app/config-loader';
import { ApiConfiguration } from 'src/app/generated/api-configuration';
import { PwaRequestCatcherService } from './core/services/pwa-request-catcher.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule } from 'src/app/components/home/home.module';
import { OccupancyViewModule } from 'src/app/components/occupancy-view/occupancy-view.module';
import { SearchBarModule } from 'src/app/components/search-bar/search-bar.module';
import { MapModule } from 'src/app/components/map/map.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { LogoModule } from 'src/app/components/logo/logo.module';
import { GlobalDialogModule } from 'src/app/components/global-dialog/global-dialog.module';
import { LocateButtonModule } from 'src/app/components/locate-button/locate-button.module';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule } from './generated/api.module';
import { LocationCardModule } from './components/location-card/location-card.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular default imports
    AppRoutingModule,
    BrowserModule,
    // third party modules
    ApiModule.forRoot({ rootUrl: environment.apiTarget }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'de'
    }),
    // custom component modules (not lazy loaded!)
    FooterModule,
    GlobalDialogModule,
    HomeModule,
    LocateButtonModule,
    LocationCardModule,
    LogoModule,
    MapModule,
    OccupancyReportModule,
    OccupancyViewModule,
    SearchBarModule,
    SharedModule,
    SnackBarModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [
        HttpClient,
        ApiConfiguration
      ],
      multi: true
    },
    CookieService,
    PwaRequestCatcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
