import { addTask, fetch } from "domain-task";
import { Action, ActionCreator, Reducer } from "redux";
import { AppThunkAction } from "./";
import { KnownAction } from "./actions/weatherForecastsActions";

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
            const fetchTask = fetch(`api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`)
                .then((response) => response.json() as Promise<WeatherForecast[]>)
                .then((data) => {
                    dispatch({ type: "RECEIVE_WEATHER_FORECASTS", startDateIndex, forecasts: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: "REQUEST_WEATHER_FORECASTS", startDateIndex });
        }
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "REQUEST_WEATHER_FORECASTS":
            return {
                forecasts: state.forecasts,
                isLoading: true,
                startDateIndex: action.startDateIndex,
            };
        case "RECEIVE_WEATHER_FORECASTS":
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    forecasts: action.forecasts,
                    isLoading: false,
                    startDateIndex: action.startDateIndex,
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
