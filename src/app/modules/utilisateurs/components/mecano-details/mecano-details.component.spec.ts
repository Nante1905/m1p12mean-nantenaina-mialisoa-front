import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoDetailsComponent } from './mecano-details.component';

describe('MecanoDetailsComponent', () => {
  let component: MecanoDetailsComponent;
  let fixture: ComponentFixture<MecanoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
