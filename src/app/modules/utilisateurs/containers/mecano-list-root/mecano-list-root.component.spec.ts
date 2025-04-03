import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoListRootComponent } from './mecano-list-root.component';

describe('MecanoListRootComponent', () => {
  let component: MecanoListRootComponent;
  let fixture: ComponentFixture<MecanoListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanoListRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanoListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
