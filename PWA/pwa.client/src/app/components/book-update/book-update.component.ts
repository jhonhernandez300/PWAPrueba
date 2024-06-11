import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../../data/iBook';
import { BookService } from '../../data/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../data/local-storage.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  myForm!: FormGroup;
  idBook!: number;
  book!: IBook | null;  

  constructor(
    public route: ActivatedRoute, 
    public bookService: BookService, 
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    // Obtén los datos del localStorage
    this.book = this.localStorageService.getData('book');
    
    if (this.book) {
      console.log("Book received ", this.book);      

      // Inicializa el formulario con los datos del libro
      this.myForm = this.fb.group({
        title: [this.book.title || '', [Validators.required]]
      });
    } else {
      console.error("No book data found in localStorage.");
      // Puedes redirigir al usuario o manejar el error apropiadamente aquí
    }
  }

  get f() {
    return this.myForm.controls;
  }

  onSubmit() {
    if (this.book) {      
      this.book.title = this.myForm.value.title;      
      console.log("Datos para enviar: ", this.book);
      
      this.bookService.Update(this.book).subscribe((res: any) => {
        console.log('Respuesta del servicio ', res);                
        this.router.navigateByUrl('app-books-get-all');
      });
    } else {
      console.error("Error al actualizar.");      
    }
  }

  showBook(data: IBook): void {
    console.log("Mostrar objeto");
    console.log(data.id);
    console.log(data.title);       
  }

}
