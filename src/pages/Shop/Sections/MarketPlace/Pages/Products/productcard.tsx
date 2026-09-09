import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductContext } from '@/context/ProductContext';
import { useContext } from 'react';
export default function ProductCard(props: any) {
    const id=props.id;
    const name = props.name;
    const imgurl = props.imgurl
    const color = props.color;
    const storage = props.storage;
    const price = props.price;
    const setCurrentpage = props.setCurrentpage;
const {productid,setproductid}=useContext(ProductContext);

    return (
        <div onClick={() => {
            setCurrentpage("SingleProduct");
            setproductid(id);
        }}
            className="flex flex-col p-3 rounded-[20px] bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#b096f9] hover:shadow-[0_8px_20px_rgba(113,44,220,0.08)] hover:-translate-y-1 cursor-pointer group relative">

            {/* Discount Badge (Top Left) */}
            <div className="absolute top-4 left-4 z-10 bg-[#f4f0ff] text-[#712CDC] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {Math.floor(Math.random() * 11) + 10}% Off
            </div>

            {/* Image Container */}
            <div className="w-full aspect-[4/5] bg-[#fbfaff] rounded-[14px] flex items-center justify-center mb-3 overflow-hidden group-hover:bg-[#f4f0ff] transition-colors duration-300">
                {/* Replace with actual image */}
                <img
                    src={imgurl}
                    alt={name}
                    className="h-[80%] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col flex-grow">
                {/* Brand & Name */}
                <h3 className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-tight mb-1 group-hover:text-[#712CDC] transition-colors">
                    {name}
                </h3>

                {/* Specs Subtitle */}
                <p className="text-[11px] text-gray-500 mb-2">
                    {storage} • {color}
                </p>

                {/* Price, EMI & Action Button */}
                <div className="mt-auto flex items-end justify-between">

                    {/* Pricing */}
                    <div className="flex flex-col">
                        {/* Actual Price */}
                        <span className="text-sm font-bold text-gray-900 leading-tight">
                            {price}
                        </span>
                        {/* EMI Starting Price */}
                        <span className="text-[10px] font-semibold text-[#712CDC] mt-0.5">
                            EMI from ₹{Math.floor(price / 24)}/mo
                        </span>
                    </div>

                    <button className="h-8 w-8 rounded-full bg-[#712CDC] flex items-center justify-center text-white transition-all duration-300 hover:bg-[#5b22b3] hover:scale-105 flex-shrink-0 shadow-sm">
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </button>

                </div>
            </div>

        </div>
    );
}