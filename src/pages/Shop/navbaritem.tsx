function NavBarItem(props: any) {
    return (
        <button type="button"
            role="tab"
            aria-selected={props.isactive}
            className={`relative flex-1 rounded-full py-[11px] text-center text-sm font-semibold tracking-[-0.005em] transition-all ${props.isactive
                    ? "bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            onClick={() => props.setsection(props.ButtonName)}
        >
            {props.ButtonName}

            {props.isactive && <span className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[22px] -translate-x-1/2 rounded-full bg-[#712CDC]" />}
        </button>
    )
}
export default NavBarItem