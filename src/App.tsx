// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { AppProvider } from "./context/AppProvider";
import { Timer, Todos } from "./components";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <AppProvider>
      <Timer />
      <Todos />
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
    </AppProvider>
  );
};

export default App;
