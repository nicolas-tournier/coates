import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherDetailDayModule } from '../weather-detail-day/weather-detail-day.module';

@NgModule({
  declarations: [WeatherDetailComponent],
  imports: [
    CommonModule,
    WeatherDetailDayModule
  ],
  exports: [
    WeatherDetailComponent
  ]
})
export class WeatherDetailModule { }
