// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { Timer, Todos } from "./components";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Timer />
      <Todos />
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
    </>
  );
};

export default App;
