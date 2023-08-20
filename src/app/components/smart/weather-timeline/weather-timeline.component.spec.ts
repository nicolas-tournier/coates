import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherTimelineComponent } from './weather-timeline.component';
import { ICitiesResponse, ICityForecastResponse, WeatherService } from 'src/app/services/weather.service';
import { of } from 'rxjs';
import { ICitySearchResult } from '../../dumb/city-lookup/city-lookup.component';
import { CityLookupModule } from '../../dumb/city-lookup/city-lookup.module';
import { WeatherDetailModule } from '../../dumb/weather-detail/weather-detail.module';
import { WeatherDetailDayModule } from '../../dumb/weather-detail-day/weather-detail-day.module';

describe('WeatherTimelineComponent', () => {

  let component: WeatherTimelineComponent;
  let fixture: ComponentFixture<WeatherTimelineComponent>;

  const search = 'City';

  const city = {
    location: 'City, Region',
    id: 1,
    lat: 2,
    lon: 3
  };

  const citiesResponse: ICitiesResponse = {
    list: [
      {
        name: 'City 1',
        country: 'Country 1',
        id: 1,
        lat: 10,
        lon: 20,
        region: 'Region 1',
      },
      {
        name: 'City 2',
        country: 'Country 2',
        id: 2,
        lat: 30,
        lon: 40,
        region: 'Region 2',
      }
    ]
  };

  const forecastResponse: ICityForecastResponse = {
    requestId: 1,
    location: 'City, Country',
    current: {
      tempC: 1,
      feelsLikeC: 1,
      windKph: 1,
      lastUpdated: '1',
      precipMm: 1,
      condition: {
        text: '1',
        icon: '1',
        code: 1
      }
    },
    forecast: [
      {
        date: '1',
        day: 1,
        maxTempC: 1,
        minTempC: 1,
        avgTempC: 1,
        maxWindKph: 1,
        totalPrecipMm: 1,
        avgHumidity: 1,
        condition: {
          text: '1',
          icon: '1',
          code: 1
        }
      }
    ]
  };

  const weatherService = jasmine.createSpyObj('WeatherService', ['searchCity', 'getCityForecast'], {});

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherTimelineComponent],
      providers: [
        { provide: WeatherService, useValue: weatherService },
      ],
      imports: [
        CityLookupModule,
        WeatherDetailModule,
        WeatherDetailDayModule
      ]
    });
    fixture = TestBed.createComponent(WeatherTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly populate citySearchResult$ when onSearchCity is called', () => {
    weatherService.searchCity.and.returnValue(of(citiesResponse));
    component.onSearchCity(search);
    component.citySearchResult$.subscribe((result: ICitySearchResult) => {
      expect(result).toEqual({
        list: [
          {
            location: 'City 1, Country 1',
            id: 1,
            lat: 10,
            lon: 20
          },
          {
            location: 'City 2, Country 2',
            id: 2,
            lat: 30,
            lon: 40
          }
        ]
      });
    });
  });


  it('should correctly populate weatherResults$ when onCitySelected is called', () => {
    weatherService.getCityForecast.and.returnValue(of(forecastResponse));
    component.onCitySelected(city);
    component.weatherResults$.subscribe((result: ICityForecastResponse) => {
      expect(result).toEqual({
        requestId: 1,
        location: 'City, Country',
        current: {
          tempC: 1,
          feelsLikeC: 1,
          windKph: 1,
          lastUpdated: '1',
          precipMm: 1,
          condition: {
            text: '1',
            icon: '1',
            code: 1
          }
        },
        forecast: [
          {
            date: '1',
            day: 1,
            maxTempC: 1,
            minTempC: 1,
            avgTempC: 1,
            maxWindKph: 1,
            totalPrecipMm: 1,
            avgHumidity: 1,
            condition: {
              text: '1',
              icon: '1',
              code: 1
            }
          }
        ]
      });
    });
  });
});
