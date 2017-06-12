import { AppRoutingModule } from './app-routing.module';
import { BaseModule } from './base/base.module';
import { QuestionBankModule } from './question-bank/question-bank.module';
import { OnlineTestModule } from './online-test/online-test.module';
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

// Services
import { UserService } from './base/services/user.service';

// Guards
import { AuthenticatedGuard } from './base/guards/authenticated.guard';
import { LoginPageGuard } from './base/guards/login-page.guard';

// Mediator
import { UserMediator } from './base/mediators/user.mediator';
import { RouterMediator } from './base/mediators/router.mediator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BaseModule,
    QuestionBankModule,
    OnlineTestModule,
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
        LoginPageGuard,
        UserService,
        UserMediator,
        RouterMediator,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
