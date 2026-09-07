import { useState } from "react"
import TopNavBar from "./TopNavBar/TopNavBar";
import MarketPlace from "./Sections/MarketPlace/MarketPlace";
import NearbyStores from "./Sections/NearbyStores";
import TopBrands from "./Sections/TopBrands";

function Shop() {
    const [section, setsection] = useState("Top Brands");
    return <div className="flex flex-col gap-4">
        <TopNavBar section={section} setsection={setsection} />
        {section === "Market Place" && <MarketPlace />}
        {section === "Top Brands" && <TopBrands />}
        {section === "Nearby Stores" && <NearbyStores />}

    </div>
}
export default Shop