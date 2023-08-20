import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityLookupComponent, ILookupCityDetails } from './city-lookup.component';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

describe('CityLookupComponent', () => {
  let component: CityLookupComponent;
  let fixture: ComponentFixture<CityLookupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CityLookupComponent],
      imports: [
        ReactiveFormsModule,
        AutoCompleteModule
      ]
    });
    fixture = TestBed.createComponent(CityLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSearchCity when onSearchCity is called', () => {
    spyOn(component.onSearchCity, 'emit');
    const event: AutoCompleteCompleteEvent = {
      originalEvent: null,
      query: 'Sydney'
    }
    component.searchCity(event);
    expect(component.onSearchCity.emit).toHaveBeenCalledWith('Sydney');
  });

  it('should emit onSelectedCityName when onCitySelected is called', () => {
    spyOn(component.onSelectedCityName, 'emit');
    const location: ILookupCityDetails = {
      location: 'Sydney',
      id: 1,
      lat: 1,
      lon: 1
    }
    component.onCitySelected(location);
    expect(component.onSelectedCityName.emit).toHaveBeenCalledWith(location);
  });
});
