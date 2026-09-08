export default function TransparentProductcard() {
    // Creates exactly 2 empty slots for a single row of phone cards
    const skeletonArray = new Array(2).fill(0);

    return (
        <div className="grid grid-cols-2 gap-4">
            {skeletonArray.map((_, index) => (
                <div 
                    key={index} 
                    className="flex flex-col p-3 rounded-[20px] bg-white/40 border border-gray-200/50 shadow-sm animate-pulse"
                >
                    {/* Transparent Image Placeholder (Maintains the 4/5 aspect ratio) */}
                    <div className="w-full aspect-[4/5] bg-gray-200/50 rounded-[14px] mb-3"></div>
                    
                    {/* Product Details Section */}
                    <div className="flex flex-col flex-grow">
                        
                        {/* Brand & Name (Simulating 2 lines of text) */}
                        <div className="h-3 w-3/4 bg-gray-200/50 rounded-full mb-1.5"></div>
                        <div className="h-3 w-1/2 bg-gray-200/50 rounded-full mb-3"></div>
                        
                        {/* Specs Subtitle Placeholder */}
                        <div className="h-2 w-2/3 bg-gray-200/50 rounded-full mb-auto"></div>
                        
                        {/* Price & Action Button Row */}
                        <div className="mt-4 flex items-end justify-between">
                            
                            {/* Pricing Area */}
                            <div className="flex flex-col">
                                {/* Main Price */}
                                <div className="h-4 w-16 bg-gray-200/50 rounded-full mb-1.5"></div>
                                {/* EMI text */}
                                <div className="h-2.5 w-20 bg-gray-200/50 rounded-full"></div>
                            </div>

                            {/* Quick Add Button Placeholder */}
                            <div className="h-7 w-7 rounded-full bg-gray-200/50 flex-shrink-0"></div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}