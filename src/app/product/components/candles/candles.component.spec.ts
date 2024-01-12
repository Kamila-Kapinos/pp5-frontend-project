import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandlesComponent } from './candles.component';

describe('CandlesComponent', () => {
  let component: CandlesComponent;
  let fixture: ComponentFixture<CandlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandlesComponent]
    });
    fixture = TestBed.createComponent(CandlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
