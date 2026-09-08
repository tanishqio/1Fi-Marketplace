import useBrands from "@/hooks/useBrand";
import TransparentSkeletonGrid from "./TransparentgridforTopBrands";
import TopBrandsCard from "./TopBrandsCard";
export function TopBrandsComp(props: any) {
    const category = props.category;
    const setbrand = props.setbrand;
    const setCurrentpage = props.setCurrentpage;

    console.log("category name is" + category + "and type is" + category.type);
    const { data, isLoading, isError, error } = useBrands(category);
    // console.log("data is "+topbrands.topbrands)

    return <div className="flex flex-col gap-1">
        <div className="w-full max-w-md mx-auto px-4 ">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                Top Brands
            </h2>
        </div>
        {/* The 3-Element Grid Container */}
        <div className="w-full max-w-md mx- auto p-4">
            <div className="grid grid-cols-3 gap-3">
                {isLoading ?
                    (<TransparentSkeletonGrid />)
                    :
                    (data.topbrands.map((brand: any) => {
                        return (<TopBrandsCard brandname={brand.Name} logo={brand.logoUrl} isLoading={isLoading} setbrand={setbrand} setCurrentpage={setCurrentpage}/>)
                    }))
                }
            </div>
        </div>
    </div>

}