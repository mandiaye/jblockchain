import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JblockchainSharedModule } from 'app/shared/shared.module';
import { JblockchainCoreModule } from 'app/core/core.module';
import { JblockchainAppRoutingModule } from './app-routing.module';
import { JblockchainHomeModule } from './home/home.module';
import { JblockchainEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JblockchainSharedModule,
    JblockchainCoreModule,
    JblockchainHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JblockchainEntityModule,
    JblockchainAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JblockchainAppModule {}
