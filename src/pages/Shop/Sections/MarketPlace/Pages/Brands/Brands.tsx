import { useQuery } from "@tanstack/react-query";
import { TopBrandsComp } from "./TopBrandComp"
import axios from "axios";
import FeaturedProductsComp from "./FeaturedproductComp";

function BrandsPage(props: any) {
    const selectedcategory = props.category;
    return <div className="flex flex-col gap-2">

        {/* first section top brands component and line,fetch the top brands from backend using the given category */}
        <TopBrandsComp category={selectedcategory}/>
        <FeaturedProductsComp/>

    </div>
}
export default BrandsPage