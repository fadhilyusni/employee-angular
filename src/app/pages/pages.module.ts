import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { MainModule } from './main/main.module';
import { NgxCurrencyModule } from 'ngx-currency';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MainModule,
    NgxCurrencyModule,
    OrderModule,
  ],
  exports: [HeaderComponent],
})
export class PagesModule {}
