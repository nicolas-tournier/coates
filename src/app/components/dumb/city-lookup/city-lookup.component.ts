import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

export interface ILookupCityDetails {
  location: string;
  id: number,
  lat: number,
  lon: number
}

export interface ICitySearchResult {
  list: Array<ILookupCityDetails>;
}

@Component({
  selector: 'app-city-lookup',
  templateUrl: './city-lookup.component.html',
  styleUrls: ['./city-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityLookupComponent implements OnInit {

  @Input() citySearchResult$: Observable<ICitySearchResult>
  @Output() onSearchCity = new EventEmitter<string>();
  @Output() onSelectedCityName = new EventEmitter<ILookupCityDetails>();

  locations$ = new BehaviorSubject<Array<string>>([]);

  cityLookupFormGroup: FormGroup;

  ngOnInit(): void {
    this.cityLookupFormGroup = new FormGroup({
      cityInputString: new FormControl('')
    });
  }

  searchCity(event: AutoCompleteCompleteEvent): void {
    if (event.query === '') return;
    this.onSearchCity.emit(event.query);
  }

  onCitySelected(location: ILookupCityDetails): void {
    this.onSelectedCityName.emit(location);
  }
}
