import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoListComponent } from './mecano-list.component';

describe('MecanoListComponent', () => {
  let component: MecanoListComponent;
  let fixture: ComponentFixture<MecanoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
