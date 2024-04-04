import { Outlet } from "react-router-dom";
import NabBar from "./components/NabBar";

function App() {
  return (
    <>
      <NabBar />
      <Outlet />
    </>
  );
}

export default App;
