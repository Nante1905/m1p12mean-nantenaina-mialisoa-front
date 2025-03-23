import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesListRootComponent } from './taches-list-root.component';

describe('TachesListRootComponent', () => {
  let component: TachesListRootComponent;
  let fixture: ComponentFixture<TachesListRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TachesListRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TachesListRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
