import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMgrRootComponent } from './dashboard-mgr-root.component';

describe('DashboardMgrRootComponent', () => {
  let component: DashboardMgrRootComponent;
  let fixture: ComponentFixture<DashboardMgrRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMgrRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMgrRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
