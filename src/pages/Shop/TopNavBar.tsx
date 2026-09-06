import NavBarItem from "./navbaritem"

function TopNavBar(props: any) {
    return (
        <div className="relative z-[2] -mt-2 flex flex-col gap-4 px-1">
            <div
                className="flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
                role="tablist"
            >
            <NavBarItem ButtonName="Top Brands"  isactive={props.section==="Top Brands"} setsection={props.setsection}/>
            <NavBarItem ButtonName="Nearby Stores"  isactive={props.section==="Nearby Stores" } setsection={props.setsection}/>
            <NavBarItem ButtonName="Market Place"  isactive={props.section==="Market Place"} setsection={props.setsection}/>



            </div>
        </div>
    )
}
export default TopNavBar