import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurarRepositoriosComponent } from './procurar-repositorios.component';

describe('ProcurarRepositoriosComponent', () => {
  let component: ProcurarRepositoriosComponent;
  let fixture: ComponentFixture<ProcurarRepositoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurarRepositoriosComponent ]
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
