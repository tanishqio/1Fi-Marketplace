function Card(props: any) {
    const Icon = props.Icon
    const Index = props.index
    const setCurrentpage = props.setCurrentpage;
    const setCategory = props.setCategory;

    return (
        <div onClick={() => {
            setCurrentpage("Brands")
            console.log("rrahced here")
            setCategory(props.name)
        }}
            key={Index}
            className="w-full h-40 aspect-[4/5] flex flex-col items-center justify-center rounded-[24px] bg-white border border-gray-100 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-400 ease-out hover:border-[#e2d8ff]
               hover:shadow-[0_10px_30px_rgba(113,44,220,0.08)] hover:-translate-y-1 cursor-pointer group overflow-hidden relative"
        >

            {/* Icon Container */}
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center text-gray-400 group-hover:text-[#712CDC] transition-colors duration-300">
                {/* Thin strokeWidth (1.25) is crucial for the minimal aesthetic */}
                <Icon className="h-30 w-30" strokeWidth={1.25} />
            </div>

            {/* Typography */}
            <span className="relative z-10 text-[11px] font-bold text-gray-500 tracking-[0.15em] uppercase group-hover:text-gray-900 transition-colors duration-300 mt-0 mb-2">
                {props.name}
            </span>


        </div>
    )
}
export default Card