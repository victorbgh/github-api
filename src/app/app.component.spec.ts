import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ModalVisualizarRepositorioComponent } from './modal/modal-visualizar-repositorio/modal-visualizar-repositorio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProcurarRepositoriosComponent } from './procurar-repositorios/procurar-repositorios.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ProcurarRepositoriosComponent,
        NavbarComponent,
        ModalVisualizarRepositorioComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'github-api'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('github-api');
  });
  
});
