import Navbar from "./components/ui/common/Navbar";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;
