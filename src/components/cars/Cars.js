import { useSelector } from "react-redux";
import styles from "./cars.module.css";
import CarSelectionItem from "../car-selection-item/CarSelectionItem";

const Cars = () => {
  const cars = useSelector((state) => state.car.cars);
  console.log("cars", cars);

  const renderCars = () => {
    return cars.map((car) => <CarSelectionItem key={car.name} car={car} />);
  };

  return <div className={styles.cars}>{renderCars()}</div>;
};

export default Cars;
