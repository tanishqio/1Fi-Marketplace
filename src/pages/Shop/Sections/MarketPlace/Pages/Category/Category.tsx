import React from 'react';
import {
    Smartphone,
    Laptop,
    Gem,
    CarFront,
    Watch,
    ShoppingBag,
    Sparkles
} from "lucide-react";
import Card from './Card';

export default function CategoryPage(props: any) {
    //   hard coding the categories 
    const categories = [
        { name: "Mobiles", icon: Smartphone },
        { name: "Laptops", icon: Laptop },
        { name: "Gold", icon: Gem },
        { name: "Vehicles", icon: CarFront },
        { name: "Wearables", icon: Watch },
        { name: "LifeStyle", icon: ShoppingBag },
    ];
    const setCurrentpage = props.setCurrentpage;
    const setCategory = props.setCategory;

    return (
        <div className="max-w-md mx-auto p-4 flex flex-col gap-3">
            {/* first section -> heading*/}

            <div className="items-center justify-between ">
                <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900 text-center">
                    Shop By Category
                </p>
            </div>
            {/* second section -> grid of categories*/}

            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, index) => {
                    const Icon = cat.icon;
                    return (
                        <Card name={cat.name} Icon={Icon} index={index} setCategory={setCategory} setCurrentpage={setCurrentpage}/>
                    );
                })}
            </div>
            {/* third section -> more categories line */}
            <div>
                <div className="mt-6 w-full flex flex-row items-center justify-center rounded-[24px] border-2 border-dashed border-[#e2d8ff] bg-[#fbfaff] py-4 px-4 cursor-default">
                    <div className="text-[11px] font-bold text-[#712CDC] tracking-[0.15em] uppercase text-center">
                        More categories coming soon
                    </div>
                    <span className="ml-3 mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f0ff] text-[#712CDC]">
                        <Sparkles className="h-5 w-5 animate-pulse" strokeWidth={1.5} />
                    </span>
                </div>
            </div>

        </div>
    );
}