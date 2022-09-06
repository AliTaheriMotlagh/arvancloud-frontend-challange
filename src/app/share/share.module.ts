import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncateTextPipe } from './pipes';

@NgModule({
  declarations: [TruncateTextPipe],
  imports: [CommonModule],
  exports: [TruncateTextPipe],
})
export class ShareModule {}
