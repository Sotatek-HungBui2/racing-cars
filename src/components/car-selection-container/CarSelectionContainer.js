import Cars from "../cars/Cars";
import styles from "./car-selection-container.module.css";

const CarSelection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.titleText}>Select your car</h1>
      </div>
      <Cars />
    </div>
  );
};

export default CarSelection;
