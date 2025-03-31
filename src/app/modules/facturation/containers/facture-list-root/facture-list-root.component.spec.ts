import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureListRootComponent } from './facture-list-root.component';

describe('FactureListRootComponent', () => {
  let component: FactureListRootComponent;
  let fixture: ComponentFixture<FactureListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactureListRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
