import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { IDailyConditions, WeatherDetailDayComponent } from './weather-detail-day.component';

describe('WeatherDetailDayComponent', () => {
  let component: WeatherDetailDayComponent;
  let fixture: ComponentFixture<WeatherDetailDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherDetailDayComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDetailDayComponent);
    component = fixture.componentInstance;
  });

  it('should render the weather details when the weather$ observable emits a value', () => {
    const weather: IDailyConditions = {
      date: '2021-01-01',
      day: 1,
      maxTempC: 10,
      minTempC: 5,
      avgTempC: 7.5,
      maxWindKph: 20,
      totalPrecipMm: 5,
      avgHumidity: 80,
      condition: {
        text: 'Cloudy',
        icon: 'cloudy',
        code: 1
      }
    };

    component.weather$ = of(weather);
    fixture.detectChanges();

    const dayElement = fixture.debugElement.query(By.css('.day')).nativeElement;
    const maxTempElement = fixture.debugElement.query(By.css('.max-temp')).nativeElement;
    const minTempElement = fixture.debugElement.query(By.css('.min-temp')).nativeElement;
    const maxWindElement = fixture.debugElement.query(By.css('.max-wind')).nativeElement;
    const totalPrecipElement = fixture.debugElement.query(By.css('.total-precip')).nativeElement;

    expect(dayElement.textContent.trim()).toEqual('2021-01-01');
    expect(maxTempElement.textContent.trim()).toEqual('Max: 10 °C');
    expect(minTempElement.textContent.trim()).toEqual('Min: 5 °C');
    expect(maxWindElement.textContent.trim()).toEqual('Wind: 20 km/h');
    expect(totalPrecipElement.textContent.trim()).toEqual('Precip: 5 mm');
  });
});
