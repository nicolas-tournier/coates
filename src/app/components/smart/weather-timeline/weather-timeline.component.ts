import { Component, OnInit } from '@angular/core';
import { ICitiesResponse, ICityDetails, ICityForecastResponse, ICityToForecast, WeatherService } from 'src/app/services/weather.service';
import { BehaviorSubject, map, switchMap, of, Observable } from 'rxjs';
import { ICitySearchResult, ILookupCityDetails } from '../../dumb/city-lookup/city-lookup.component';

@Component({
  selector: 'app-weather-timeline',
  templateUrl: './weather-timeline.component.html',
  styleUrls: ['./weather-timeline.component.scss']
})
export class WeatherTimelineComponent implements OnInit {

  citySearchResult$: Observable<ICitySearchResult> = of({ list: [] } as ICitySearchResult);
  weatherResults$: Observable<ICityForecastResponse> = of({} as ICityForecastResponse);

  private doCitySearch$ = new BehaviorSubject<string>('');
  private doForecastSearch$ = new BehaviorSubject<ICityToForecast>({} as ICityToForecast);

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.citySearchResult$ = this.doCitySearch$.pipe(
      switchMap((search: string) => {
        return this.weatherService.searchCity(search).pipe(
          map((result: ICitiesResponse) => {
            return {
              list: result.list.map((item: ICityDetails) => {
                return {
                  location: `${item.name}, ${item.country}`,
                  id: item.id,
                  lat: item.lat,
                  lon: item.lon
                }
              })
            } as ICitySearchResult;
          })
        )
      })
    );

    this.weatherResults$ = this.doForecastSearch$.pipe(
      switchMap((cityToForecast: ICityToForecast) => {
        return this.weatherService.getCityForecast(cityToForecast);
      })
    )
  }
  onSearchCity(search: string): void {
    this.doCitySearch$.next(search);
  }

  onCitySelected(city: ILookupCityDetails): void {
    this.doForecastSearch$.next(city);
  }
}
