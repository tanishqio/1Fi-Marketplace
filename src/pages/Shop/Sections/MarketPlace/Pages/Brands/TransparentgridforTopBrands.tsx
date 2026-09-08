export default function TransparentSkeletonGrid() {
    // Creates exactly 6 empty slots for the grid
    const skeletonArray = new Array(6).fill(0);

    return (
        /* Using a React Fragment (<>) so these items drop directly into the parent's grid */
        <>
            {skeletonArray.map((_, index) => (
                <div 
                    key={index} 
                    className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-white/40 border border-gray-200/50 shadow-sm aspect-square animate-pulse"
                >
                    {/* Transparent Image Placeholder */}
                    <div className="mb-3 w-12 h-12 rounded-full bg-gray-200/50"></div>
                    
                    {/* Transparent Text Placeholder */}
                    <div className="h-3 w-14 rounded-full bg-gray-200/50 mt-1"></div>
                </div>
            ))}
        </>
    );
}