import { LoginHandlerService } from './core/services/auth/login-handler.service';
import { ApiHandlerService } from './core/services/api/api-handler.service';
import { LayoutsModule } from './layouts/layouts.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { FeaturesModule } from './features/features.module';
import { AuthService } from './core/services/auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    CoreModule,
    RoutingModule,
    FeaturesModule,
    LayoutsModule,
    MatFormFieldModule
  ],
  providers: [
    ApiHandlerService,
    LoginHandlerService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
