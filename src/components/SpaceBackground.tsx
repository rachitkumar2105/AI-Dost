import { useEffect, useRef } from 'react';

export const SpaceBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#050510]">
            {/* Layer 1 - Small stars, slow */}
            <div className="absolute inset-0 animate-[space-travel_60s_linear_infinite] opacity-40">
                <div className="start-layer-1" />
            </div>

            {/* Layer 2 - Medium stars, medium speed */}
            <div className="absolute inset-0 animate-[space-travel_45s_linear_infinite] opacity-60">
                <div className="start-layer-2" />
            </div>

            {/* Layer 3 - Large stars, fast */}
            <div className="absolute inset-0 animate-[space-travel_30s_linear_infinite] opacity-80">
                <div className="start-layer-3" />
            </div>

            {/* Nebulas/Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-2000" />
        </div>
    );
};
