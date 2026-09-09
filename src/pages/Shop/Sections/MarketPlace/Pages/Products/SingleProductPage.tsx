import React, { useState } from 'react';
import { 
    ChevronDown, ArrowRight, CheckCircle2, ChevronRight, 
    Star, Shield, Cpu, Camera, Zap, Share2, Heart, Info,
    ChevronLeft
} from 'lucide-react';

export default function SingleProductPage(props:any) {
    const [activeImage, setActiveImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedStorage, setSelectedStorage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    
    // --- Centralized Product Data (JSON Object) ---
    const productData = {
        title: "Apple iPhone 15 Pro Max",
        brand: "Apple",
        rating: 4.8,
        reviews: 1245,
        basePrice: 159900,
        originalPrice: 179900,
        discountPercentage: 11,
        emiStart: 7654,
        colors: [
            { name: "Natural Titanium", hex: "#c4c0b6" },
            { name: "Blue Titanium", hex: "#4b535d" },
            { name: "White Titanium", hex: "#f3f2ee" },
            { name: "Black Titanium", hex: "#434240" }
        ],
        storageOptions: [
            { size: "256GB", priceAdd: 0 },
            { size: "512GB", priceAdd: 20000 },
            { size: "1TB", priceAdd: 40000 }
        ],
        images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1695048132793-7b4931a5474c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1696426744093-6d9b990f3050?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1704285223387-a2f5f4bfa588?auto=format&fit=crop&q=80&w=800"
        ],
        features: [
            { title: "A17 Pro chip", description: "Game-changing performance.", icon: Cpu },
            { title: "Titanium design", description: "Strong. Light. Pro.", icon: Shield },
            { title: "48MP Main camera", description: "Advanced photography.", icon: Camera },
            { title: "Action button", description: "Fast track to favorites.", icon: Zap }
        ],
        specifications: [
            { label: "Display", value: "6.7-inch Super Retina XDR" },
            { label: "Capacity", value: "256GB, 512GB, 1TB" },
            { label: "Resistance", value: "Rated IP68 (Water/Dust)" },
            { label: "Camera", value: "Pro camera system (48MP Main)" }
        ]
    };

    const currentPrice = productData.basePrice + productData.storageOptions[selectedStorage].priceAdd;
    const formatPrice = (price: number) => price.toLocaleString('en-IN');

    return (
        <div className="w-full min-h-screen bg-[#faf9fc] pb-10 font-sans animate-in fade-in duration-500">
            {/* Nav / Actions */}
            <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-[#faf9fc]/85 backdrop-blur-md z-10">
                <button className="p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-gray-700 hover:text-[#712CDC] transition-colors border border-gray-100">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-3">
                    <button className="p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-gray-700 hover:text-[#712CDC] transition-colors border border-gray-100">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-colors border border-gray-100 ${isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                    >
                        <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            <div className="max-w-md mx-auto px-4 flex flex-col gap-5 pt-2">
                
                {/* Image Gallery */}
                <div className="w-full flex flex-col gap-5">
                    <div className="bg-white rounded-[32px] border border-[#f0ebf9] shadow-[0_8px_24px_rgba(113,44,220,0.04)] p-4 relative flex flex-col items-center justify-center aspect-square overflow-hidden group">
                        <div className="absolute top-5 left-5 bg-gradient-to-r from-[#712CDC] to-[#9b63f8] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-[0_4px_10px_rgba(113,44,220,0.3)] z-10">
                            {productData.discountPercentage}% OFF
                        </div>
                        <img 
                            src={productData.images[activeImage]} 
                            alt={productData.title} 
                            className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center gap-3">
                        {productData.images.map((img, index) => (
                            <button 
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`shrink-0 w-16 h-16 rounded-[18px] overflow-hidden flex items-center justify-center transition-all duration-300 ${
                                    activeImage === index 
                                    ? 'ring-2 ring-[#712CDC] ring-offset-2 shadow-md' 
                                    : 'opacity-60 hover:opacity-100 bg-white border border-gray-100'
                                }`}
                            >
                                <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title & Rating */}
                <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#712CDC] bg-[#f4f0ff] px-2 py-0.5 rounded uppercase tracking-widest border border-[#ece5ff]">
                            {productData.brand}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span>{productData.rating}</span>
                            <span className="text-amber-700/60 font-medium">({productData.reviews})</span>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#141414] leading-tight tracking-tight">
                        {productData.title}
                    </h1>
                </div>

                {/* Variants: Colors and Storage (MOVED UP) */}
                <div className="flex flex-col gap-5 mt-2">
                    {/* Colors */}
                    <div className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-[#141414] text-sm">Color</h3>
                            <span className="text-xs font-medium text-gray-500">{productData.colors[selectedColor].name}</span>
                        </div>
                        <div className="flex gap-3">
                            {productData.colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedColor(index)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        selectedColor === index 
                                        ? 'ring-2 ring-[#712CDC] ring-offset-2' 
                                        : 'ring-1 ring-gray-200 hover:ring-gray-400'
                                    }`}
                                >
                                    <div 
                                        className="w-8 h-8 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]" 
                                        style={{ backgroundColor: color.hex }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Storage */}
                    <div className="flex flex-col gap-2.5">
                        <h3 className="font-semibold text-[#141414] text-sm">Storage</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {productData.storageOptions.map((opt, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedStorage(index)}
                                    className={`flex-1 min-w-[80px] py-2.5 px-3 rounded-xl text-center text-sm font-semibold transition-all duration-300 border ${
                                        selectedStorage === index
                                        ? 'bg-[#f4f0ff] border-[#712CDC] text-[#712CDC]'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {opt.size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Price Section */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4 mt-2">
                    <div className="flex flex-col">
                        <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Offer Price</p>
                        <div className="flex items-end gap-2.5">
                            <span className="text-3xl font-bold text-[#141414] tracking-tight leading-none">
                                ₹{formatPrice(currentPrice)}
                            </span>
                            <span className="text-sm text-gray-400 line-through font-medium mb-1">
                                ₹{formatPrice(productData.originalPrice + productData.storageOptions[selectedStorage].priceAdd)}
                            </span>
                        </div>
                    </div>

                    <div className="h-[1px] w-full bg-gray-100" />

                    <div className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2.5 text-[#712CDC]">
                            <div className="w-8 h-8 rounded-full bg-[#f4f0ff] flex items-center justify-center border border-[#ece5ff]">
                                <span className="font-bold text-xs">%</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">No Cost EMI</span>
                                <span className="text-sm font-bold text-[#141414]">Starts at ₹{formatPrice(productData.emiStart)}/mo</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#712CDC] transition-all" />
                    </div>
                </div>

                {/* Key Features Grid */}
                <div className="mt-3 flex flex-col gap-3">
                    <h3 className="font-semibold text-[#141414] text-base">Key Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {productData.features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-white rounded-2xl p-3.5 border border-gray-100 flex flex-col gap-2 shadow-sm">
                                    <div className="w-8 h-8 rounded-full bg-[#f4f0ff] flex items-center justify-center text-[#712CDC]">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col mt-1">
                                        <span className="font-semibold text-sm text-[#141414] leading-tight">{feature.title}</span>
                                        <span className="text-[11px] font-medium text-gray-500 leading-snug mt-0.5">{feature.description}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Specifications List */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4.5 p-4 shadow-sm mt-3 flex flex-col gap-3">
                    <h3 className="font-semibold text-[#141414] text-base mb-1">Specifications</h3>
                    <div className="flex flex-col gap-2.5">
                        {productData.specifications.map((spec, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                <span className="text-xs font-medium text-gray-500">{spec.label}</span>
                                <span className="text-xs font-semibold text-[#141414] text-right max-w-[60%]">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                    <button className="text-[#712CDC] font-semibold text-xs flex items-center justify-center gap-1 mt-2 hover:underline">
                        View All Specifications <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
                
                {/* Trust Badges */}
                <div className="flex justify-between items-center p-3 bg-[#f4f0ff] rounded-xl mt-3 border border-[#ece5ff]">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <CheckCircle2 className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[9px] font-semibold text-gray-700 text-center uppercase tracking-wide">1 Yr Warranty</span>
                    </div>
                    <div className="w-[1px] h-6 bg-[#d8cbf5]" />
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <Shield className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[9px] font-semibold text-gray-700 text-center uppercase tracking-wide">Brand Assured</span>
                    </div>
                    <div className="w-[1px] h-6 bg-[#d8cbf5]" />
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <Info className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[9px] font-semibold text-gray-700 text-center uppercase tracking-wide">7 Day Return</span>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 mb-6 flex gap-2.5">
                     <button className="flex-[0.8] bg-white border border-gray-200 text-[#141414] rounded-xl py-3.5 text-sm font-bold flex items-center justify-center transition-transform active:scale-[0.98] hover:border-[#141414]">
                        Add to Cart
                    </button>
                    <button className="flex-[1.2] bg-[#712CDC] text-white rounded-xl py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-[0_4px_12px_rgba(113,44,220,0.25)] hover:bg-[#5b22b3]">
                        Buy with 1Fi EMI <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </div>
    );
}