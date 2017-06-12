import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootOnlineTestComponent } from './components/root-online-test/root-online-test.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RootOnlineTestComponent],
  exports: [RootOnlineTestComponent]
})
export class OnlineTestModule { }
