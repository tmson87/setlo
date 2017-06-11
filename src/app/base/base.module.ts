import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { SettingComponent } from './components/setting/setting.component';
import { ClarityModule } from 'clarity-angular';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, HomeComponent, NavComponent, SettingComponent, NotFoundComponent],
  exports: [LoginComponent, HomeComponent, NavComponent, SettingComponent, NotFoundComponent]
})
export class BaseModule { }
