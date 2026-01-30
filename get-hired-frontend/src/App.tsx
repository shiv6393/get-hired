import Navbar from "./components/ui/common/Navbar";
import AppRoutes from "@/routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </main>
    </>
  );
}

export default App;
