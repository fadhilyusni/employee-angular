import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValidationMessageComponent } from './validataion-message/validation-message.component';
import { StringUtil } from './utils/string.utils';

@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [CommonModule, RouterModule],
  exports: [ValidationMessageComponent],
  providers: [StringUtil],
})
export class SharedModule {}
