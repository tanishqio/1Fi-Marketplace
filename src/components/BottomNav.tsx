import {
  House,
  Store,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  User
} from "lucide-react";
import { Navitem } from "./Navitem";
import { useState } from "react";
import { useNavigate } from "react-router";

function BottomNav() {
  const navigate = useNavigate();
  const [currenticon, setcurrenticon] = useState("Home");
  const handleClick = (iconname: string, path: string) => {
    navigate(path);
    setcurrenticon(iconname)
  }
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] border border-white/40 bg-white px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]">

        <Navitem icon={House} name="Home" isactive={currenticon === "Home"} onClick={() => { handleClick("Home", "/dashboard") }} />

        <Navitem icon={Store} name="Shop" isactive={currenticon === "Shop"} onClick={() => { handleClick("Shop", "/shop") }} />

        <Navitem icon={ReceiptIndianRupee} name="Emi Dues" isactive={currenticon === "Emi Dues"} onClick={() => { handleClick("Emi Dues", "/emi-dues") }} />

        <Navitem icon={ChartNoAxesCombined} name="Limit" isactive={currenticon === "Limit"} onClick={() => { handleClick("Limit", "/pledged-funds") }} />

        <Navitem icon={User} name="Profile" isactive={currenticon === "Profile"} onClick={() => { handleClick("Profile", "/profile") }} />

      </div>
    </nav>
  );
}

export default BottomNav;