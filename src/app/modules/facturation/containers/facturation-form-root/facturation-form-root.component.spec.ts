import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationFormRootComponent } from './facturation-form-root.component';

describe('FacturationFormRootComponent', () => {
  let component: FacturationFormRootComponent;
  let fixture: ComponentFixture<FacturationFormRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationFormRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturationFormRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
