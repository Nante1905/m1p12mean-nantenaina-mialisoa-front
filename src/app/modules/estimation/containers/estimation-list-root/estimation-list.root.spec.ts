import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationListRoot } from './estimation-list.root';

describe('EstimationListRoot', () => {
  let component: EstimationListRoot;
  let fixture: ComponentFixture<EstimationListRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimationListRoot],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimationListRoot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
