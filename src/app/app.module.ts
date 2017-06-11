import { AuthenticatedGuard } from './base/guards/authenticated.guard';
import { AppRoutingModule } from './app-routing.module';
import { BaseModule } from './base/base.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';

// Used to create fake backend
import { fakeBackendProvider } from './shared/fakes/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// Store
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'app/store/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BaseModule,
    AppRoutingModule,
    ClarityModule.forRoot(),
    StoreModule.provideStore(reducer, {
      router: window.location.pathname + window.location.search
    }),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
        AuthenticatedGuard,
        // AuthenticationService,
        // UserService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }