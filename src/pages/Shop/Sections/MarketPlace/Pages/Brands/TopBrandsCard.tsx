import { useNavigate } from "react-router";

function TopBrandsCard(props: any) {
    const brandname = props.brandname;
    const logo = props.logo;
    const setbrand = props.setbrand;
    const setCurrentpage = props.setCurrentpage;
    return (
        <div onClick={() => {
            setbrand(brandname);
            setCurrentpage("Products")
        }}
            className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#b096f9] hover:bg-[#f4f0ff] hover:shadow-[0_8px_20px_rgba(113,44,220,0.1)] hover:-translate-y-1 cursor-pointer group aspect-square">

            {/* Image Container */}
            <div className="mb-3 flex items-center justify-center">

                {/* Image tag for your URL */}
                <img
                    src={logo}
                    alt={brandname}
                    className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
                />

            </div>

            {/* Brand Name */}
            <span className="text-[13px] font-medium text-gray-800 text-center tracking-tight line-clamp-1 group-hover:text-[#712CDC] transition-colors duration-300">
                {brandname}
            </span>

        </div>
    )
}
export default TopBrandsCard