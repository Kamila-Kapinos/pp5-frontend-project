import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoapsComponent } from './soaps.component';

describe('SoapsComponent', () => {
  let component: SoapsComponent;
  let fixture: ComponentFixture<SoapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoapsComponent]
    });
    fixture = TestBed.createComponent(SoapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
