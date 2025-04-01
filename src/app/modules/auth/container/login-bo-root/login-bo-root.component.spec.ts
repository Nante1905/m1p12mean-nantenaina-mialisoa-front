import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBoRootComponent } from './login-bo-root.component';

describe('LoginBoRootComponent', () => {
  let component: LoginBoRootComponent;
  let fixture: ComponentFixture<LoginBoRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBoRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBoRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
