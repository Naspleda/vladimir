


export function ButtonBorder({...props}){
    const { title, primaryColor, lightColor } = props;
    return (
        <button className="w-24 relative inline-flex h-12 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fffdf5_0%,#3f3100_50%,#ffefb5_100%)]" />
            <span className="font-title inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-black px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl text-[#C0A080] hover:bg-transparent hover:text-[#001f4c] transition-all duration-200">
            {title}
            </span>
        </button>
    )
}