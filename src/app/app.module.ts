import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing }  from './app.routing';
import { HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppComponent }  from './app.component';
import { OrgsComponent }  from './components/orgs.component';

@NgModule({
  imports:      [ BrowserModule, routing, HttpModule, FormsModule],
  declarations: [ AppComponent, OrgsComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
