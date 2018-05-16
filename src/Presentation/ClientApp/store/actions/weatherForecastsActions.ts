import { WeatherForecast } from "../WeatherForecasts";

export enum ActionTypes {
    Request = "WeatherForecast: Request",
    Recieve = "WeatherForecast: Recieve",
}

export interface RequestWeatherForecastsAction {
    type: "REQUEST_WEATHER_FORECASTS";
    startDateIndex: number;
}

export interface ReceiveWeatherForecastsAction {
    type: "RECEIVE_WEATHER_FORECASTS";
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

export type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;
