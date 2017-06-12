import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootQuestionBankComponent } from './components/root-question-bank/root-question-bank.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RootQuestionBankComponent],
  exports: [RootQuestionBankComponent]
})
export class QuestionBankModule { }
