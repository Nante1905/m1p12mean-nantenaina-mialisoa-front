import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDevisFormRootComponent } from './creation-devis-form-root.component';

describe('CreationDevisFormRootComponent', () => {
  let component: CreationDevisFormRootComponent;
  let fixture: ComponentFixture<CreationDevisFormRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationDevisFormRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationDevisFormRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
