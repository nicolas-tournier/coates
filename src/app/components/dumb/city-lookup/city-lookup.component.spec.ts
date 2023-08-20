import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityLookupComponent } from './city-lookup.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

fdescribe('CityLookupComponent', () => {
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
});
