import { useSelector } from "react-redux";

import Ready from "../ready/ready";
import Track from "../track/track";
import styles from "./race.module.css";

const Race = () => {
  const isUserReady = useSelector((state) => state.car.isUserReady);

  return (
    <div className={styles.container}>
      {!isUserReady ? <Ready /> : <Track />}
    </div>
  );
};

export default Race;
