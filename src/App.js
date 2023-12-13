import logo from "./logo.svg";
import { AppRoutes } from "./Routes";
import "./App.css";
import { Header } from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
