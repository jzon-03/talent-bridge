import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BaseNav } from './components/base-nav/base-nav';
import { Home } from './components/home/home';
import { Contact } from './components/contact/contact';
import { Jobs } from './components/jobs/jobs';
import { Root } from './components/root/root';
import { JobDetail } from './components/job-detail/job-detail';

@NgModule({
  declarations: [
    App,
    BaseNav,
    Home,
    Contact,
    Jobs,
    Root,
    JobDetail
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
