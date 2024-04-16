import { Outlet } from "react-router-dom";
import NabBar from "./components/NabBar";
import { Suspense } from "react";
import Loding from "./components/Loding";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main className="flex">
      <Suspense fallback={<Loding />}>
        <NabBar />
        <div className="ml-28 w-[calc(100vw-112px)] min-h-screen">
          <Outlet />
        </div>
        <Toaster />
      </Suspense>
    </main>
  );
}

export default App;
