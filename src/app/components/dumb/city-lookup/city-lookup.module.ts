import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CityLookupComponent } from './city-lookup.component';

@NgModule({
  declarations: [CityLookupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  exports: [
    CityLookupComponent
  ]
})
export class CityLookupModule { }
