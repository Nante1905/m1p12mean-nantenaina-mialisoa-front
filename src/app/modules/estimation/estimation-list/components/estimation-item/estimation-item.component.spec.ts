import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationItemComponent } from './estimation-item.component';

describe('EstimationItemComponent', () => {
  let component: EstimationItemComponent;
  let fixture: ComponentFixture<EstimationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
