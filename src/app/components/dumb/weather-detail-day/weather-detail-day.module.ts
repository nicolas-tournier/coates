import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDetailDayComponent } from './weather-detail-day.component';

@NgModule({
  declarations: [WeatherDetailDayComponent],
  imports: [
    CommonModule
  ],
  exports: [WeatherDetailDayComponent]
})
export class WeatherDetailDayModule { }
