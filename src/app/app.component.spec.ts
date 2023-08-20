import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherTimelineModule } from './components/smart/weather-timeline/weather-timeline.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [
      WeatherTimelineModule,
      HttpClientModule
    ]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
