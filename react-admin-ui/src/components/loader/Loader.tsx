import { RingLoader } from "react-spinners";
import "./loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <RingLoader color="white" />
    </div>
  );
};

export default Loader;
