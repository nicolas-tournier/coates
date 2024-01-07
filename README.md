# CoatesTest

By Nic Tournier

https://github.com/nicolas-tournier/coates.git

## Instructions

** Please use master branch **

To begin: npm install
Serve with: npm serve
Test with: ng test
Build with: npm run build

Runs on http://localhost:4200


## Background

This app uses WeatherApi at https://www.weatherapi.com/, and makes use of my trial ApiKey. Feel free to replace with your own key which you'll find in the environment files at the root of the project.

This took a lot longer than a few hours. Much of it was written while I was recovering from Surgery and under the influence of powerful painkillers.

I made use of different AI tools to help me speed up repetitious tasks such as when developing the test data for unit testing.

I chose to use Angular as I have much more experience with it than with React.

## Intent

I tried to use interfaces in a consistent manner, to return response data objects from the endpoints, to then be modified by services to suit interfaces applicable to the app, and which were consumed by a combo of smart and dumb components each with their own interfaces.

The services were the conduit from smart components to endpoints. Smart components had knowledge of these services and not of the endpoints. They behaved as composition containers to assemble UI using dumb components. The smart components have knowledge of both service and dumb component interfaces, and translate data back and forward. The dumb components are pure input / output displays which are optimised to take advanteage of OnPush change detection. I have used Observables for all component inputs to fasciliate this, and bound these to templates via piped processing. The flow of data is essentially one way, from endpoint to views, with user interactions triggering output emittors and service calls. CSS was built mainly into the components as there was not attempt at theming and it made sense to localise styling for the reusable views.

I really enjoyed building this but had to do a lot of background research to find a weather api which handled location and didn't require me to write mappings between condition codes and weather icons, or to provide my credit card. Was rushing Sunday to ensure I had enough time left for domestics. So no real focus on error handling or productionising.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

