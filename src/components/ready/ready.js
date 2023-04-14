import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import LoadingSpinner from "../../../constants/loading-spinner";
// import RaceFlagIcon from "../../../constants/race-flag-icon";
import Title from "../../components/title/Title";
import { selectCar, setUserReady } from "../../redux/carSlice";
import styles from "./ready.module.css";

const Ready = () => {
  const [isLoadingOpponents, setIsLoadingOpponents] = useState(true);
  const dispatch = useDispatch();
  const selectedCar = useSelector((state) => state.car.selectedCar);
  const opponentCars = useSelector((state) => state.car.opponentCars);

  const changeCarHandler = () => {
    dispatch(selectCar(null));
  };

  const userReadyHandler = () => {
    dispatch(setUserReady(true));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingOpponents(false);
    }, 2000);
  }, []);

  const renderOpponentCars = () => {
    return opponentCars.map((car) => {
      return (
        <div key={car.name} className={styles.opponentCarDetails}>
          <div className={styles.carInfo}>
            <span className={styles.carName}>{car.name}</span>
          </div>
        </div>
      );
    });
  };

  const renderReadyButtons = () => {
    return (
      <>
        <Title title={"Are You Ready?"} />
        <div className={styles.buttons}>
          <button onClick={userReadyHandler}>
            {/* <RaceFlagIcon class={styles.icon} /> */}
            YES!
          </button>
          <button onClick={changeCarHandler}>Change My Car</button>
        </div>
      </>
    );
  };

  return (
    <div className={styles.readyContainer}>
      <div className={styles.yourCarContainer}>
        <Title title={"Your Car"} />
        <div className={styles.carDetails}>
          <div className={styles.carInfo}>
            <span className={styles.carName}>{selectedCar.name}</span>
          </div>
        </div>
        <img
          src={selectedCar.carImg}
          alt={selectedCar.name}
          className={styles.carImage}
        />
      </div>
      <div className={styles.opponentsContainer}>
        <Title
          title={
            isLoadingOpponents
              ? "Your Opponents Are Getting Ready"
              : "Your Opponents Are Ready!"
          }
        />
        {isLoadingOpponents ? (
          // <LoadingSpinner />
          <div>Loading...</div>
        ) : (
          <div className={styles.opponentCars}>{renderOpponentCars()}</div>
        )}
      </div>
      {!isLoadingOpponents && renderReadyButtons()}
    </div>
  );
};

export default Ready;
