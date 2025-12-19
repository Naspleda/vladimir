import React from 'react';


const Footer2 = ({ items, activeId, onItemClick }) => {
    // Si no se pasan items, usamos un array vacío o podríamos tener un default, 
    // pero para este caso asumimos que siempre se pasarán desde Home.
    const navItems = items || [];

    return (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            {/* Container with gap */}
            <div className="relative flex items-center justify-between w-full gap-8">
                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onItemClick && onItemClick(item.id)}
                            className={`
                                flex flex-col items-center justify-center space-y-1 relative group 
                                transition-all duration-200 hover:scale-105 active:scale-95
                                flex-1 py-3 px-2 rounded-2xl
                                bg-black/40 backdrop-blur-2xl border border-white/20 shadow-lg
                                ${isActive ? 'bg-black/60 border-white/40' : ''}
                            `}
                        >
                            <Icon
                                size={24}
                                className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                                strokeWidth={2}
                            />

                            <span className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Footer2;
