import React, { useState } from 'react';
import { ChevronDown, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SingleProductPage(props:any) {
    const [activeImage, setActiveImage] = useState(0);
    
    // --- Centralized Product Data (JSON Object) ---
    const productData = {
        title: "Apple iPhone 17 Pro Max",
        storage: "256GB",
        color: "Desert Titanium",
        discountBadge: "20% OFF",
        price: "1,49,900",
        originalPrice: "1,87,375",
        emiStart: "6,245",
        images: [
            "/path-to-orange-iphone-1.png",
            "/path-to-orange-iphone-2.png",
            "/path-to-orange-iphone-3.png"
        ],
        details: [
            "A18 Pro chip with 6-core GPU, delivering next-level performance and incredible power efficiency.",
            "48MP Main camera with advanced quad-pixel sensor for super-high-resolution photos and videos.",
            "Forged in aerospace-grade titanium, featuring a Ceramic Shield front that's tougher than any smartphone glass."
        ],
        specifications: [
            "6.7-inch Super Retina XDR display with ProMotion technology",
            "Up to 29 hours of continuous video playback on a single charge",
            "USB-C connector with USB 3 for up to 20x faster transfer speeds"
        ]
    };

    return (
        <div className="w-full min-h-screen bg-[#f8f9fa] py-8 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">
                
                {/* ================= LEFT COLUMN: GALLERY ================= */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    {/* Main Image Card */}
                    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8 relative flex flex-col items-center justify-center aspect-[4/5] md:aspect-square">
                        <div className="absolute top-5 left-5 bg-[#f4f0ff] text-[#712CDC] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                            {productData.discountBadge}
                        </div>
                        <img 
                            src={productData.images[activeImage]} 
                            alt={productData.title} 
                            className="w-4/5 h-4/5 object-contain transition-transform duration-500 hover:scale-105"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 overflow-x-auto py-1 hide-scrollbar">
                        {productData.images.map((img, index) => (
                            <button 
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`shrink-0 w-20 h-20 rounded-[18px] bg-white p-2 flex items-center justify-center transition-all ${
                                    activeImage === index 
                                    ? 'border-2 border-[#712CDC] shadow-sm' 
                                    : 'border border-gray-100 opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ================= RIGHT COLUMN: DETAILS ================= */}
                <div className="w-full md:w-1/2 flex flex-col gap-5">
                    
                    {/* Header & Pricing */}
                    <div className="flex flex-col items-center text-center pt-2 md:pt-6">
                        <h1 className="text-[26px] font-bold text-[#141414] leading-tight mb-1">
                            {productData.title}
                        </h1>
                        <p className="text-gray-500 text-sm font-medium mb-6">
                            {productData.storage} • {productData.color}
                        </p>

                        <p className="text-sm text-gray-400 mb-1">Enter the purchase amount</p>
                        
                        <div className="flex items-center text-[#141414] mb-2">
                            <span className="text-4xl font-medium text-gray-400 mr-2 mt-1">₹</span>
                            <span className="text-[56px] font-extrabold tracking-tight leading-none">{productData.price}</span>
                        </div>
                        <p className="text-sm text-gray-400 line-through mb-4">₹{productData.originalPrice}</p>
                    </div>

                    {/* EMI Dropdown Card */}
                    <div className="bg-white border border-gray-100 rounded-[20px] p-4 flex items-center justify-between cursor-pointer shadow-sm hover:border-[#e2d8ff] transition-colors">
                        <span className="text-gray-600 text-sm">
                            Starts at <span className="font-bold text-gray-900">₹{productData.emiStart}/mo</span>
                        </span>
                        <div className="flex items-center text-[#712CDC] text-sm font-bold">
                            Show plans <ChevronDown className="ml-1 w-4 h-4" />
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-[#712CDC] text-white rounded-full py-4 text-lg font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] hover:bg-[#5b22b3] mt-2 shadow-[0_4px_14px_rgba(113,44,220,0.25)]">
                        Continue <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                    </button>

                    {/* Details Card (Mapped from JSON) */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm mt-2">
                        <h3 className="font-extrabold text-[#141414] text-lg mb-5">Product Details</h3>
                        <div className="flex flex-col gap-4">
                            {productData.details.map((detail, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="w-7 h-7 rounded-full bg-[#f4f0ff] text-[#712CDC] flex items-center justify-center text-xs font-bold shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">{detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Specifications Card (Mapped from JSON) */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm">
                        <h3 className="font-extrabold text-[#141414] text-lg mb-5">Key Specifications</h3>
                        <div className="flex flex-col gap-4">
                            {productData.specifications.map((spec, index) => (
                                <div key={index} className="flex gap-3 items-start">
                                    <CheckCircle2 className="w-5 h-5 text-[#712CDC] shrink-0" />
                                    <p className="text-sm text-gray-600">{spec}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between cursor-pointer group">
                            <span className="text-[#712CDC] font-bold text-sm">View All Specs</span>
                            <ChevronRight className="w-4 h-4 text-[#712CDC] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}