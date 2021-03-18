import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProcurarRepositoriosComponent } from './procurar-repositorios.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ProcurarRepositoriosComponent', () => {
  let component: ProcurarRepositoriosComponent;
  let fixture: ComponentFixture<ProcurarRepositoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ ProcurarRepositoriosComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} } // add here
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurarRepositoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
