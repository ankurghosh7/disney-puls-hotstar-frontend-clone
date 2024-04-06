import { Outlet } from "react-router-dom";
import NabBar from "./components/NabBar";
import { Suspense } from "react";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <NabBar />
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
