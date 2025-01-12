// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { AppProvider } from "@/context";
import { Timer, Todos } from "@/components";
import { Toast } from "@/common/components/Toast";

const App = () => {
  return (
    <AppProvider>
      <Timer />
      <Todos />
      <Toast pauseOnHover={false} pauseOnFocusLoss={false} autoClose={3000} />
    </AppProvider>
  );
};

export default App;
