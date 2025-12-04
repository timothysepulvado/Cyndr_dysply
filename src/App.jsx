import React, { useState, useEffect, useMemo } from 'react';
import { Play, X, Aperture, Clock, Download, Share2, Activity, Maximize2, Grid, Hexagon, Zap, Layers, Box } from 'lucide-react';

/**
 * CYLNDR DESIGN SYSTEM V3 (CREDS DECK ALIGNMENT)
 * THEME: ACID BRUTALISM // MULTI-PILLAR
 */

const THEMES = {
    ALL: { color: '#0e0d1d', bg: 'bg-carbon', label: 'OVERVIEW', text: 'text-lead-white' },
    IMAGES: { color: '#fff6ec', bg: 'bg-lead-white', label: 'STATIC ASSETS', text: 'text-carbon' },
    VIDEOS: { color: '#025f1d', bg: 'bg-oxidized-green', label: 'MOTION ASSETS', text: 'text-lead-white' },
    CONTENT: { color: '#ff3800', bg: 'bg-lead-white', label: 'CONTENT STUDIO', text: 'text-heat' },
    DESIGN: { color: '#025f1d', bg: 'bg-oxidized-green', label: 'DESIGN STUDIO', text: 'text-lead-white' },
    PRODUCTION: { color: '#eeff00', bg: 'bg-carbon', label: 'PRODUCTION', text: 'text-catalyst-neon' },
    INFLUENCER: { color: '#ff3800', bg: 'bg-heat', label: 'INFLUENCER', text: 'text-carbon' }
};

// ... (generateMockAssets remains the same) ...






const generateMockAssets = () => {
    const assets = [];
    const pillars = ['CONTENT', 'DESIGN', 'PRODUCTION', 'INFLUENCER'];
    const clients = ['Samsung', 'Nike', 'Google', 'Spotify', 'Choice Hotels', 'Crocs', 'Little Caesars', 'Microsoft', 'Amex'];

    // Create 40 Videos
    for (let i = 0; i < 40; i++) {
        assets.push({ type: 'video', id: `VID-${i}` });
    }
    // Create 60 Images
    for (let i = 0; i < 60; i++) {
        assets.push({ type: 'image', id: `IMG-${i}` });
    }

    // Shuffle
    assets.sort(() => Math.random() - 0.5);

    return assets.map((item, i) => {
        const pillar = pillars[Math.floor(Math.random() * pillars.length)];
        const client = clients[Math.floor(Math.random() * clients.length)];
        const baseScore = Math.floor(Math.random() * (100 - 88) + 88);

        return {
            id: `CYL-${String(i + 1).padStart(4, '0')}`,
            type: item.type,
            pillar: pillar,
            url: item.type === 'image'
                ? `https://picsum.photos/seed/${i * 123}/800/${i % 2 === 0 ? '1000' : '600'}`
                : `https://picsum.photos/seed/${i * 123}/800/450`,
            client: client,
            title: `${client} // ${pillar} ${item.type === 'image' ? 'Campaign' : 'Motion'} ${String(i + 1).padStart(2, '0')}`,
            score: baseScore,
            dimensions: item.type === 'video' ? '4K DCI' : 'RAW',
            date: '2025',
            tags: ['Social', 'Broadcast', 'Digital', 'OOH'].sort(() => 0.5 - Math.random()).slice(0, 2)
        };
    });
};

// --- SUB-COMPONENTS ---

const TechBadge = ({ children, color, className = '' }) => (
    <span
        className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-headline uppercase tracking-widest border border-carbon whitespace-nowrap bg-lead-white text-carbon ${className}`}
    >
        {children}
    </span>
);

const Header = ({ activePillar, setActivePillar }) => {
    const theme = THEMES[activePillar];
    const isDark = ['ALL', 'VIDEOS', 'PRODUCTION', 'DESIGN'].includes(activePillar);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 h-20 shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#0e0d1d]' : 'bg-[#fff6ec] border-b-4 border-carbon'}`}>
            <div className="max-w-[2000px] mx-auto px-6 h-full flex items-center justify-between">

                {/* Logo Area */}
                <div className="flex items-center gap-6 cursor-pointer" onClick={() => setActivePillar('ALL')}>
                    <span className={`font-headline font-bold text-4xl tracking-tighter ${isDark ? 'text-lead-white' : 'text-carbon'}`}>CYLNDR</span>
                </div>

                {/* Pillar Nav */}
                <div className="hidden lg:flex items-center h-full">
                    {['IMAGES', 'VIDEOS'].map((item) => {
                        const isActive = activePillar === item;
                        const themeColor = THEMES[item].color;

                        return (
                            <button
                                key={item}
                                onClick={() => setActivePillar(item)}
                                className={`
                     group relative h-full px-6 flex items-center justify-center border-l-2 border-carbon
                     transition-colors duration-200
                     ${isActive ? 'bg-carbon text-white' : (isDark ? 'hover:bg-white/10 text-lead-white' : 'hover:bg-lead-white text-carbon')}
                   `}
                            >
                                {isActive && (
                                    <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: themeColor }} />
                                )}
                                <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white' : (isDark ? 'text-lead-white/60 group-hover:text-lead-white' : 'text-carbon/60 group-hover:text-carbon')}`}>
                                    {item}
                                </span>
                            </button>
                        );
                    })}
                    <div className="w-1 h-full bg-carbon ml-0" />
                </div>


            </div>
        </header>
    );
};

const AssetCard = ({ asset, onClick, themeColor, isDark }) => {
    return (
        <div
            className="group break-inside-avoid mb-4 cursor-pointer"
            onClick={() => onClick(asset)}
        >
            <div
                className={`relative w-full border-2 transition-transform duration-200 hover:-translate-y-1 ${isDark ? 'bg-carbon border-lead-white' : 'bg-lead-white border-carbon'}`}
                style={{
                    boxShadow: '0 0 0 0 transparent',
                }}
            >
                {/* Custom Hover Shadow via inline styles for dynamic color */}
                <div
                    className="absolute inset-0 -z-10 transition-all duration-200 group-hover:translate-x-[4px] group-hover:translate-y-[4px]"
                    style={{ backgroundColor: isDark ? themeColor : '#0e0d1d' }}
                />

                {/* Media */}
                <div className={`relative w-full ${asset.type === 'video' ? 'aspect-video' : 'aspect-[3/4]'} border-b-2 overflow-hidden ${isDark ? 'bg-carbon border-lead-white' : 'bg-lead-white border-carbon'}`}>
                    {/* Tint Overlay on Hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-0 z-10 mix-blend-multiply"
                        style={{ backgroundColor: themeColor }}
                    />

                    <img
                        src={asset.url}
                        alt={asset.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                    />

                    {/* Type Icon */}
                    <div className="absolute top-3 right-3 z-20">
                        <div className={`p-1 ${isDark ? 'bg-lead-white text-carbon' : 'bg-carbon text-white'}`}>
                            {asset.type === 'video' ? <Play className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                <div className={`p-2 ${isDark ? 'bg-carbon' : 'bg-lead-white'}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: THEMES[asset.pillar].color }} />
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-lead-white' : 'text-carbon'}`}>{asset.pillar}</span>
                    </div>
                    <h3 className={`text-[10px] font-bold leading-tight uppercase mb-2 line-clamp-2 ${isDark ? 'text-lead-white' : 'text-carbon'}`}>{asset.title}</h3>

                    <div className={`flex justify-between items-end border-t pt-1 mt-2 ${isDark ? 'border-lead-white/20' : 'border-zinc-200'}`}>
                        <span className={`text-[10px] font-headline uppercase ${isDark ? 'text-lead-white/50' : 'text-carbon/50'}`}>{asset.client}</span>
                        <span className={`text-[10px] font-headline font-bold ${isDark ? 'text-lead-white' : 'text-carbon'}`}>{asset.score}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailView = ({ asset, onClose }) => {
    if (!asset) return null;
    const theme = THEMES[asset.pillar];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon/95 p-4 md:p-8">
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative w-full max-w-6xl h-[90vh] bg-lead-white border-4 border-carbon flex flex-col md:flex-row shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">

                {/* Close Btn */}
                <button
                    onClick={onClose}
                    className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-12 h-12 bg-carbon text-white border-2 border-white flex items-center justify-center hover:scale-110 transition-transform z-50"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left: Visuals */}
                <div className="flex-grow relative bg-lead-white flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-carbon overflow-hidden group">
                    <div className="absolute inset-0 opacity-5 mix-blend-multiply pointer-events-none" style={{ backgroundColor: theme.color }} />

                    <img
                        src={asset.url}
                        className="max-w-[90%] max-h-[90%] object-contain shadow-2xl border-2 border-carbon"
                        alt="Detail"
                    />

                    {/* Floating Pillar Tag */}
                    <div className="absolute top-6 left-6 bg-carbon text-white px-4 py-2 text-xs font-bold tracking-widest uppercase border-2 border-white">
                        {asset.pillar}
                    </div>
                </div>

                {/* Right: Data */}
                <div className="w-full md:w-[400px] flex flex-col bg-lead-white">
                    <div className="p-8 border-b-4 border-carbon">
                        <h2 className="text-5xl font-black text-carbon leading-[0.85] tracking-tighter uppercase mb-4 break-words">
                            {asset.client}
                        </h2>
                        <div className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest border-2 border-carbon" style={{ backgroundColor: theme.color }}>
                            {asset.type}
                        </div>
                    </div>

                    <div className="p-8 space-y-8 flex-grow overflow-y-auto">
                        <div>
                            <label className="block text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-2">Project Title</label>
                            <p className="text-sm font-bold uppercase leading-relaxed border-l-4 border-carbon pl-4">
                                {asset.title}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-1">Year</label>
                                <p className="text-xl font-black">2025</p>
                            </div>
                            <div>
                                <label className="block text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-1">Region</label>
                                <p className="text-xl font-black">GLOBAL</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-3">Capabilities</label>
                            <div className="flex flex-wrap gap-2">
                                {asset.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-lead-white border border-carbon text-[10px] font-headline uppercase font-bold hover:bg-carbon hover:text-white transition-colors cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t-4 border-carbon bg-lead-white mt-auto">
                        <button className="w-full h-14 bg-carbon text-white font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3">
                            <Download className="w-4 h-4" /> Download Asset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-carbon text-white py-12 border-t-4 border-white">
        <div className="max-w-[2000px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 className="text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-4">Leadership</h4>
                <ul className="space-y-2 text-xs font-bold uppercase tracking-wide text-zinc-300">
                    <li>Sylvain Tron <span className="text-carbon/60 ml-1">// MD</span></li>
                    <li>Kara O'Halloran <span className="text-carbon/60 ml-1">// Exec Dir</span></li>
                    <li>Suz Keen <span className="text-carbon/60 ml-1">// ECD</span></li>
                    <li>Can Misirlioglu <span className="text-carbon/60 ml-1">// ECD</span></li>
                    <li>Abby Bako <span className="text-carbon/60 ml-1">// Dir Inf</span></li>
                </ul>
            </div>
            <div className="md:col-span-2">
                <h4 className="text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-4">Statement</h4>
                <p className="text-xl md:text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white max-w-lg">
                    Modern Content, <span className="text-carbon/50">Powered by Design.</span>
                </p>
            </div>
            <div className="flex flex-col justify-between items-start md:items-end">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-4">
                    <span className="font-serif italic text-2xl">C</span>
                </div>
                <span className="text-[10px] font-headline text-carbon/50">© 2025 CYLNDR STUDIOS</span>
            </div>
        </div>
    </footer>
);

export default function App() {
    const [activePillar, setActivePillar] = useState('ALL');
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [loading, setLoading] = useState(true);

    // Derive current theme colors based on selection
    const currentTheme = THEMES[activePillar];

    useEffect(() => {
        // Simulate data load
        setTimeout(() => {
            setAssets(generateMockAssets());
            setLoading(false);
        }, 1200);
    }, []);

    const displayedAssets = useMemo(() => {
        if (activePillar === 'ALL') return assets;
        if (activePillar === 'IMAGES') return assets.filter(a => a.type === 'image');
        if (activePillar === 'VIDEOS') return assets.filter(a => a.type === 'video');
        return assets;
    }, [assets, activePillar]);

    // Dynamic background style for the hero section
    const heroStyle = {
        backgroundColor: activePillar === 'ALL' ? '#0e0d1d' : (activePillar === 'IMAGES' ? '#fff6ec' : '#025f1d'),
        color: activePillar === 'ALL' ? '#fff6ec' : (activePillar === 'IMAGES' ? '#0e0d1d' : '#fff6ec')
    };

    if (loading) {
        return (
            <div className="h-screen w-screen bg-carbon flex flex-col items-center justify-center text-white relative overflow-hidden">
                {/* Static Noise Overlay */}
                <div className="absolute inset-0 z-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }} />

                <div className="flex flex-col items-center gap-6 z-10">
                    <div className="text-6xl font-black tracking-tighter animate-pulse">CYLNDR</div>
                    <div className="flex gap-2">
                        {['#FF4D00', '#00FFFF', '#CCFF00', '#9333EA'].map((c, i) => (
                            <div key={i} className="w-3 h-3" style={{ backgroundColor: c }} />
                        ))}
                    </div>
                    <div className="font-headline text-[10px] tracking-[0.3em]">INITIALIZING...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-lead-white text-carbon font-body selection:bg-carbon selection:text-white overflow-x-hidden relative">

            <Header activePillar={activePillar} setActivePillar={setActivePillar} />

            <main className="relative pt-20">

                {/* HERO SECTION */}
                <div
                    className="relative py-24 md:py-32 px-6 transition-colors duration-500 border-b-4 border-carbon"
                    style={heroStyle}
                >
                    <div className="max-w-[2000px] mx-auto relative z-10">


                        <h2 className="text-6xl md:text-9xl font-black tracking-[-0.04em] leading-[0.85] uppercase max-w-5xl">
                            <span className="font-headline">Modern Content,</span><br />
                            <span className={`font-serif italic ${activePillar === 'IMAGES' ? 'text-carbon/40' : 'text-lead-white/60'}`}>
                                Powered By Design.
                            </span>
                        </h2>


                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="max-w-[2000px] mx-auto px-6 py-12 relative z-10">
                    {/* Filter Sub-nav for Mobile */}
                    <div className="lg:hidden flex overflow-x-auto gap-2 mb-8 pb-4 border-b border-carbon/10">
                        {['ALL', 'IMAGES', 'VIDEOS'].map(p => (
                            <button
                                key={p}
                                onClick={() => setActivePillar(p)}
                                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-carbon whitespace-nowrap ${activePillar === p ? 'bg-carbon text-white' : 'bg-lead-white text-carbon'}`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-8 gap-4 space-y-4">
                        {displayedAssets.map((asset) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                onClick={setSelectedAsset}
                                themeColor={THEMES[asset.pillar].color}
                                isDark={activePillar === 'ALL'}
                            />
                        ))}
                    </div>

                    {displayedAssets.length === 0 && (
                        <div className="h-64 flex flex-col items-center justify-center border-4 border-carbon border-dashed bg-lead-white">
                            <span className="text-carbon font-headline text-xl uppercase tracking-widest">NO ASSETS FOUND</span>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <DetailView
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
            />
        </div>
    );
}
