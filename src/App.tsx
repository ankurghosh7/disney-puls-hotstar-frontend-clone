import { Outlet } from "react-router-dom";
import NabBar from "./components/NabBar";
import { Suspense } from "react";
import Loding from "./components/Loding";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div>
      <Suspense fallback={<Loding />}>
        <NabBar />
        <div className="min-h-screen ml-28">
          <Outlet />{" "}
        </div>
        <Toaster />
      </Suspense>
    </div>
  );
}

export default App;
