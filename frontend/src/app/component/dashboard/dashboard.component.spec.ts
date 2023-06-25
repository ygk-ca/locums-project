import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashboardComponent]
    });
    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
