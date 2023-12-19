import logo from "./logo.svg";
import { AppRoutes } from "./Routes";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="w-full md:w-3/4 mx-auto">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
