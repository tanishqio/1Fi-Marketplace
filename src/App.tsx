import { APITester } from "./APITester";
import "./index.css";
import { MainBody } from "./components/mainBody";
import { BrowserRouter,Route,Routes } from "react-router";
import BottomNav from "./components/BottomNav";

export function App() {
  return <div className="min-h-screen min-w-width bg-white">
  <BrowserRouter>
   <MainBody>
    hi there
    <Routes>
        {/* <Route path="/" element={</>}/> */}
    </Routes>
  </MainBody>

  <BottomNav/>
  </BrowserRouter>
  </div>
}

export default App;
