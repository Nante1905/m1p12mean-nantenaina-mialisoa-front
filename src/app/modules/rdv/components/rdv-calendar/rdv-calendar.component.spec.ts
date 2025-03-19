import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvCalendarComponent } from './rdv-calendar.component';

describe('RdvCalendarComponent', () => {
  let component: RdvCalendarComponent;
  let fixture: ComponentFixture<RdvCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
