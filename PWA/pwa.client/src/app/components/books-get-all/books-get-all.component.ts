import { Component, OnInit } from '@angular/core';
import { IBook } from '../../data/iBook';
import { BookService } from '../../data/book.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../data/local-storage.service';

@Component({
  selector: 'app-books-get-all',
  templateUrl: './books-get-all.component.html',
  styleUrls: ['./books-get-all.component.css']
})
export class BooksGetAllComponent implements OnInit {
  book: IBook = {
    id: 0,
    title: ''
  };

  items!: IBook[];

  constructor(
    private bookService: BookService, 
    private router: Router,
    private localStorageService: LocalStorageService
    ) { }

  ngOnInit(): void {
    this.bookService.GetAll().toPromise()
      .then((response) => {
        //console.log('response of GetAll ', response);
        this.items = response;
      })
      .catch((error) => {
        console.error(': ', error);
      });
  }

  editBook(book: IBook): void {
    console.log("En localStorage se guarda ", book);
    this.localStorageService.setData('book', book);
    this.router.navigate(['/book-update']);
  }

  deleteBook(id: number): void {
    this.bookService.Delete(id).toPromise()
      .then((response) => {
        console.log('Libro eliminado exitosamente: ', response);
        this.items = this.items.filter(item => item.id !== id); 
      })
      .catch((error) => {
        console.error('Error al eliminar el libro: ', error);
      });
  }
}
