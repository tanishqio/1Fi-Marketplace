import React from 'react';
import ProductCard from '../Products/productcard';
import useFeaturedProducts from "@/hooks/usefeaturedproducts";
import TransparentProductcard from '../Products/TransparentProducts';
export default function FeaturedProductsComp() {
    const{data,isLoading,isError,error}=useFeaturedProducts();
    return (
        <div className="w-full max-w-md mx-auto px-4 mb-6">
            
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                    Featured Products
                </h2>
                <button className="text-[13px] font-semibold text-[#712CDC] hover:text-[#5b22b3] transition-colors">
                    See All
                </button>
            </div>

            {/* Empty Container for Phone Listing (2 Columns) */}
            <div className="grid grid-cols-2 gap-4">
                { isLoading? <TransparentProductcard/>:
                data.featuredproducts.map((product:any)=>{
                    return (<ProductCard
                         name={product.Name}
                       imgurl={product.ImageUrl}
                       color={product.variants[0].attributes.color}
                       storage={product.variants[0].attributes.storage}
                       price={product.variants[0].price}/>);
                })

                }
            </div>
            
        </div>
    );
}
