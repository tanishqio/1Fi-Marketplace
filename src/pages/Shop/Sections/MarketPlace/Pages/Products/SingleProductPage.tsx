import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
    ChevronDown, ArrowRight, CheckCircle2, ChevronLeft,
    Star, Shield, Heart, ChevronUp, Zap, Info,
    Cpu, Camera, Package
} from 'lucide-react';
import { ProductContext } from '@/context/ProductContext';
import useGetSingleProduct from '@/hooks/useGetSingleProduct';

// ─── Static EMI Plans ────────────────────────────────────────────────
const EMI_PLANS = [
    { months: 3,  label: '3 months',  bank: 'Any Card',     tag: 'No Cost'  },
    { months: 6,  label: '6 months',  bank: 'Any Card',     tag: 'No Cost'  },
    { months: 12, label: '12 months', bank: 'HDFC / ICICI', tag: 'Low Cost' },
    { months: 24, label: '24 months', bank: 'HDFC / ICICI', tag: 'Standard' },
];

// Feature icon map
const FEATURE_ICONS: Record<string, React.ElementType> = {
    'A19 Pro Chip':    Cpu,
    'Titanium Design': Shield,
    '48MP Main Camera':Camera,
    'Action Button':   Zap,
};
const DEFAULT_ICON = Package;

// ─── Skeleton ────────────────────────────────────────────────────────
function SingleProductSkeleton() {
    return (
        <div className="w-full min-h-screen bg-[#faf9fc] pb-10 animate-pulse">
            <div className="flex justify-between items-center px-4 py-4">
                <div className="w-10 h-10 rounded-full bg-gray-200/70" />
                <div className="w-32 h-4 rounded-full bg-gray-200/70" />
                <div className="w-10 h-10 rounded-full bg-gray-200/70" />
            </div>
            <div className="max-w-md mx-auto px-4 flex flex-col gap-5 pt-2">
                <div className="w-full aspect-square rounded-[32px] bg-gray-200/60" />
                <div className="flex justify-center gap-3">
                    {[0,1,2,3].map(i => <div key={i} className="w-14 h-14 rounded-[16px] bg-gray-200/60" />)}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="h-4 w-20 bg-gray-200/60 rounded-full" />
                    <div className="h-7 w-4/5 bg-gray-200/60 rounded-full" />
                    <div className="h-4 w-2/5 bg-gray-200/60 rounded-full" />
                    <div className="h-10 w-full bg-gray-200/60 rounded-xl mt-1" />
                </div>
                <div className="h-14 w-full rounded-2xl bg-gray-200/60" />
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-4">
                    <div className="h-8 w-1/2 bg-gray-200/60 rounded-full" />
                    <div className="h-px bg-gray-100" />
                    <div className="h-12 w-full bg-gray-200/60 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {[0,1,2,3].map(i => <div key={i} className="h-24 rounded-2xl bg-gray-200/60" />)}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function SingleProductPage() {
    const { productid } = useContext(ProductContext) as any;
    const { data, isLoading, isError } = useGetSingleProduct(productid);

    const [activeImage,     setActiveImage]     = useState(0);
    const [imageFading,     setImageFading]      = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [isLiked,         setIsLiked]         = useState(false);
    const [variantOpen,     setVariantOpen]      = useState(false);
    const [emiOpen,         setEmiOpen]          = useState(false);
    const [selectedEmi,     setSelectedEmi]      = useState(0);

    // Fade transition when switching images
    const changeImage = useCallback((idx: number) => {
        setImageFading(true);
        setTimeout(() => {
            setActiveImage(idx);
            setImageFading(false);
        }, 140);
    }, []);

    // Reset gallery when variant changes
    useEffect(() => { changeImage(0); }, [selectedVariant]);

    // ── Guards ──
    if (isLoading) return <SingleProductSkeleton />;
    if (isError || !data?.product?.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#faf9fc] gap-3 px-6 text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                    <Info className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-base font-semibold text-gray-700">Couldn't load product</p>
                <p className="text-sm text-gray-400">Please go back and try again.</p>
            </div>
        );
    }

    const product  = data.product[0];
    const variants = product.variants;
    const variant  = variants[selectedVariant];

    // Sort by Position, extract imageUrl. Fall back to product.ImageUrl if empty.
    const images: string[] =
        variant.images && variant.images.length > 0
            ? [...variant.images]
                  .sort((a: any, b: any) => a.Position - b.Position)
                  .map((img: any) => img.imageUrl as string)
            : [product.ImageUrl];

    const hasMultipleImages = images.length > 1;

    const formatPrice  = (p: number) => p.toLocaleString('en-IN');
    const emiMonthly   = Math.floor(variant.price / EMI_PLANS[selectedEmi].months);
    const variantLabel = (v: typeof variant) => `${v.attributes.color} · ${v.attributes.storage}`;
    const currentPlan  = EMI_PLANS[selectedEmi];

    const features       = product.ProductDetails?.features       ?? [];
    const specifications = product.ProductDetails?.specifications ?? [];

    return (
        // Extra pb-32 so content is never hidden behind the sticky CTA bar
        <div className="w-full min-h-screen bg-[#faf9fc] font-sans pb-32">

            {/* ── Sticky Nav ── */}
            <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-[#faf9fc]/90 backdrop-blur-md z-20">
                <button className="p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] text-gray-700 hover:text-[#712CDC] transition-colors border border-gray-100">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{product.Name}</span>
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2.5 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-colors border border-gray-100 ${isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                >
                    <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="max-w-md mx-auto px-4 flex flex-col gap-5 pt-2">

                {/* ── Main Image ── */}
                <div className="bg-white rounded-[32px] border border-[#f0ebf9] shadow-[0_8px_32px_rgba(113,44,220,0.06)] p-4 relative flex items-center justify-center aspect-square overflow-hidden group">
                    {/* Image counter */}
                    {hasMultipleImages && (
                        <div className="absolute top-4 left-4 z-10 bg-black/30 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                            {activeImage + 1} / {images.length}
                        </div>
                    )}
                    {/* Low stock badge */}
                    {variant.stock <= 10 && variant.stock > 0 && (
                        <div className="absolute top-4 right-4 z-10 bg-amber-50 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                            Only {variant.stock} left
                        </div>
                    )}
                    <img
                        src={images[activeImage]}
                        alt={`${product.Name} — view ${activeImage + 1}`}
                        className={`w-full h-full object-contain rounded-[20px] group-hover:scale-105 transition-all duration-500 ${imageFading ? 'opacity-0' : 'opacity-100'}`}
                        style={{ transition: 'opacity 140ms ease, transform 500ms ease' }}
                    />
                </div>

                {/* ── Thumbnails (only when multiple images) ── */}
                {hasMultipleImages && (
                    <div className="flex justify-center gap-3 flex-wrap">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => changeImage(idx)}
                                className={`shrink-0 w-14 h-14 rounded-[16px] overflow-hidden bg-white transition-all duration-300 ${
                                    activeImage === idx
                                        ? 'ring-2 ring-[#712CDC] ring-offset-2 shadow-md opacity-100'
                                        : 'opacity-40 hover:opacity-80 border border-gray-100'
                                }`}
                            >
                                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Title, Rating, Description ── */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span>{(product.Rating / 2).toFixed(1)}</span>
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                            variant.stock > 10
                                ? 'bg-green-50 text-green-600 border-green-100'
                                : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                            {variant.stock > 10 ? 'In Stock' : `${variant.stock} left`}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#141414] leading-tight tracking-tight">
                        {product.Name}
                    </h1>
                    <p className="text-sm text-gray-400 font-medium">{variantLabel(variant)}</p>
                    {product.description && (
                        <p className="text-[13px] text-gray-500 leading-relaxed bg-gray-50 rounded-xl px-3 py-2.5 mt-0.5 border border-gray-100">
                            {product.description}
                        </p>
                    )}
                </div>

                {/* ── Variant Dropdown ── */}
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Select Variant</span>
                    <div className="relative z-10">
                        <button
                            onClick={() => setVariantOpen(!variantOpen)}
                            className="w-full flex items-center justify-between bg-white border border-[#ece5ff] rounded-2xl px-4 py-3.5 shadow-sm hover:border-[#712CDC] transition-colors"
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-semibold text-[#141414]">{variantLabel(variant)}</span>
                                <span className="text-xs text-[#712CDC] font-semibold mt-0.5">₹{formatPrice(variant.price)}</span>
                            </div>
                            {variantOpen
                                ? <ChevronUp   className="w-4 h-4 text-[#712CDC] shrink-0" />
                                : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                            }
                        </button>

                        {variantOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#ece5ff] rounded-2xl shadow-[0_12px_32px_rgba(113,44,220,0.12)] overflow-hidden">
                                {variants.map((v: typeof variant, idx: number) => (
                                    <button
                                        key={v.id}
                                        onClick={() => { setSelectedVariant(idx); setVariantOpen(false); }}
                                        className={`w-full flex items-center justify-between px-4 py-3.5 transition-colors ${
                                            idx === selectedVariant ? 'bg-[#f4f0ff]' : 'hover:bg-gray-50'
                                        } ${idx < variants.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className={`text-sm font-semibold ${idx === selectedVariant ? 'text-[#712CDC]' : 'text-[#141414]'}`}>
                                                {variantLabel(v)}
                                            </span>
                                            <span className="text-[11px] text-gray-400 mt-0.5">
                                                {v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-bold ${idx === selectedVariant ? 'text-[#712CDC]' : 'text-gray-700'}`}>
                                                ₹{formatPrice(v.price)}
                                            </span>
                                            {idx === selectedVariant && (
                                                <CheckCircle2 className="w-4 h-4 text-[#712CDC] shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Price + EMI Block ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-4">
                    {/* Price */}
                    <div className="flex flex-col">
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Price</p>
                        <span className="text-3xl font-bold text-[#141414] tracking-tight leading-none">
                            ₹{formatPrice(variant.price)}
                        </span>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* EMI trigger — label updates dynamically based on selected plan */}
                    <button
                        onClick={() => setEmiOpen(!emiOpen)}
                        className="flex items-center justify-between w-full group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#f4f0ff] flex items-center justify-center border border-[#ece5ff] shrink-0 text-[#712CDC]">
                                <Zap className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col items-start">
                                {/* Dynamic label: reflects the selected plan's tag */}
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                    currentPlan.tag === 'No Cost'
                                        ? 'text-green-500'
                                        : currentPlan.tag === 'Low Cost'
                                        ? 'text-blue-500'
                                        : 'text-gray-400'
                                }`}>
                                    {currentPlan.tag} EMI
                                </span>
                                <span className="text-sm font-bold text-[#141414]">
                                    ₹{formatPrice(emiMonthly)}/mo · {currentPlan.months} months
                                </span>
                            </div>
                        </div>
                        {emiOpen
                            ? <ChevronUp   className="w-4 h-4 text-[#712CDC] shrink-0" />
                            : <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#712CDC] transition-colors shrink-0" />
                        }
                    </button>

                    {/* EMI plan list */}
                    {emiOpen && (
                        <div className="flex flex-col gap-2 pt-1">
                            <div className="h-px bg-gray-100 -mx-4 mb-1" />
                            {EMI_PLANS.map((plan, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedEmi(idx)}
                                    className={`flex items-center justify-between px-3 py-3 rounded-xl border transition-all ${
                                        selectedEmi === idx
                                            ? 'bg-[#f4f0ff] border-[#712CDC]'
                                            : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                                    }`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className={`text-sm font-semibold ${selectedEmi === idx ? 'text-[#712CDC]' : 'text-[#141414]'}`}>
                                            {plan.label}
                                        </span>
                                        <span className="text-[11px] text-gray-400 mt-0.5">{plan.bank}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col items-end">
                                            <span className={`text-sm font-bold ${selectedEmi === idx ? 'text-[#712CDC]' : 'text-gray-700'}`}>
                                                ₹{formatPrice(Math.floor(variant.price / plan.months))}/mo
                                            </span>
                                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 ${
                                                plan.tag === 'No Cost'
                                                    ? 'bg-green-50 text-green-600'
                                                    : plan.tag === 'Low Cost'
                                                    ? 'bg-blue-50 text-blue-600'
                                                    : 'bg-gray-100 text-gray-500'
                                            }`}>{plan.tag}</span>
                                        </div>
                                        {selectedEmi === idx && (
                                            <CheckCircle2 className="w-4 h-4 text-[#712CDC] shrink-0" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Key Features Grid ── */}
                {features.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold text-[#141414]">Key Features</h2>
                        <div className="grid grid-cols-2 gap-2.5">
                            {features.map((f: { title: string; description: string }, i: number) => {
                                const Icon = FEATURE_ICONS[f.title] ?? DEFAULT_ICON;
                                return (
                                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-2.5 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-[#f4f0ff] flex items-center justify-center text-[#712CDC] border border-[#ece5ff]">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-[#141414] leading-tight">{f.title}</span>
                                            <span className="text-[11px] text-gray-400 mt-0.5 leading-snug">{f.description}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ── Specifications ── */}
                {specifications.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-1">
                        <h2 className="text-base font-bold text-[#141414] mb-2">Specifications</h2>
                        {specifications.map((s: { label: string; value: string }, i: number) => (
                            <div
                                key={i}
                                className={`flex justify-between items-start py-2.5 ${i < specifications.length - 1 ? 'border-b border-gray-50' : ''}`}
                            >
                                <span className="text-xs text-gray-400 font-medium shrink-0">{s.label}</span>
                                <span className="text-xs font-semibold text-[#141414] text-right max-w-[58%]">{s.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Trust Badges ── */}
                <div className="flex justify-between items-center p-3 bg-[#f4f0ff] rounded-xl border border-[#ece5ff]">
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <CheckCircle2 className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[10px] font-semibold text-gray-600 text-center uppercase tracking-wide">1 Yr Warranty</span>
                    </div>
                    <div className="w-px h-6 bg-[#d8cbf5]" />
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <Shield className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[10px] font-semibold text-gray-600 text-center uppercase tracking-wide">Brand Assured</span>
                    </div>
                    <div className="w-px h-6 bg-[#d8cbf5]" />
                    <div className="flex flex-col items-center gap-1 flex-1">
                        <Info className="w-4 h-4 text-[#712CDC]" />
                        <span className="text-[10px] font-semibold text-gray-600 text-center uppercase tracking-wide">7 Day Return</span>
                    </div>
                </div>

            </div>

            {/* ── Sticky CTA Bar — fixed above the app's bottom nav ── */}
            <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
                 style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
                <div className="max-w-[500px] mx-auto px-4 pb-3 pointer-events-auto">
                    <div className="flex gap-2.5 bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-[0_-4px_24px_rgba(113,44,220,0.10)] border border-white/60">
                        <button className="flex-[0.8] bg-gray-50 border border-gray-200 text-[#141414] rounded-xl py-3 text-sm font-bold flex items-center justify-center transition-all active:scale-[0.97] hover:border-[#141414]">
                            Add to Cart
                        </button>
                        <button className="flex-[1.2] bg-[#712CDC] text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97] shadow-[0_4px_16px_rgba(113,44,220,0.35)] hover:bg-[#5b22b3]">
                            Buy with 1Fi EMI <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}