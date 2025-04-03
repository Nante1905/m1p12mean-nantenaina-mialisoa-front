import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMecRootComponent } from './dashboard-mec-root.component';

describe('DashboardMecRootComponent', () => {
  let component: DashboardMecRootComponent;
  let fixture: ComponentFixture<DashboardMecRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMecRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMecRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
