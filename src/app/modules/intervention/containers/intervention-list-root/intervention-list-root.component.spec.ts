import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionListRootComponent } from './intervention-list-root.component';

describe('InterventionListRootComponent', () => {
  let component: InterventionListRootComponent;
  let fixture: ComponentFixture<InterventionListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionListRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
