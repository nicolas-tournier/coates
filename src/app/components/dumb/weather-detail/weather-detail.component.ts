import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { IDailyConditions } from '../weather-detail-day/weather-detail-day.component';

export interface ICityForecast {
  requestId: number,
  current: ICurrentConditions,
  forecast: Array<IDailyForecastConditions>
}

export interface ICurrentConditions {
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

export interface IDailyForecastConditions {
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

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailComponent implements OnInit {

  @Input() set weather$(data$: Observable<ICityForecast>) {
    this.weatherData$ = data$;
    this.dailyResults$ = data$.pipe(
      filter((data: ICityForecast) => Object.keys(data).length > 0),
      map((data: ICityForecast) => {
        const forcast = [
          ...data.forecast.map((item: IDailyForecastConditions) => (of({ ...item, date: this.formatDate(item.date) } as IDailyConditions)))
        ]
        return forcast;
      })
    )
    this.currentConditions$ = data$.pipe(
      filter((data: ICityForecast) => Object.keys(data).length > 0),
      map((data: ICityForecast) => {
        const current = {
          ...data.current, date: this.formatDate(data.current.lastUpdated)
        }
        return current;
      })
    )
  }

  weatherData$: Observable<ICityForecast>;
  currentConditions$: Observable<ICurrentConditions>;
  dailyResults$: Observable<Observable<IDailyConditions>[]>;

  constructor() { }

  ngOnInit(): void {

  }

  private formatDate(toFormat: string): string {
    const date = new Date(toFormat);
    const options: Intl.DateTimeFormatOptions = { year: undefined, month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  }
}
