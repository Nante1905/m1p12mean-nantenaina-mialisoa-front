import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisListRootComponent } from './devis-list-root.component';

describe('DevisListRootComponent', () => {
  let component: DevisListRootComponent;
  let fixture: ComponentFixture<DevisListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisListRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
