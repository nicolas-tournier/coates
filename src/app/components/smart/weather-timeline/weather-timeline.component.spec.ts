import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTimelineComponent } from './weather-timeline.component';

describe('WeatherTimelineComponent', () => {
  let component: WeatherTimelineComponent;
  let fixture: ComponentFixture<WeatherTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherTimelineComponent]
    });
    fixture = TestBed.createComponent(WeatherTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
