import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBook } from '../../data/iBook';
import { BookService } from '../../data/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrl: './book-new.component.css'
})
export class BookNewComponent implements OnInit {

  myForm!: FormGroup;    
  submitted = false; 

  constructor(
    private formBuilder: FormBuilder, 
    private bookService: BookService,
    private router: Router
    ) { }  

  iniciarFormulario(){
    this.myForm = this.formBuilder.group({                     
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
}

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  
  get form(): { [key: string]: AbstractControl; }
  {
      return this.myForm.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }

  onSubmit() {    
    this.submitted = true;
    console.log("Form value ", this.myForm.value);

    if (this.myForm.invalid) {
      console.log('Error')          
      return
    }     

    this.bookService.Save(this.myForm.value).subscribe(              
      result => {
        console.log('success ', result);
        this.router.navigate(['/app-books-get-all']);  // Redirige a la ruta especificada
      },                 
      error => console.log('error ', error)                 
    );                  
  }  

}
