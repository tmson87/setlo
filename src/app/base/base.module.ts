import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SettingComponent } from './components/setting/setting.component';
import { ClarityModule } from 'clarity-angular';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effect';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.run(UserEffects),
  ],
  declarations: [LoginComponent, HomeComponent, NavComponent, SettingComponent, NotFoundComponent],
  exports: [LoginComponent, HomeComponent, NavComponent, SettingComponent, NotFoundComponent],
})
export class BaseModule { }
