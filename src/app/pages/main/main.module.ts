import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { PagesModule } from '../pages.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [ListComponent, FormComponent, DetailComponent, SearchPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MainRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  exports: [ListComponent, FormComponent, DetailComponent],
})
export class MainModule {}
