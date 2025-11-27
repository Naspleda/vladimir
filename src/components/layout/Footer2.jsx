import React, { useState } from 'react';
import { Home, FileText, Search, Settings } from 'lucide-react';

const Footer2 = () => {
    const [activeTab, setActiveTab] = useState('Home');

    const navItems = [
        { id: 'Home', icon: Home, label: 'Home' },
        { id: 'Feed', icon: FileText, label: 'Feed' },
        { id: 'Search', icon: Search, label: 'Search' },
        { id: 'Settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="relative">
                {/* Golden Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white-600/50 via-white-400/50 to-white-600/50 rounded-full blur opacity-75 animate-pulse"></div>

                {/* Glass Container */}
                <div className="relative flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl border border-yellow-200 rounded-full shadow-2xl  max-w-[270px] max-h-[50px]">

                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 relative group px-3`}
                            >
                                {/* Active Indicator Background */}
                                {isActive && (
                                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm -z-10" />
                                )}

                                <Icon
                                    size={18}
                                    className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />

                                <span className={`text-[10px] font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {item.label}
                                </span>

                                {/* Bottom Active Line */}
                                {isActive && (
                                    <div className="absolute -bottom-3 w-8 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer2;
