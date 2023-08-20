import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IApiCitiesSearchResponse, WeatherApiService } from '../endpoints/weather-api.service';
import { WeatherService, ICityToForecast, ICityForecastResponse } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let mockWeatherApiService: jasmine.SpyObj<WeatherApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WeatherApiService', ['getMatchingCities', 'getForecast']);

    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        { provide: WeatherApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(WeatherService);
    mockWeatherApiService = TestBed.inject(WeatherApiService) as jasmine.SpyObj<WeatherApiService>;
  });

  it('should return empty list if citySearchString is empty', () => {
    service.searchCity('').subscribe(res => {
      expect(res.list.length).toBe(0);
    });
  });

  it('should call WeatherApiService.getMatchingCities with correct string', () => {
    const citySearchString = 'London';
    mockWeatherApiService.getMatchingCities.and.returnValue(of({ list: [] } as IApiCitiesSearchResponse));
    service.searchCity(citySearchString).subscribe();
    expect(mockWeatherApiService.getMatchingCities).toHaveBeenCalledWith(citySearchString);
  });

  it('should return empty ICityForecastResponse if cityToForecast is empty', () => {
    const cityToForecast: ICityToForecast = {} as ICityToForecast;
    service.getCityForecast(cityToForecast).subscribe(res => {
      expect(Object.keys(res).length).toBe(0);
    });
  });

  it('should call WeatherApiService.getForecast with correct city details', () => {
    const cityToForecast: ICityToForecast = { id: 1, location: 'London', lat: 51.5074, lon: 0.1278 };
    const daysToForecast = 5;
    mockWeatherApiService.getForecast.and.returnValue(of({} as ICityForecastResponse));
    service.getCityForecast(cityToForecast).subscribe();
    expect(mockWeatherApiService.getForecast).toHaveBeenCalledWith({ ...cityToForecast, days: daysToForecast });
  });
});
