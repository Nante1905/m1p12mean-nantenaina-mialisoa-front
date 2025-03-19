import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRdvRootComponent } from './list-rdv-root.component';

describe('ListRdvRootComponent', () => {
  let component: ListRdvRootComponent;
  let fixture: ComponentFixture<ListRdvRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRdvRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRdvRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
