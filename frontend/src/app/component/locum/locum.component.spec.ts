import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocumComponent } from './locum.component';

describe('LocumComponent', () => {
  let component: LocumComponent;
  let fixture: ComponentFixture<LocumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocumComponent]
    });
    fixture = TestBed.createComponent(LocumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
