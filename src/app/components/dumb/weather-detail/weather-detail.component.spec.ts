import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ICityForecast, WeatherDetailComponent } from './weather-detail.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { WeatherDetailDayComponent } from '../weather-detail-day/weather-detail-day.component';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;

  const mockData = {
    requestId: 123,
    current: {
      tempC: 20,
      feelsLikeC: 18,
      windKph: 5,
      lastUpdated: '2023-08-19T12:00:00Z',
      precipMm: 0.5,
      condition: {
        text: 'Clear',
        icon: 'some-icon-url',
        code: 100
      }
    },
    forecast: [{
      date: '2023-08-20',
      day: 1,
      maxTempC: 22,
      minTempC: 16,
      avgTempC: 19,
      maxWindKph: 7,
      totalPrecipMm: 1,
      avgHumidity: 80,
      condition: {
        text: 'Rainy',
        icon: 'rain-icon-url',
        code: 200
      }
    }]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WeatherDetailComponent,
        WeatherDetailDayComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should process weather data correctly', () => {

    component.weather$ = of(mockData);

    component.weatherData$.subscribe(data => {
      expect(data).toEqual(mockData);
    });

    component.currentConditions$.subscribe(data => {
      expect(data.tempC).toBe(20);
    });

    component.dailyResults$.subscribe(data => {
      data[0].subscribe(daily => {
        expect(daily.date).toBe('Sun, Aug 20');
      });
    });
  });

  it('should format date correctly', () => {
    const result = (component as any).formatDate('2023-08-19T12:00:00Z');
    expect(result).toBe('Sat, Aug 19');
  });

  it('should render current conditions', () => {

    component.weather$ = of(mockData);
    fixture.detectChanges();

    const currentTempElement = fixture.debugElement.query(By.css('.current-temp span')).nativeElement.textContent.trim();
    const feelsLikeElement = fixture.debugElement.query(By.css('.feels-like span')).nativeElement.textContent.trim();
    const windElement = fixture.debugElement.query(By.css('.wind span')).nativeElement.textContent.trim();
    expect(currentTempElement).toBe('20 °C');
    expect(feelsLikeElement).toBe('18 °C');
    expect(windElement).toBe('5 °C');
  });

  it('should render forecast conditions', () => {
    const mockData: ICityForecast = {
      requestId: 123,
      current: {
        tempC: 20,
        feelsLikeC: 18,
        windKph: 5,
        lastUpdated: '2023-08-19T12:00:00Z',
        precipMm: 0.5,
        condition: {
          text: 'Clear',
          icon: 'some-icon-url',
          code: 100
        }
      },
      forecast: [{
        date: '2023-08-20',
        day: 1,
        maxTempC: 22,
        minTempC: 16,
        avgTempC: 19,
        maxWindKph: 7,
        totalPrecipMm: 1,
        condition: {
          text: 'Rainy',
          icon: 'rain-icon-url',
          code: 200
        }
      }]
    };

    component.weather$ = of(mockData);
    fixture.detectChanges();
    const forcastLen = mockData.forecast.length;
    const actualLen = fixture.debugElement.queryAll(By.css('.weather-detail app-weather-detail-day')).length;
    expect(actualLen).toBe(forcastLen);
  });
});
