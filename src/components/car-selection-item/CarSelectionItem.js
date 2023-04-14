import styles from "./car-selection-item.module.css";
import { useDispatch } from "react-redux";
import { selectCar, setOpponentCar } from "../../redux/carSlice";

const CarSelectionItem = ({ car }) => {
  const dispatch = useDispatch();

  const onSelectCar = () => {
    dispatch(selectCar(car));
    dispatch(setOpponentCar());
  };

  return (
    <div
      key={car.name}
      onClick={onSelectCar}
      className={`${styles.carSelectionItem} `}
    >
      <img
        src={car.carImg}
        alt={car.name}
        className={styles.carImage}
        width={100}
        height={100}
      />
    </div>
  );
};

export default CarSelectionItem;
