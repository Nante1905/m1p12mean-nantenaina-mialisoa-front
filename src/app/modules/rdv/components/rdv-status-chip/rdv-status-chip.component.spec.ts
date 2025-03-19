import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvStatusChipComponent } from './rdv-status-chip.component';

describe('RdvStatusChipComponent', () => {
  let component: RdvStatusChipComponent;
  let fixture: ComponentFixture<RdvStatusChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvStatusChipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvStatusChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
