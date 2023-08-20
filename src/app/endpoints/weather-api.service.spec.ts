import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { IApiCurrentConditionsResponse, WeatherApiService } from './weather-api.service';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherApiService]
    });

    service = TestBed.inject(WeatherApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch matching cities', () => {
    const mockResponse = ['London, United Kingdom', 'London, Canada'] as any;
    const searchQuery = 'London';

    service.getMatchingCities(searchQuery).subscribe(response => {
      expect(response.search).toBe(searchQuery);
      expect(response.list).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.citiesQueryUrl}?key=${environment.apiKey}&q=${searchQuery}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle an error when fetching matching cities', () => {
    const searchQuery = 'London';

    service.getMatchingCities(searchQuery).subscribe(response => {
      expect(response.search).toBe(searchQuery);
      expect(response.list.length).toBe(0);
    });

    const req = httpMock.expectOne(`${service.citiesQueryUrl}?key=${environment.apiKey}&q=${searchQuery}`);
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should fetch forecast', () => {
    const mockResponse = {
      current: {},
      forecast: { forecastday: [] as any }
    };
    const cityToLookup = {
      id: 1,
      lat: 51.509865,
      lon: -0.118092,
      days: 3
    };

    service.getForecast(cityToLookup).subscribe(response => {
      expect(response.requestId).toBe(cityToLookup.id);
    });

    const req = httpMock.expectOne(`${service.forecastQueryUrl}?key=${environment.apiKey}&days=${cityToLookup.days}&q=${cityToLookup.lat},${cityToLookup.lon}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle an error when fetching forecast', () => {
    const cityToLookup = {
      id: 1,
      lat: 51.509865,
      lon: -0.118092,
      days: 3
    };

    service.getForecast(cityToLookup).subscribe(response => {
      expect(response.requestId).toBe(cityToLookup.id);
      expect(response.current).toEqual({} as IApiCurrentConditionsResponse);
      expect(response.forecast.length).toBe(0);
    });

    const req = httpMock.expectOne(`${service.forecastQueryUrl}?key=${environment.apiKey}&days=${cityToLookup.days}&q=${cityToLookup.lat},${cityToLookup.lon}`);
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should build current conditions correctly', () => {
    const input = {
      temp_c: 20,
      feelslike_c: 19,
      wind_kph: 10,
      last_updated: 'now',
      precip_mm: 1,
      condition: {
        text: 'Sunny',
        icon: 'icon-path',
        code: 1000
      }
    };
    const output = service['buildCurrentConditions'](input);
    expect(output).toEqual({
      tempC: 20,
      feelsLikeC: 19,
      windKph: 10,
      lastUpdated: 'now',
      precipMm: 1,
      condition: {
        text: 'Sunny',
        icon: 'icon-path',
        code: 1000
      }
    });
  });

  it('should build current forecasts correctly', () => {
    const input = {
      forecastday: [{
        date: '2023-08-19',
        day: {
          mintemp_c: 15,
          maxtemp_c: 25,
          avgtemp_c: 20,
          maxwind_kph: 10,
          totalprecip_mm: 1,
          condition: {
            text: 'Sunny',
            icon: 'icon-path',
            code: 1000
          }
        }
      }]
    };
    const output = service['buildCurrentForecasts'](input);
    expect(output).toEqual([{
      date: '2023-08-19',
      day: 15,
      maxTempC: 25,
      minTempC: 15,
      avgTempC: 20,
      maxWindKph: 10,
      totalPrecipMm: 1,
      condition: {
        text: 'Sunny',
        icon: 'icon-path',
        code: 1000
      }
    }]);
  });
});
