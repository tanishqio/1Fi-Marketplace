import { useQuery } from "@tanstack/react-query";
import { TopBrandsComp } from "./TopBrandComp"
import axios from "axios";
import FeaturedProductsComp from "./FeaturedproductComp";

function BrandsPage(props: any) {
    const selectedcategory = props.category;
    const setbrand=props.setbrand;
    const setCurrentpage=props.setCurrentpage;
    return <div className="flex flex-col gap-2">

        {/* first section top brands component and line,fetch the top brands from backend using the given category */}
        <TopBrandsComp category={selectedcategory} setbrand={setbrand} setCurrentpage={setCurrentpage}/>
        <FeaturedProductsComp setCurrentpage={setCurrentpage}/>

    </div>
}
export default BrandsPage