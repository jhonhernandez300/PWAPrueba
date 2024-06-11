import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksGetAllComponent } from './books-get-all.component';

describe('BooksGetAllComponent', () => {
  let component: BooksGetAllComponent;
  let fixture: ComponentFixture<BooksGetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksGetAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksGetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
