import { Outlet } from "react-router-dom";
import NabBar from "./components/NabBar";
import { Suspense } from "react";
import Loding from "./components/Loding";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <Suspense fallback={<Loding />}>
        <NabBar />
        <Outlet />
        <Toaster />
      </Suspense>
    </>
  );
}

export default App;
