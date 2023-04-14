import { useSelector } from "react-redux";
import CarSelection from "./components/car-selection-container/CarSelectionContainer";
import Race from "./components/race/Race";

function App() {
  const selectedCar = useSelector((state) => state.car.selectedCar);

  return <div className="App">{selectedCar ? <Race /> : <CarSelection />}</div>;
}

export default App;
