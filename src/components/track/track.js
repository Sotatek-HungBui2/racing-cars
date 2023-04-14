import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./track.module.css";
import { getRandomSpeed } from "../../utils/get-random-speed";
import useInterval from "../../hooks/use-interval";
import Dashboard from "../dashboard/dashboard";
import {
  setRaceStarted,
  setRaceFinished,
  setNewPlace,
  resetCar,
  raceAgain,
} from "../../redux/carSlice";

const Track = () => {
  const dispatch = useDispatch();

  const [racingCars, setRacingCars] = useState([]);

  const { selectedCar, opponentCars, isRaceStarted, isRaceFinished } =
    useSelector((state) => state.car);

  useInterval(() => {
    racingCars.forEach((car) => {
      moveCarHandler(car);
    });
  }, [500]);

  useEffect(() => {
    const racingCars = [selectedCar, ...opponentCars];

    setRacingCars(racingCars);

    if (racingCars.every((car) => car.currentPlace >= 800)) {
      dispatch(setRaceStarted(false));
      dispatch(setRaceFinished(true));
    }
  }, [selectedCar, opponentCars, dispatch]);

  const startRaceHandler = () => {
    dispatch(setRaceStarted(true));
  };

  const moveCarHandler = (car) => {
    dispatch(
      setNewPlace({
        name: car.name,
        distance: getRandomSpeed(car.speedRange[1], car.speedRange[0]),
      })
    );
  };

  const opponentCarClassNames = (i) => {
    return `opponentCar${i + 1}`;
  };

  const opponentCarNameClassNames = (i) => {
    return `opponentCarName${i + 1}`;
  };

  const renderOpponentCars = () => {
    return opponentCars.map((car, i) => {
      return (
        <div
          key={car.name}
          className={styles[opponentCarClassNames(i)]}
          style={{ left: car.currentPlace }}
        >
          <img
            src={car.carImg}
            alt={car.name}
            className={styles.carImage}
            width={200}
            height={200}
          />
        </div>
      );
    });
  };

  const renderOpponentCarNames = () => {
    return opponentCars.map((car, i) => {
      return (
        <span
          key={car.name}
          className={`${styles.carName} ${
            styles[opponentCarNameClassNames(i)]
          }`}
        >
          {car.name}
        </span>
      );
    });
  };

  const resetCars = () => {
    dispatch(resetCar());
  };

  const onRaceAgain = () => {
    dispatch(raceAgain());
  };

  return (
    <div className={styles.trackFieldContainer}>
      <div className={styles.trackField}>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </div>

      <span className={styles.startLine}></span>
      <span className={styles.finishLine}></span>

      <div
        className={styles.selectedCar}
        style={{ left: selectedCar.currentPlace }}
      >
        <img
          src={selectedCar.carImg}
          alt={selectedCar.name}
          className={styles.carImage}
          width={200}
          height={200}
        />
      </div>

      <span className={`${styles.carName} ${styles.yourCarText}`}>
        Your Car
      </span>

      {renderOpponentCars()}
      {renderOpponentCarNames()}

      {!isRaceStarted && !isRaceFinished && (
        <div className={styles.buttonsContainer}>
          <button onClick={startRaceHandler} className={styles.startRaceButton}>
            Start The Race!
          </button>
        </div>
      )}

      {!isRaceStarted && isRaceFinished && (
        <div className={styles.buttonsContainer}>
          <button onClick={onRaceAgain} className={styles.startRaceButton}>
            Race Again!
          </button>
          <button onClick={resetCars} className={styles.changeCarButton}>
            Change My Car
          </button>
        </div>
      )}

      {(isRaceStarted || isRaceFinished) && (
        <Dashboard racingCars={racingCars} selectedCar={selectedCar} />
      )}
    </div>
  );
};

export default Track;
