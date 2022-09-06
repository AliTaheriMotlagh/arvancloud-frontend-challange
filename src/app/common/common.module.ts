import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TagManagerComponent } from './tag-manager/tag-manager.component';

@NgModule({
  declarations: [TagManagerComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [TagManagerComponent],
})
export class AppCommonModule {}
