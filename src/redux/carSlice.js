import { createSlice } from "@reduxjs/toolkit";
import { cars } from "../cars";
import { getRandomOpponents } from "../utils/get-random-opponents";

const initialState = {
  selectedCar: null,
  cars: cars,
  isUserReady: false,
  isRaceStarted: false,
  isRaceFinished: false,
  opponentCars: [],
};

export const counterSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    selectCar: (state, action) => {
      state.selectedCar = action.payload;
    },

    setOpponentCar: (state, action) => {
      const carsWithoutSelected = cars.filter(
        (x) => x.name !== state.selectedCar.name
      );

      state.opponentCars = getRandomOpponents(carsWithoutSelected, 2);
    },

    setUserReady: (state, action) => {
      state.isUserReady = action.payload;
    },

    setRaceStarted: (state, action) => {
      state.isRaceStarted = action.payload;
    },

    setRaceFinished: (state, action) => {
      state.isRaceFinished = action.payload;
    },

    setNewPlace: (state, action) => {
      if (state.isRaceStarted === true && state.isRaceFinished === false) {
        if (action.payload.name === state.selectedCar.name) {
          state.selectedCar = {
            ...state.selectedCar,
            currentPlace:
              state.selectedCar.currentPlace < 800
                ? state.selectedCar.currentPlace + action.payload.distance
                : state.selectedCar.currentPlace,
            time:
              state.selectedCar.currentPlace < 800
                ? Math.floor(new Date().getTime() / 1000)
                : state.selectedCar.time,
          };
        } else {
          const newArray = state.opponentCars.map((car) => {
            if (car["name"] === action.payload.name) {
              return {
                ...car,
                currentPlace:
                  car.currentPlace < 800
                    ? car.currentPlace + action.payload.distance
                    : car.currentPlace,
                time:
                  car.currentPlace < 800
                    ? Math.floor(new Date().getTime() / 1000)
                    : car.time,
              };
            }
            return car;
          });
          state.opponentCars = newArray;
        }
      }
    },

    raceAgain: (state, action) => {
      const resetOpponentCars = state.opponentCars.map((car) => {
        return { ...car, currentPlace: car.startPlace };
      });

      const resetSelectedCar = {
        ...state.selectedCar,
        currentPlace: state.selectedCar.startPlace,
      };

      state.opponentCars = resetOpponentCars;
      state.selectedCar = resetSelectedCar;
      state.isRaceStarted = false;
      state.isRaceFinished = false;
    },

    resetCar: (state, action) => {
      return initialState;
    },
  },
});

export const {
  raceAgain,
  selectCar,
  resetCar,
  setOpponentCar,
  setUserReady,
  setNewPlace,
  setRaceFinished,
  setRaceStarted,
} = counterSlice.actions;

export default counterSlice.reducer;
