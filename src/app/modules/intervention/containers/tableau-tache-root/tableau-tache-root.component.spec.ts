import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauTacheRootComponent } from './tableau-tache-root.component';

describe('TableauTacheRootComponent', () => {
  let component: TableauTacheRootComponent;
  let fixture: ComponentFixture<TableauTacheRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauTacheRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauTacheRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
