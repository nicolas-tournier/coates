import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherTimelineComponent } from './weather-timeline.component';
import { CityLookupModule } from '../../dumb/city-lookup/city-lookup.module';
import { WeatherDetailModule } from '../../dumb/weather-detail/weather-detail.module';
import { WeatherDetailDayModule } from '../../dumb/weather-detail-day/weather-detail-day.module';

@NgModule({
  declarations: [WeatherTimelineComponent],
  imports: [
    CommonModule,
    CityLookupModule,
    WeatherDetailModule,
    WeatherDetailDayModule
  ],
  exports: [
    WeatherTimelineComponent
  ]
})
export class WeatherTimelineModule { }
