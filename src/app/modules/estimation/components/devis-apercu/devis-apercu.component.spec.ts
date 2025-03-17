import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisApercuComponent } from './devis-apercu.component';

describe('DevisApercuComponent', () => {
  let component: DevisApercuComponent;
  let fixture: ComponentFixture<DevisApercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisApercuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
