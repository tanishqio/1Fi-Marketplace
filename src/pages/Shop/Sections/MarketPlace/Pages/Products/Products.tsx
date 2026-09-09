import useProduct from "@/hooks/useProducts";
import ProductCard from "./productcard";
import TransparentProductcard from "./TransparentProducts";
function ProductsPage(props: any) {
    const brandname=props.brand;
    const setCurrentpage=props.setCurrentpage;
    const {data,isLoading,isError,error}=useProduct(brandname);
    return <div className="w-full max-w-md mx-auto px-4 mb-6">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                All {brandname} Products
            </h2>
        </div>

        {/* Empty Container for Phone Listing (2 Columns) */}
        <div className="grid grid-cols-2 gap-4">
            {isLoading ? <TransparentProductcard /> :
                data.allproducts.map((product: any) => {
                    return (<ProductCard
                        name={product.Name}
                        imgurl={product.ImageUrl}
                        color={product.variants[0].attributes.color}
                        storage={product.variants[0].attributes.storage}
                        price={product.variants[0].price}
                        setCurrentpage={setCurrentpage} />);
                })

            }
        </div>

    </div>
}
export default ProductsPage