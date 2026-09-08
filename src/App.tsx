import { APITester } from "./APITester";
import "./index.css";
import { MainBody } from "./components/mainBody";
import { BrowserRouter, Route, Routes } from "react-router";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Shop from "./pages/Shop/Shop";
import Limit from "./pages/Limit";
import EmiDues from "./pages/EmiDues";
import Profile from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export function App() {
  return <div className="min-h-screen min-w-width bg-white">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainBody>
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/pledged-funds" element={<Limit />} />
            <Route path="/emi-dues" element={<EmiDues />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
        </MainBody>

        <BottomNav />
      </BrowserRouter>
    </QueryClientProvider>
  </div>
}

export default App;
