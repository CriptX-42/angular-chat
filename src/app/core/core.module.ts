import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloConfigModule } from '../apollo-config.module';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatListModule } from '@angular/material';

@NgModule({
  exports: [
    BrowserModule,
    ApolloConfigModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule // isso pode garantir que o core module seja importando uma vez só (no appModule)
    ) {
      if (parentModule) {
        throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
      }
    }
}
