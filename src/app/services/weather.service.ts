import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { IApiCitiesSearchResponse, IApiCityDetailsResponse, IApiCityToForecastRequest, WeatherApiService } from '../endpoints/weather-api.service';

export interface ICitiesResponse {
  list: Array<ICityDetails>
}

export interface ICityDetails {
  country: string,
  id: number,
  lat: number,
  lon: number,
  name: string,
  region: string
}

export interface ICityToForecast {
  id: number,
  lat: number,
  lon: number
}

export interface ICityForecastResponse {
  requestId: number,
  current: ICurrentConditionsResponse,
  forecast: Array<IDailyForecastConditionsResponse>
}

export interface ICurrentConditionsResponse {
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

export interface IDailyForecastConditionsResponse {
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
export class WeatherService {

  readonly daysToForecast = 5;

  constructor(private weatherApiService: WeatherApiService) { }

  searchCity(citySearchString: string): Observable<ICitiesResponse> {
    if(!citySearchString) {
      return of({ list: [] } as ICitiesResponse);
    }
    return this.weatherApiService.getMatchingCities(citySearchString).pipe(
      map((data: IApiCitiesSearchResponse) => ({ list: data.list.map((item: IApiCityDetailsResponse) => ({ ...item } as ICityDetails)) }))
    )
  }

  getCityForecast(cityToForecast: ICityToForecast): Observable<ICityForecastResponse> {
    if(!cityToForecast || Object.keys(cityToForecast).length === 0) {
      return of({} as ICityForecastResponse);
    }
    const _cityToForecast: IApiCityToForecastRequest = { ...cityToForecast,  days: this.daysToForecast};
    return this.weatherApiService.getForecast(_cityToForecast).pipe(
      map((data: any) => data as ICityForecastResponse)
    )
  }
}
