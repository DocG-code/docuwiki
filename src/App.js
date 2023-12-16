import logo from "./logo.svg";
import { AppRoutes } from "./Routes";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
