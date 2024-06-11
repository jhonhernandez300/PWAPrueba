import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BooksGetAllComponent } from './components/books-get-all/books-get-all.component';
import { BookNewComponent } from './components/book-new/book-new.component';
import { MenuComponent } from './components/menu/menu.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksGetAllComponent,
    BookNewComponent,
    MenuComponent,
    BookUpdateComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
