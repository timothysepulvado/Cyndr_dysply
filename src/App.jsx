import React, { useState, useEffect, useMemo } from 'react';
import { Play, X, Aperture, Clock, Download, Share2, Activity, Maximize2, Grid, Hexagon, Zap, Layers, Box, Trash2, Save, Edit3 } from 'lucide-react';

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

const AssetCard = ({ asset, onClick, onRemove, isEditMode, themeColor, isDark }) => {
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

                    {asset.type === 'video' ? (
                        <video
                            src={asset.url}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    ) : (
                        <img
                            src={asset.url}
                            alt={asset.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            loading="lazy"
                        />
                    )}

                    {/* Type Icon */}
                    <div className="absolute top-3 right-3 z-20">
                        <div className={`p-1 ${isDark ? 'bg-lead-white text-carbon' : 'bg-carbon text-white'}`}>
                            {asset.type === 'video' ? <Play className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                        </div>
                    </div>

                    {/* Edit Mode: Remove Button */}
                    {isEditMode && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(asset.id);
                            }}
                            className="absolute top-3 left-3 z-30 p-2 bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg border-2 border-white"
                            title="Remove Asset"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
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

                    {asset.type === 'video' ? (
                        <video
                            src={asset.url}
                            className="max-w-[90%] max-h-[90%] object-contain shadow-2xl border-2 border-carbon"
                            controls
                            autoPlay
                            loop
                            muted
                        />
                    ) : (
                        <img
                            src={asset.url}
                            className="max-w-[90%] max-h-[90%] object-contain shadow-2xl border-2 border-carbon"
                            alt="Detail"
                        />
                    )}

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
                                <label className="block text-[10px] font-headline text-carbon/50 uppercase tracking-widest mb-1">Brand Grade</label>
                                <p className="text-xl font-black">{asset.score}%</p>
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
            {/*
                <div className="flex flex-col justify-between items-start md:items-end">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-4">
                    <span className="font-serif italic text-2xl">C</span>
                </div>
                <span className="text-[10px] font-headline text-carbon/50">© 2025 CYLNDR STUDIOS</span>
            </div>
            */}
        </div>
    </footer>
);

// --- Data Generation ---

const CLIENTS = ['Samsung', 'Spotify', 'Amex', 'Microsoft', 'Google', 'Nike', 'Apple', 'Tesla', 'Adidas', 'Sony'];
const PILLARS = ['CONTENT', 'DESIGN', 'PRODUCTION', 'INFLUENCER'];

// Generate Random Assets (The "Filler" Content)
const generateRandomAssets = (count = 100) => {
    return Array.from({ length: count }).map((_, i) => {
        const type = Math.random() > 0.4 ? 'image' : 'video'; // 60% images, 40% videos
        const pillar = PILLARS[Math.floor(Math.random() * PILLARS.length)];
        return {
            id: `random-${i}`,
            type,
            url: type === 'image'
                ? `https://picsum.photos/seed/${i + 100}/800/${Math.random() > 0.5 ? '1000' : '600'}`
                : 'https://videos.pexels.com/video-files/8538668/8538668-hd_1080_1920_25fps.mp4', // Placeholder video
            title: `${pillar} ${type === 'image' ? 'Campaign' : 'Reel'} ${2024 + i}`,
            client: CLIENTS[Math.floor(Math.random() * CLIENTS.length)],
            pillar,
            score: Math.floor(Math.random() * 20) + 80, // 80-99%
            isCustom: false
        };
    });
};

// Custom Assets (Placeholders for AWS S3 URLs)
const S3_BASE_URL = 'https://brandstudiosai-cylndr.s3.us-east-2.amazonaws.com';

// Helper function to extract location from filename
// Consolidates ALL assets into 5 categories: Urban Streets, Cafés, Creative Studios, Rooftops, Parks
// Plus "Merch" category temporarily to identify MM_ series during curation
const extractLocation = (filename) => {
    // Specific MM_ assignments (user-defined)
    // Parks (3)
    if (/MM11_/i.test(filename)) return 'Parks';
    if (/MM19_/i.test(filename)) return 'Parks';
    if (/MM40_/i.test(filename)) return 'Parks';

    // Urban Streets (need +3): subway, bike, alley vibes
    if (/MM13_/i.test(filename)) return 'Urban Streets';  // Subway
    if (/MM21_/i.test(filename)) return 'Urban Streets';  // Bike
    if (/MM01_/i.test(filename)) return 'Urban Streets';  // Floor/street

    // Rooftops (need +5): night/moody vibes
    if (/MM41_/i.test(filename)) return 'Rooftops';  // Night edit
    if (/MM44_/i.test(filename)) return 'Rooftops';  // Night drive
    if (/MM18_/i.test(filename)) return 'Rooftops';  // Musician
    if (/MM08_/i.test(filename)) return 'Rooftops';  // Creator
    if (/MM04_/i.test(filename)) return 'Rooftops';  // Edit suite
    if (/MM03_/i.test(filename)) return 'Rooftops';  // Hoodie on cinema chair
    if (/MM43_/i.test(filename)) return 'Rooftops';  // Matchbooks bar
    if (/S86_Socks/i.test(filename)) return 'Rooftops';  // Socks with skirt
    if (/MM45_/i.test(filename)) return 'Rooftops';  // Combustion tee rooftop

    // Creative Studios (rest go here)
    if (/MM27_/i.test(filename)) return 'Creative Studios';
    if (/MM42_/i.test(filename)) return 'Creative Studios';
    if (/MM02_/i.test(filename)) return 'Creative Studios';
    if (/MM03_/i.test(filename)) return 'Creative Studios';
    if (/MM07_/i.test(filename)) return 'Creative Studios';
    if (/MM12_/i.test(filename)) return 'Creative Studios';
    if (/MM17_/i.test(filename)) return 'Creative Studios';
    if (/MM22_/i.test(filename)) return 'Creative Studios';
    if (/MM24_/i.test(filename)) return 'Creative Studios';
    if (/MM43_/i.test(filename)) return 'Creative Studios';

    // Remaining MM_ series -> Route to Rooftops as fallback
    if (/MM\d+_/i.test(filename)) {
        return 'Rooftops';
    }

    // Priority patterns - check these first (most specific)
    const locationPatterns = [
        // Direct location matches
        { pattern: /UrbanStreets/i, location: 'Urban Streets' },
        { pattern: /UrbanNight/i, location: 'Urban Streets' },
        { pattern: /Cafes?/i, location: 'Cafés' },
        { pattern: /CafeScene/i, location: 'Cafés' },
        { pattern: /CafeWindow/i, location: 'Cafés' },
        { pattern: /Bar/i, location: 'Cafés' },
        { pattern: /Matchbook/i, location: 'Cafés' },
        { pattern: /Studios?/i, location: 'Creative Studios' },
        { pattern: /StudioNatural/i, location: 'Creative Studios' },
        { pattern: /StudioMood/i, location: 'Creative Studios' },
        { pattern: /Workshop/i, location: 'Creative Studios' },
        { pattern: /Keyboard/i, location: 'Creative Studios' },
        { pattern: /Desk/i, location: 'Creative Studios' },
        { pattern: /Flatlay/i, location: 'Creative Studios' },
        { pattern: /Laydown/i, location: 'Creative Studios' },
        { pattern: /Rooftops?/i, location: 'Rooftops' },
        { pattern: /Rooftop/i, location: 'Rooftops' },
        { pattern: /Skyline/i, location: 'Rooftops' },
        { pattern: /Silhouette/i, location: 'Rooftops' },
        { pattern: /Sunset/i, location: 'Rooftops' },
        { pattern: /CityView/i, location: 'Rooftops' },
        { pattern: /V_HERO/i, location: 'Rooftops' },
        { pattern: /V_LIFESTYLE/i, location: 'Rooftops' },
        { pattern: /Parks?/i, location: 'Parks' },
        { pattern: /ParkBench/i, location: 'Parks' },
        { pattern: /Nature/i, location: 'Parks' },
        { pattern: /Grass/i, location: 'Parks' },
        { pattern: /Natural/i, location: 'Parks' },
    ];

    for (const { pattern, location } of locationPatterns) {
        if (pattern.test(filename)) {
            return location;
        }
    }

    // Product shots without clear location -> Creative Studios
    // (Bandana, Collection, Socks, Totes, Hoodie, Hat, etc.)
    if (/Bandana|Collection|Socks|Tote|Hoodie|Hat|Towel|Sticker|Nalgene|Leather|Canvas|Portrait|Close|Texture|Spread|Worn|Matching|Comparison|Contents|BackDetail/i.test(filename)) {
        return 'Creative Studios';
    }

    // Default fallback
    return 'Creative Studios';
};

// Location categories (5 main categories)
const LOCATION_CATEGORIES = ['All', 'Urban Streets', 'Cafés', 'Creative Studios', 'Rooftops', 'Parks'];

const getCustomAssets = () => {
    const imageFilenames = [
        'MM01_Product_LeatherTote_Floor_4k.png',
        'MM02_Product_LeatherCap_Cafe_4k.png',
        'MM03_Product_Hoodie_CinemaChair_4k.png',
        'MM04_Product_Tee_EditSuite_4k.png',
        'MM07_Life_Cap_Editor_4k.png',
        'MM08_Life_Hoodie_Creator_4k.png',
        'MM11_Product_LeatherCap_Doorknob_4k.png',
        'MM12_Product_BlackTee_Chair_4k.png',
        'MM13_Product_LeatherTote_Subway_4k.png',
        'MM17_Life_Tote_Designer_4k.png',
        'MM18_Life_Hoodie_Musician_4k.png',
        'MM19_Life_Socks_Skater_4k.png',
        'MM21_Product_BlackTee_Bike_4k.png',
        'MM22_Product_LeatherTote_ParkBench_4k.png',
        'MM24_Product_LeatherCap_Amp_4k.png',
        'MM27_Life_Tee_Painter_4k.png',
        'MM40_Life_TruckerHat_Landscaper_4k.png',
        'MM41_Life_Hoodie_NightEdit_4k.png',
        'MM42_Life_PrescriptionTee_Alley_4k.png',
        'MM43_Product_Matchbooks_Bar_4k.png',
        'MM44_Product_Hat_NightDrive_4k.png',
        'S03_UrbanStreets_HoodieBackPrint_4x5.png',
        'S04_UrbanStreets_ToteStreetScene_16x9.png',
        'S05_UrbanStreets_MFGTee_16x9.png',
        'S06_UrbanStreets_ContentMachineTee_16x9.png',
        'S08_UrbanStreets_ChinatownTee_9x16.png',
        'S10_UrbanStreets_GreenCardigan_9x16.png',
        'S11_Cafes_GreenHoodie_4x5.png',
        'S12_Cafes_NalgeneTable_4x5.png',
        'S14_Cafes_ToteLaptop_16x9.png',
        'S15_Cafes_BlackDevineTee_16x9.png',
        'S16_Cafes_CoolShitTee_9x16.png',
        'S17_Cafes_GreenHat_9x16.png',
        'S20_Studios_AllCylndrsTee_4x5.png',
        'S23_Studios_ToteFlatlay_16x9.png',
        'S24_Studios_MFGTee_16x9.png',
        'S25_Studios_GreenHatFlatlay_16x9.png',
        'S27_Studios_GreenCardigan_9x16.png',
        'S28_Studios_PrescriptionTee_Laydown_9x16.png',
        'S29_Studios_OrangeSocks_9x16.png',
        'S30_Studios_EngineBlockTee_Laydown_9x16.png',
        'S31_Rooftops_HoodieSilhouette_4x5.png',
        'S32_Rooftops_GreenHat_4x5.png',
        'S34_Rooftops_ToteOnLedge_16x9.png',
        'S35_Rooftops_BlackDevineTee_16x9.png',
        'S36_Rooftops_ContentMachineTee_16x9.png',
        'S37_Rooftops_MeltingPotTee_9x16.png',
        'S39_Rooftops_NalgeneCityView_9x16.png',
        'MM45_Life_CombustionTee_Rooftop_4k.png',
        'S40_Parks_CanvasTote_4x5.png',
        'S41_Parks_GreenCardigan_4x5.png',
        'S42_Parks_GymTowel_16x9.png',
        'S43_Parks_MindElixirTee_16x9.png',
        'S44_Parks_GreenHat_9x16.png',
        'S45_Parks_CoolShitTee_9x16.png',
        'S46_UrbanStreets_LeatherTote_4x5.png',
        'S47_UrbanStreets_LeatherToteTexture_16x9.png',
        'S48_UrbanStreets_LeatherCap_9x16.png',
        'S50_Cafes_LeatherToteTable_4x5.png',
        'S52_Studios_FullLeatherSet_4x5.png',
        'S53_Studios_LeatherToteChair_16x9.png',
        'S57_Rooftops_LeatherPiecesDramatic_16x9.png',
        'S58_Rooftops_LeatherCapSkyline_9x16.png',
        'S59_Parks_LeatherToteNatural_4x5.png',
        'S61_Matchbook_MacroStrike_16x9.png',
        'S62_Matchbook_BarSetting_4x5.png',
        'S63_Matchbook_SmokeArt_9x16.png',
        'S64_Matchbook_CollectionSpread_16x9.png',
        'S66_BlackHoodie_FrontClose_4x5.png',
        'S66_FIX_BlackHoodie_WindowLight_4x5.png',
        'S67_BlackHoodie_BackDetail_16x9.png',
        'S68_BlackHoodie_UrbanNight_9x16.png',
        'S68_FIX_BlackHoodie_GoldenHour_9x16.png',
        'S69_FIX_BlackHoodie_StudioNatural_4x5.png',
        'S74_Bandana_Collection_16x9.png',
        'S77_TruckerHat_CloseUp_4x5.png',
        'S83_LeatherCap_WornClose_16x9.png',
        'S84_LeatherSet_Matching_4x5.png',
        'S86_Socks_WithSkirt_4x5.png',
        'S88_Socks_OrangeActionShot_16x9.png',
        'S89_CanvasTote_WornSoft_4x5.png',
        'S90_LeatherTote_CafeScene_16x9.png',
        'S91_MonochromeSocks_Platform_4x5.png',
        'S92_LeatherCap_BeingWorn_9x16.png',
        'S94_Socks_AllColors_Worn_4x5.png',
        'S95_LeatherTote_Contents_16x9.png',
        'S96_BlackHoodie_CafeWindow_16x9.png'
    ];

    const videoUrls = [
        `${S3_BASE_URL}/NEW_V02_UrbanStreets_BlackMFGTee_16x9_part1.mp4`,
        `${S3_BASE_URL}/NEW_V03_UrbanStreets_GreenHat_16x9.mp4`,
        `${S3_BASE_URL}/NEW_V04_UrbanStreets_CanvasTote_16x9_part2.mp4`,
        `${S3_BASE_URL}/NEW_V05_UrbanStreets_CreamContentTee_9x16.mp4`,
        `${S3_BASE_URL}/NEW_V08_UrbanStreets_ChinatownTee_9x16_part1.mp4`,
        `${S3_BASE_URL}/NEW_V08_UrbanStreets_ChinatownTee_9x16_part2.mp4`,
        `${S3_BASE_URL}/NEW_V09_Cafes_GreenCardigan_16x9.mp4`,
        `${S3_BASE_URL}/NEW_V10_Cafes_ToteNalgene_16x9_part1.mp4`,
        `${S3_BASE_URL}/NEW_V15_Studios_AllCylndrsTee_16x9.mp4`,
        `${S3_BASE_URL}/NEW_V17_Studios_ToteOnChair_9x16.mp4`,
        `${S3_BASE_URL}/V01_FIX_UrbanStreets_GreenHoodie_16x9.mp4`,
        `${S3_BASE_URL}/V01_UrbanStreets_GreenHoodie_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V02_UrbanStreets_BlackMFGTee_16x9_part1.mp4`,
        `${S3_BASE_URL}/V04_UrbanStreets_CanvasTote_16x9_part1.mp4`,
        `${S3_BASE_URL}/V04_UrbanStreets_CanvasTote_16x9_part2.mp4`,
        `${S3_BASE_URL}/V04_UrbanStreets_CanvasTote_CINE_16x9_part1.mp4`,
        `${S3_BASE_URL}/V04_UrbanStreets_CanvasTote_CINE_16x9_part2.mp4`,
        `${S3_BASE_URL}/V06_UrbanStreets_BlackDevineTee_9x16_part1.mp4`,
        `${S3_BASE_URL}/V06_UrbanStreets_BlackDevineTee_9x16_part2.mp4`,
        `${S3_BASE_URL}/V08_UrbanStreets_ChinatownTee_9x16_part1.mp4`,
        `${S3_BASE_URL}/V08_UrbanStreets_ChinatownTee_9x16_part2.mp4`,
        `${S3_BASE_URL}/V08_UrbanStreets_ChinatownTee_CINE_16x9_part2.mp4`,
        `${S3_BASE_URL}/V09_Cafes_GreenCardigan_16x9.mp4`,
        `${S3_BASE_URL}/V09_Cafes_GreenCardigan_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V09_FIX_Cafes_GreenCardigan_16x9.mp4`,
        `${S3_BASE_URL}/V10_Cafes_ToteNalgene_16x9_part1.mp4`,
        `${S3_BASE_URL}/V10_Cafes_ToteNalgene_CINE_16x9_part1.mp4`,
        `${S3_BASE_URL}/V10_Cafes_ToteNalgene_CINE_16x9_part2.mp4`,
        `${S3_BASE_URL}/V11_Cafes_MeltingPotTee_16x9_part1.mp4`,
        `${S3_BASE_URL}/V11_Cafes_MeltingPotTee_16x9_part2.mp4`,
        `${S3_BASE_URL}/V12_Cafes_MindElixirTee_9x16.mp4`,
        `${S3_BASE_URL}/V15_FIX_Studios_AllCylndrsTee_16x9.mp4`,
        `${S3_BASE_URL}/V15_Studios_AllCylndrsTee_16x9.mp4`,
        `${S3_BASE_URL}/V15_Studios_AllCylndrsTee_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V16_Studios_GreenHat_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V19_Studios_NalgeneDesk_FIX_16x9.mp4`,
        `${S3_BASE_URL}/V21_FIX_Rooftops_GreenHoodie_16x9.mp4`,
        `${S3_BASE_URL}/V21_Rooftops_GreenHoodie_16x9.mp4`,
        `${S3_BASE_URL}/V22_Rooftops_EngineBlockTee_16x9_part1.mp4`,
        `${S3_BASE_URL}/V22_Rooftops_EngineBlockTee_16x9_part2.mp4`,
        `${S3_BASE_URL}/V23_Rooftops_GreenHat_16x9.mp4`,
        `${S3_BASE_URL}/V23_Rooftops_GreenHat_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V24_Rooftops_OrangeSocks_9x16.mp4`,
        `${S3_BASE_URL}/V25_Rooftops_CoolShitTee_9x16_part1.mp4`,
        `${S3_BASE_URL}/V25_Rooftops_CoolShitTee_9x16_part2.mp4`,
        `${S3_BASE_URL}/V25_Rooftops_CoolShitTee_CINE_9x16_part1.mp4`,
        `${S3_BASE_URL}/V27_Parks_CanvasTote_16x9.mp4`,
        `${S3_BASE_URL}/V29_Parks_PrescriptionTee_9x16.mp4`,
        `${S3_BASE_URL}/V30_Parks_HatTote_9x16_part1.mp4`,
        `${S3_BASE_URL}/V30_Parks_HatTote_9x16_part2.mp4`,
        `${S3_BASE_URL}/V31_UrbanStreets_LeatherTote_16x9.mp4`,
        `${S3_BASE_URL}/V31_UrbanStreets_LeatherTote_CINE_16x9.mp4`,
        `${S3_BASE_URL}/V32_UrbanStreets_LeatherCap_9x16_part1.mp4`,
        `${S3_BASE_URL}/V32_UrbanStreets_LeatherCap_9x16_part2.mp4`,
        `${S3_BASE_URL}/V32_UrbanStreets_LeatherCap_CINE_9x16_part1.mp4`,
        `${S3_BASE_URL}/V34_Studios_FullLeatherSet_16x9_part2.mp4`,
        `${S3_BASE_URL}/V34_Studios_FullLeatherSet_CINE_16x9_part1.mp4`,
        `${S3_BASE_URL}/V35_Studios_LeatherCapDetail_9x16.mp4`,
        `${S3_BASE_URL}/V35_Studios_LeatherCapDetail_CINE_9x16.mp4`,
        `${S3_BASE_URL}/V36_Studios_LeatherToteDesk_CINE_16x9_part1.mp4`,
        `${S3_BASE_URL}/V36_Studios_LeatherToteDesk_CINE_16x9_part2.mp4`,
        `${S3_BASE_URL}/V38_Rooftops_LeatherCapHero_9x16.mp4`,
        `${S3_BASE_URL}/V39_Parks_LeatherToteLifestyle_16x9_part1.mp4`,
        `${S3_BASE_URL}/V39_Parks_LeatherToteLifestyle_16x9_part2.mp4`,
        `${S3_BASE_URL}/V40_Rooftops_NalgeneSunset_FIX_16x9.mp4`,
        `${S3_BASE_URL}/V_HERO_HoodieDramatic_16x9.mp4`,
        `${S3_BASE_URL}/V_HERO_SocksDramatic_v2_9x16.mp4`,
        `${S3_BASE_URL}/V_HOODIE_BackDetail_16x9.mp4`,
        `${S3_BASE_URL}/V_LIFESTYLE_Rooftop_Closeup_16x9.mp4`,
        `${S3_BASE_URL}/V_LIFESTYLE_Rooftop_v2_16x9.mp4`,
    ];

    const customImages = imageFilenames.map((filename, i) => ({
        id: `custom-image-${i}`,
        type: 'image',
        url: `${S3_BASE_URL}/${filename}`,
        title: 'Merch // Cylndr x Brandstudios.Ai',
        client: 'Merch // Cylndr x Brandstudios.Ai',
        pillar: PILLARS[Math.floor(Math.random() * PILLARS.length)],
        score: Math.floor(Math.random() * 10) + 90,
        isCustom: true,
        location: extractLocation(filename),
        tags: ['Merch', 'Digital', 'Social', 'Campaign'].sort(() => 0.5 - Math.random()).slice(0, 2)
    }));

    const customVideos = videoUrls.map((url, i) => {
        const filename = url.substring(url.lastIndexOf('/') + 1);
        return {
            id: `custom-video-${i}`,
            type: 'video',
            url: url,
            title: 'Merch // Cylndr x Brandstudios.Ai',
            client: 'Merch // Cylndr x Brandstudios.Ai',
            pillar: PILLARS[Math.floor(Math.random() * PILLARS.length)],
            score: Math.floor(Math.random() * 10) + 90,
            isCustom: true,
            location: extractLocation(filename),
            tags: ['Motion', 'Digital', 'Social', 'Campaign'].sort(() => 0.5 - Math.random()).slice(0, 2)
        };
    });

    return [...customImages, ...customVideos];
};


export default function App() {
    const [activePillar, setActivePillar] = useState('ALL');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('All'); // Location filter state

    // Curation State - Load from localStorage on mount (deletions persist across reloads)
    const [removedIds, setRemovedIds] = useState(() => {
        const saved = localStorage.getItem('cylndr-removed-assets');
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [isEditMode, setIsEditMode] = useState(true);
    const [exportCode, setExportCode] = useState(null); // For showing export modal

    // Save removed IDs to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cylndr-removed-assets', JSON.stringify([...removedIds]));
    }, [removedIds]);

    // Memoize assets
    const randomAssets = useMemo(() => generateRandomAssets(60), []); // Reduced count since we'll add custom ones
    const customAssets = useMemo(() => getCustomAssets(), []);

    // Combined assets for ALL view (Shuffled)
    const allAssets = useMemo(() => {
        const combined = [...randomAssets, ...customAssets];
        // Fisher-Yates Shuffle
        for (let i = combined.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        return combined;
    }, [randomAssets, customAssets]);

    // Reset location filter when switching pillars
    useEffect(() => {
        setSelectedLocation('All');
    }, [activePillar]);

    // Filtering Logic
    const displayedAssets = useMemo(() => {
        let filtered = allAssets;

        if (activePillar === 'IMAGES') {
            filtered = customAssets.filter(a => a.type === 'image');
        } else if (activePillar === 'VIDEOS') {
            filtered = customAssets.filter(a => a.type === 'video');
        }

        // Apply location filter (only for IMAGES and VIDEOS views)
        if ((activePillar === 'IMAGES' || activePillar === 'VIDEOS') && selectedLocation !== 'All') {
            filtered = filtered.filter(asset => asset.location === selectedLocation);
        }

        // Filter out removed assets
        return filtered.filter(asset => !removedIds.has(asset.id));
    }, [activePillar, allAssets, customAssets, removedIds, selectedLocation]);

    // Get available locations for current view
    const availableLocations = useMemo(() => {
        if (activePillar !== 'IMAGES' && activePillar !== 'VIDEOS') return [];

        const typeAssets = customAssets.filter(a =>
            a.type === (activePillar === 'IMAGES' ? 'image' : 'video') &&
            !removedIds.has(a.id)
        );
        const locations = [...new Set(typeAssets.map(a => a.location))].sort();
        return ['All', ...locations];
    }, [activePillar, customAssets, removedIds]);

    const handleRemove = (id) => {
        setRemovedIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    };

    const handleExport = () => {
        const keptAssets = customAssets.filter(a => !removedIds.has(a.id));
        const keptImages = keptAssets.filter(a => a.type === 'image');
        const keptVideos = keptAssets.filter(a => a.type === 'video').map(a => a.url);

        // Extract filenames from image URLs
        const keptImageFilenames = keptImages.map(img => {
            const url = img.url;
            return url.substring(url.lastIndexOf('/') + 1);
        });

        // Generate ready-to-paste code
        const imageArrayCode = `const imageFilenames = [\n${keptImageFilenames.map(name => `    '${name}'`).join(',\n')}\n];`;
        const videoArrayCode = `const videoUrls = [\n${keptVideos.map(url => `    '${url}'`).join(',\n')}\n];`;

        const fullExportCode = `// ===== PASTE THIS INTO App.jsx =====\n\n// Replace imageFilenames array (around line 364):\n${imageArrayCode}\n\n// Replace videoUrls array (around line 368):\n${videoArrayCode}\n\n// === STATS ===\n// Images - Kept: ${keptImageFilenames.length}, Removed: ${customAssets.filter(a => a.type === 'image').length - keptImageFilenames.length}\n// Videos - Kept: ${keptVideos.length}, Removed: ${customAssets.filter(a => a.type === 'video').length - keptVideos.length}`;

        // Show in modal
        setExportCode(fullExportCode);
    };

    const handleReset = () => {
        if (confirm('Reset all deletions? This will bring back all removed assets.')) {
            setRemovedIds(new Set());
            localStorage.removeItem('cylndr-removed-assets');
        }
    };

    // Derive current theme colors based on selection
    const currentTheme = THEMES[activePillar];

    // Dynamic background style for the hero section
    const heroStyle = {
        backgroundColor: THEMES[activePillar].bg.replace('bg-', '') === 'carbon' ? '#0e0d1d' :
            THEMES[activePillar].bg.replace('bg-', '') === 'lead-white' ? '#fff6ec' :
                THEMES[activePillar].bg.replace('bg-', '') === 'oxidized-green' ? '#025f1d' : '#fff6ec',
        color: THEMES[activePillar].text.replace('text-', '') === 'lead-white' ? '#fff6ec' : '#0e0d1d',
    };

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

                    {/* Location Category Tabs - Only show on IMAGES and VIDEOS pages */}
                    {(activePillar === 'IMAGES' || activePillar === 'VIDEOS') && availableLocations.length > 1 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-[10px] font-headline uppercase tracking-widest text-carbon/50">Filter by Location:</span>
                                <span className="text-[10px] font-headline text-carbon/30">
                                    {displayedAssets.length} {activePillar === 'IMAGES' ? 'images' : 'videos'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {availableLocations.map(location => {
                                    const isActive = selectedLocation === location;
                                    const count = location === 'All'
                                        ? customAssets.filter(a => a.type === (activePillar === 'IMAGES' ? 'image' : 'video') && !removedIds.has(a.id)).length
                                        : customAssets.filter(a => a.type === (activePillar === 'IMAGES' ? 'image' : 'video') && a.location === location && !removedIds.has(a.id)).length;

                                    return (
                                        <button
                                            key={location}
                                            onClick={() => setSelectedLocation(location)}
                                            className={`
                                                px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 
                                                transition-all duration-200 hover:-translate-y-0.5
                                                ${isActive
                                                    ? 'bg-carbon text-white border-carbon shadow-[3px_3px_0_0_#025f1d]'
                                                    : 'bg-lead-white text-carbon border-carbon hover:bg-carbon/5'
                                                }
                                            `}
                                        >
                                            {location} <span className={`ml-1 ${isActive ? 'text-white/60' : 'text-carbon/40'}`}>({count})</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="columns-2 md:columns-4 lg:columns-5 xl:columns-6 2xl:columns-8 gap-4 space-y-4">
                        {displayedAssets.map((asset) => (
                            <AssetCard
                                key={asset.id}
                                asset={asset}
                                onClick={setSelectedAsset}
                                onRemove={handleRemove}
                                isEditMode={isEditMode}
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

            {/* EXPORT CODE MODAL */}
            {exportCode && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-carbon/95 p-4">
                    <div className="relative w-full max-w-4xl max-h-[80vh] bg-lead-white border-4 border-carbon flex flex-col shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
                        {/* Header */}
                        <div className="p-6 border-b-4 border-carbon bg-oxidized-green">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Export Code</h2>
                            <p className="text-sm text-white/80 mt-2">Copy this code and paste it into App.jsx to make your deletions permanent</p>
                        </div>

                        {/* Code Textarea */}
                        <div className="flex-grow p-6 overflow-hidden flex flex-col">
                            <textarea
                                readOnly
                                value={exportCode}
                                onClick={(e) => e.target.select()}
                                className="w-full h-full font-mono text-xs bg-carbon text-white p-4 border-2 border-carbon resize-none focus:outline-none focus:ring-2 focus:ring-oxidized-green"
                            />
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-6 border-t-4 border-carbon bg-lead-white flex gap-4">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(exportCode);
                                    alert('✅ Code copied to clipboard!');
                                }}
                                className="flex-1 h-12 bg-oxidized-green text-white font-bold uppercase tracking-widest hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setExportCode(null)}
                                className="h-12 px-6 bg-carbon text-white font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CURATION CONTROLS */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`flex items-center gap-2 px-4 py-3 font-bold uppercase tracking-widest shadow-xl transition-all ${isEditMode ? 'bg-carbon text-white border-2 border-white' : 'bg-white text-carbon border-2 border-carbon'}`}
                >
                    <Edit3 className="w-4 h-4" /> {isEditMode ? 'Done Editing' : 'Edit Mode'}
                </button>

                {isEditMode && (
                    <>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-3 bg-oxidized-green text-white font-bold uppercase tracking-widest shadow-xl border-2 border-white hover:bg-green-700 transition-colors"
                        >
                            <Save className="w-4 h-4" /> Export Code
                        </button>

                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-3 bg-heat text-white font-bold uppercase tracking-widest shadow-xl border-2 border-white hover:bg-red-700 transition-colors"
                        >
                            <X className="w-4 h-4" /> Reset All
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
