import Navbar from "./components/ui/common/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </main>
    </>
  );
}

export default App;
