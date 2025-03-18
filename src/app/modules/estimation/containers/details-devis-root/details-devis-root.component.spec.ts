import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDevisRootComponent } from './details-devis-root.component';

describe('DetailsDevisRootComponent', () => {
  let component: DetailsDevisRootComponent;
  let fixture: ComponentFixture<DetailsDevisRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDevisRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDevisRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
