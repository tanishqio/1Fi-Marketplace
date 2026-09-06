import { useState } from "react"
import TopNavBar from "./TopNavBar";
import MarketPlace from "./Sections/MarketPlace";

function Shop(){
    const [section,setsection]=useState("Top Brands");
return <div className="flex flex-col gap-4">
    <TopNavBar section={section} setsection={setsection} />
    <MarketPlace/>
</div>
}
export default Shop