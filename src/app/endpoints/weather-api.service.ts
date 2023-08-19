import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, filter, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface IApiCitiesSearchResponse {
  search: string,
  list: Array<IApiCityDetailsResponse>
}

export interface IApiCityDetailsResponse {
  country: string,
  id: number,
  lat: number,
  lon: number,
  name: string,
  region: string,
  url: string
}

export interface IApiCityToForecastRequest {
  id: number,
  lat: number,
  lon: number,
  days: number
}

export interface IApiCityForecastResponse {
  requestId: number,
  current: IApiCurrentConditionsResponse,
  forecast: Array<IApiDailyForecastConditionsResponse>
}

export interface IApiCurrentConditionsResponse {
  tempC: number,
  feelsLikeC: number,
  windKph: number,
  lastUpdated: string,
  precipMm: number,
  condition: {
    text: string,
    icon: string,
    code: number
  }
}

export interface IApiDailyForecastConditionsResponse {
  date: string,
  day: number,
  maxTempC: number,
  minTempC: number,
  avgTempC: number,
  maxWindKph: number,
  totalPrecipMm: number,
  avgHumidity: number,
  condition: {
    text: string,
    icon: string,
    code: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  readonly citiesQueryUrl = "http://api.weatherapi.com/v1/search.json";
  readonly forecastQueryUrl = "http://api.weatherapi.com/v1/forecast.json";

  constructor(private http: HttpClient) { }

  getMatchingCities(search: string): Observable<IApiCitiesSearchResponse> {

    let params = new HttpParams();
    params = params.append('key', environment.apiKey);
    params = params.append('q', search);

    return this.http.get<Array<any>>(this.citiesQueryUrl, { params }).pipe(
      filter(response => !!response),
      map((response: Array<any>) => ({ search: search, list: response } as IApiCitiesSearchResponse)),
      catchError(() => of({ search, list: [] } as IApiCitiesSearchResponse))
    );
  }

  getForecast(cityToLookup: IApiCityToForecastRequest): Observable<IApiCityForecastResponse> {
    const location = `${cityToLookup.lat},${cityToLookup.lon}`;
    const days = cityToLookup.days;

    let params = new HttpParams();
    params = params.append('key', environment.apiKey);
    params = params.append('days', days);
    params = params.append('q', location);

    return this.http.get<any>(this.forecastQueryUrl, { params }).pipe(
      filter(response => !!response),
      map((response: any) => ({ requestId: cityToLookup.id, current: this.buildCurrentConditions(response.current), forecast: this.buildCurrentForecasts(response.forecast) } as IApiCityForecastResponse)),
      catchError(() => of({ requestId: cityToLookup.id, current: {}, forecast: [] } as IApiCityForecastResponse))
    );
  }

  private buildCurrentConditions(current: any): IApiCurrentConditionsResponse {
    return {
      tempC: current.temp_c,
      feelsLikeC: current.feelslike_c,
      windKph: current.wind_kph,
      lastUpdated: current.last_updated,
      precipMm: current.precip_mm,
      condition: {
        text: current.condition.text,
        icon: current.condition.icon,
        code: current.condition.code
      }
    }
  }

  private buildCurrentForecasts(forecast: any): Array<IApiDailyForecastConditionsResponse> {
    return forecast.forecastday.map((day: any) => {
      return {
        date: day.date,
        day: day.day.mintemp_c,
        maxTempC: day.day.maxtemp_c,
        minTempC: day.day.mintemp_c,
        avgTempC: day.day.avgtemp_c,
        maxWindKph: day.day.maxwind_kph,
        totalPrecipMm: day.day.totalprecip_mm,
        condition: {
          text: day.day.condition.text,
          icon: day.day.condition.icon,
          code: day.day.condition.code
        }
      }
    })
  }

  private handleError(error: any): void {

  }
}
