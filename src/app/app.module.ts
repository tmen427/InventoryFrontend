import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ItemComponent } from './items/item/item.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { ItemsPostingComponent } from './items-posting/items-posting.component';
import { ItemTabsComponent } from './item-tabs/item-tabs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsSearchComponent } from './items-search/items-search.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    NgbModule,

  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ItemComponent,
    BarcodesComponent,
    ItemsPostingComponent,
    ItemTabsComponent,
    ItemsSearchComponent, 

  ],
  providers: [],
  bootstrap: [AppComponent], 
  schemas: [
   NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
