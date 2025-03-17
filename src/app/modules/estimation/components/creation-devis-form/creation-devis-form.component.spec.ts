import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDevisFormComponent } from './creation-devis-form.component';

describe('CreationDevisFormComponent', () => {
  let component: CreationDevisFormComponent;
  let fixture: ComponentFixture<CreationDevisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationDevisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationDevisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
