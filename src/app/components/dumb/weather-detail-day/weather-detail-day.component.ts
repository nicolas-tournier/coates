import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

export interface IDailyConditions {
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
  selector: 'app-weather-detail-day',
  templateUrl: './weather-detail-day.component.html',
  styleUrls: ['./weather-detail-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherDetailDayComponent {

  @Input() weather$: Observable<IDailyConditions>;
}
