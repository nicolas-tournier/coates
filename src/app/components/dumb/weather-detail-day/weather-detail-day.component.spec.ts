import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailDayComponent } from './weather-detail-day.component';

describe('WeatherDetailDayComponent', () => {
  let component: WeatherDetailDayComponent;
  let fixture: ComponentFixture<WeatherDetailDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherDetailDayComponent]
    });
    fixture = TestBed.createComponent(WeatherDetailDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
