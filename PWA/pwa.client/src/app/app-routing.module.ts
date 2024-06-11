import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksGetAllComponent } from '../app/components/books-get-all/books-get-all.component';
import { BookNewComponent } from '../app/components/book-new/book-new.component';
import { BookUpdateComponent } from '../app/components/book-update/book-update.component';


const routes: Routes = [
  { path: 'app-books-get-all', component: BooksGetAllComponent },
  { path: 'book-new', component: BookNewComponent },
  { path: 'book-update', component: BookUpdateComponent },
  { path: '', component: BooksGetAllComponent }, 
  //{ path: '**', component: BooksGetAllComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
