

export function Navitem(props: any) {
    const Icon = props.icon
    const isactive = props.isactive
    return (
        isactive ? (<div onClick={props.onClick} className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] bg-[radial-gradient(circle_at_center,rgba(113,44,220,0.08),transparent_70%)] px-1 py-2 text-center text-[#712CDC]" >
            <div className="absolute top-0 h-[3px] w-8 rounded-full bg-[#712CDC]" />
            <Icon size={22} className="drop-shadow-[0_2px_4px_rgba(113,44,220,0.15)]" />
            <span className="text-[10px] font-bold">
                {props.name}
            </span>
        </div>) :
            (
                <div onClick={props.onClick} className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center text-gray-400">
                    <Icon size={22} />
                    <span className="text-[10px] font-medium">
                        {props.name}
                    </span>
                </div>
            )
    )

}