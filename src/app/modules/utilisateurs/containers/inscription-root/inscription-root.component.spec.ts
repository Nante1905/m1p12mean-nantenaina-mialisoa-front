import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionRootComponent } from './inscription-root.component';

describe('InscriptionRootComponent', () => {
  let component: InscriptionRootComponent;
  let fixture: ComponentFixture<InscriptionRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
