import React from 'react';
import { motion } from 'framer-motion';

const Footer2 = ({ items, activeId, onItemClick }) => {
    // Si no se pasan items, usamos un array vacío o podríamos tener un default, 
    // pero para este caso asumimos que siempre se pasarán desde Home.
    const navItems = items || [];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            {/* Glass Container */}
            <div className="relative flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full shadow-lg">

                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => onItemClick && onItemClick(item.id)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-col items-center justify-center space-y-1 relative group"
                        >
                            <Icon
                                size={24}
                                className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}
                                strokeWidth={2}
                            />

                            <span className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                                {item.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default Footer2;
