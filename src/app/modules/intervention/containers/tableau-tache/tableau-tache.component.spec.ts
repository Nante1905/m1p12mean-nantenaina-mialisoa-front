import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauTacheComponent } from './tableau-tache.component';

describe('TableauTacheComponent', () => {
  let component: TableauTacheComponent;
  let fixture: ComponentFixture<TableauTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
