import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuspensionesModule } from './pages/suspensiones/suspensiones.module';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './pages/shared/shared.module';
import { UnidadModule } from './pages/unidad/unidad.module';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AccesoLoginGuard } from './guards/acceso-login.guard';
registerLocaleData(localeEs, 'es');
// registerLocaleData(localeEs, '');


@NgModule({
  declarations: [
    AppComponent
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuspensionesModule,
    LoginModule,
    HttpClientModule,
    SharedModule,
    UnidadModule
  ],
  providers: [{provide:LOCALE_ID, useValue:'es'},
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
AccesoLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
