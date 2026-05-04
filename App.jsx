import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Search, X, Monitor, HardDrive, Send, Gamepad2, ArrowUpDown, MapPin, Phone, Cpu, ShieldCheck, ChevronDown, Lock, Unlock, Plus, Trash2, Loader2, Settings, Edit3, Heart, Star, Sparkles } from 'lucide-react';

// ==========================================
// PENGATURAN TOKO & ADMIN
// ==========================================
const STORE_NAME = "Mesra Games";
const STORE_ADDRESS = "Bumi Tamalanrea Permai (BTP) Makassar";
const WHATSAPP_NUMBER = "6285211852235"; 
const ADMIN_PIN = "mesrajie"; // PIN Admin telah diubah

// ==========================================
// DATABASE GAME DEFAULT
// ==========================================
const RAW_GAMES_LIST = [
  "AEW Fight Forever Elite|15000|25|Sports|mid",
  "Alan Wake 2|50000|90|Horror|ultra",
  "As Dusk Falls|20000|70|Adventure|high",
  "A plague Tale : Innocence|20000|40|Adventure|high",
  "A Way Out|15000|25|Action|mid",
  "Age Of Empire 3 All DLC|15000|15|Strategy|low",
  "Age of Empires 3 Definitive Edition|20000|40|Strategy|mid",
  "Assassin's Creed Mirage|35000|40|RPG|high",
  "Assassin's Origin's + Include 4 DLC|25000|60|RPG|mid",
  "Assassin's Creed Valhalla Gold Edition|40000|130|RPG|high",
  "Assassin's Creed Oddyssey|30000|100|RPG|high",
  "Assassin's Unity|15000|50|Adventure|mid",
  "Assassin's Creed|5000|8|Adventure|low",
  "Assassin's Syndicate|15000|50|Adventure|mid",
  "Assassin's Brotherhood|10000|8|Adventure|low",
  "Assassin's Revalation|10000|12|Adventure|low",
  "Assassin's BlackFlag|10000|30|Adventure|mid",
  "Assassin's Creed III|10000|17|Adventure|low",
  "Attack on Titan: Wings of Freedom|15000|25|Action|mid",
  "Attack on Titan 2|15000|30|Action|mid",
  "Arma 3 Laws of wars incl.dlc|20000|45|Simulation|mid",
  "AccelWorld Vs Sword art online|10000|15|RPG|low",
  "Atomic Heart|25000|90|FPS|high",
  "Blur|10000|14|Racing|low",
  "Black Clover|10000|15|Action|low",
  "Burnout paradise|10000|5|Racing|low",
  "Bully Scholarship Edition|10000|5|Open World|low",
  "Battle Realms|5000|2|Strategy|low",
  "Batman Asylum|10000|8|Adventure|low",
  "Batman Arkham Knight|15000|50|Open World|mid",
  "Borderland 2|10000|15|FPS|low",
  "Borderland 3|30000|75|FPS|high",
  "Borderland The Pre Squel|10000|15|FPS|low",
  "Battlefield 1|20000|50|FPS|mid",
  "Battlefield 3|15000|20|FPS|low",
  "Battlefield 4|15000|30|FPS|mid",
  "Battlefield 5|30000|50|FPS|high",
  "Battlefield Bad Company 2|10000|10|FPS|low",
  "Battlefield Hardline|15000|40|FPS|mid",
  "Captain Tsubasa : Rise Of New Champions Deluxe Edition|15000|25|Sports|mid",
  "Control|25000|40|Action|high",
  "Cyberpunk 2077|40000|70|RPG|ultra",
  "Cities Skylines include Full DLC|15000|15|Simulation|mid",
  "Cities Skylines 2 Ultimate Edition|40000|60|Simulation|ultra",
  "Call Of Duty : Ghost|15000|40|FPS|mid",
  "Call Of Duty : Modern Warfare|10000|8|FPS|low",
  "Call of Duty : Modern Warfare 2|15000|12|FPS|low",
  "Call Of Duty : Modern Warfare 3|15000|16|FPS|low",
  "Call Of Duty : Black Ops 2|15000|16|FPS|low",
  "Call Of Duty : Black Ops 3|20000|100|FPS|mid",
  "Call of Duty : Infinite Warfare|20000|70|FPS|mid",
  "Call of Duty : WWII|25000|90|FPS|high",
  "Crackdown 3|25000|30|Open World|mid",
  "Castlevania Lord Of Shadow 2|5000|10|Adventure|low",
  "Counter Strike Global Offensive|5000|15|FPS|low",
  "Crysis Remastered|20000|20|FPS|high",
  "Crysis|10000|8|FPS|low",
  "Crysis 3|15000|15|FPS|mid",
  "Days Gone|40000|70|Survival|high",
  "DeadRising 4 Deluxe (include DLC)|20000|35|Survival|mid",
  "Doom Eternal (2020)|30000|80|FPS|high",
  "Doom 2016|20000|50|FPS|mid",
  "Dark Souls III|15000|25|RPG|mid",
  "Darksiders 2 deathinitive edition|10000|15|Adventure|low",
  "Darksiders 3|20000|25|Adventure|mid",
  "Dead Or alive 5 (DOA)|5000|10|Fighting|low",
  "Dead Or Alive 6 Including DLC|15000|25|Fighting|mid",
  "Dead Space 3|10000|15|Horror|low",
  "Devil May Cry 5|25000|35|Action|high",
  "DreadOut 1|10000|5|Horror|low",
  "DreadOut 2|15000|15|Horror|mid",
  "Dragonball Xenoverse|10000|10|Fighting|low",
  "Dragonball Xenoverse 2|15000|15|Fighting|mid",
  "Dragon Ball: Xenoverse 2 v1.16.00 + All DLCs|25000|25|Fighting|mid",
  "Dragonball Z - Kakaroto|30000|40|RPG|mid",
  "Dragonball Sparking Zero|30000|45|Fighting|high",
  "Dragon Dogma Dark Arisen|5000|20|RPG|low",
  "Dying Light Ultimate Edition|10000|20|Survival|mid",
  "Dragon Age inquisition Deluxe edition|15000|30|RPG|mid",
  "Dragon Quest 2|20000|15|RPG|low",
  "Dynasty Warrior, Samurai warrior Orochi|5000|10|Action|low",
  "Dynasty Warrior 8 Extream Legend|10000|25|Action|low",
  "Dynasty Warrior 9|20000|50|Action|mid",
  "Dynasty Warriors 9 Empire|30000|50|Action|mid",
  "Dynasty Warriors : Origins|30000|40|Action|high",
  "Dishnored 2|20000|40|Action|mid",
  "Evil West|25000|40|FPS|high",
  "Empire Earth 3|10000|5|Strategy|low",
  "Fable III|10000|15|RPG|low",
  "Football Manager 2016|5000|5|Sports|low",
  "Football Manager 2017|10000|5|Sports|low",
  "Football Manager 2018|10000|5|Sports|low",
  "Football Manager 2019|10000|6|Sports|low",
  "Football Manager 2020|15000|7|Sports|low",
  "Fifa 15 + New Update 2016|20000|15|Sports|low",
  "Fifa 17+New Update Squad|30000|30|Sports|mid",
  "Fifa 18+New Update Squad|30000|35|Sports|mid",
  "Fifa 19|30000|40|Sports|mid",
  "Fifa 23 Base saja|40000|50|Sports|high",
  "Fifa 23 + Update|70000|100|Sports|high",
  "Final Fantasy VII Remake|40000|100|RPG|high",
  "Final Fantasy XV|30000|80|RPG|high",
  "Fallout 4|15000|35|RPG|mid",
  "Farcry 3|15000|15|FPS|low",
  "Farcry 4 + DLC|15000|30|FPS|mid",
  "FarCry Primal+HD texture|20000|20|FPS|mid",
  "FarCry 5|20000|40|FPS|mid",
  "FarCry 6|40000|60|FPS|high",
  "FarCry :New Dawn|20000|30|FPS|mid",
  "Forza Horizon 3|20000|60|Racing|mid",
  "Forza Horizon 4 ultimate All DLC|40000|90|Racing|high",
  "Forza Horizon 5 Ultimate Edition|50000|110|Racing|high",
  "Ghost Of Thusima|30000|75|Open World|high",
  "Ghost Recon Wildland+DLC|20000|60|FPS|mid",
  "GTA IV Complete Edition|20000|22|Open World|low",
  "GTA V + Update 1.36|30000|110|Open World|mid",
  "Grid Auto Sport|10000|15|Racing|low",
  "Grid 2|5000|10|Racing|low",
  "Gotham Knight Deluxe Edition|40000|45|Open World|high",
  "God Of War|40000|70|Adventure|high",
  "God Of War Ragnarok|40000|190|Adventure|ultra",
  "God Eater 2|15000|15|RPG|low",
  "God Eater 3|15000|25|RPG|mid",
  "God Eater Resurrection|10000|15|RPG|low",
  "Guitar Hero 3 Legend Of Rock|5000|5|Sports|low",
  "Ghost Recorn Future Soldier Complete Edition|15000|15|FPS|low",
  "Gears Of Wars 4|25000|80|FPS|high",
  "Gears Of Wars 5|30000|60|FPS|high",
  "Halo Infinite+DLC|40000|50|FPS|high",
  "Hellblade Senuas Sacrifice|15000|30|Adventure|mid",
  "Heavy Rain|20000|35|Adventure|mid",
  "Hot Wheels Unleashed|15000|25|Racing|mid",
  "Hitman 2017|25000|50|Action|mid",
  "Hitman absolution|10000|25|Action|low",
  "Hitman 2|30000|60|Action|mid",
  "Hitman 3 Trilogy include 1&2|40000|80|Action|high",
  "Horizon Zero Dawn complete Editon|30000|70|RPG|mid",
  "Horizon Forbidden West Complete Edition|60000|150|RPG|ultra",
  "Immortal Fenyx Rising|25000|30|Adventure|mid",
  "Just Cause 2|5000|5|Open World|low",
  "Just Cause 3|20000|40|Open World|mid",
  "Just Cause 4|30000|60|Open World|high",
  "Jump Force Include DLC|20000|20|Fighting|mid",
  "Killing Floor 2|5000|30|FPS|mid",
  "Kane & Lynch 2 Dog Days Inc All DLC|15000|10|FPS|low",
  "Kena: Bridge of Spirits|25000|25|Adventure|high",
  "Lost Planet 2|10000|15|FPS|low",
  "Life Of P Deluxe Edition|20000|50|RPG|high",
  "Little Nightmares II Deluxe Edition|10000|10|Horror|mid",
  "Lego City Undercover|10000|20|Adventure|low",
  "Lego - Marvel Super Heroes|5000|10|Adventure|low",
  "Lego - Marvel Super Heroes 2|15000|16|Adventure|low",
  "Lords Of The Fallen|10000|20|RPG|mid",
  "Marvel Spiderman Remasterd|40000|75|Open World|high",
  "Marvel Spiderman Remastered Miles Morales|40000|50|Open World|high",
  "Marvel Spiderman 2|50000|95|Open World|ultra",
  "Marvel Avengers|50000|75|Action|high",
  "MadMax|15000|35|Open World|mid",
  "Marvel’s Guardians of The Galaxy|25000|80|Action|high",
  "Medal Of Honor Warfighter|15000|15|FPS|low",
  "Mass Effect - Andromeda|20000|55|RPG|mid",
  "My hero Academia : One's Justice|10000|12|Fighting|mid",
  "Mafia Definitive|30000|50|Open World|mid",
  "Mafia II|10000|10|Open World|low",
  "Mafia III (New)|20000|50|Open World|mid",
  "Middle Earth Shadow of mordor|15000|45|RPG|mid",
  "MetalGear : Phantom Pain|15000|30|Action|mid",
  "Max Payne 3|15000|35|FPS|low",
  "Metro 2033|15000|10|FPS|low",
  "Metro Exodus|30000|60|FPS|high",
  "Mirror Edge|5000|8|Action|low",
  "Mirror Edge Catalys|20000|25|Action|mid",
  "MotoGP 15|10000|20|Racing|low",
  "MotoGP 17|15000|20|Racing|low",
  "MotoGP 18|20000|20|Racing|mid",
  "MotoGP 19|25000|20|Racing|mid",
  "MotoGP 20|25000|25|Racing|mid",
  "MotoGP 21|25000|25|Racing|mid",
  "MotoGP 22|25000|30|Racing|high",
  "MotoGP 23|30000|30|Racing|high",
  "MotoGP 24|30000|30|Racing|high",
  "MotoGP 25|30000|30|Racing|high",
  "Mortal Shell|20000|15|RPG|mid",
  "Mortal kombat X|15000|40|Fighting|mid",
  "Mortal Kombat 11 Full DLC|40000|100|Fighting|high",
  "Man Of Medan|25000|30|Horror|mid",
  "Monster Hunter World|25000|50|RPG|mid",
  "Monster Hunter Rise|20000|30|RPG|mid",
  "NieR : Automata|20000|50|RPG|mid",
  "Nioh|20000|50|RPG|mid",
  "Nioh 2 Complete Edition|40000|80|RPG|high",
  "Naruto Ultimate ninja strom 4 + DLC Boruto|20000|40|Fighting|mid",
  "Naruto x Boruto: Ultimate Ninja Storm Connections|30000|30|Fighting|high",
  "Naruto Ultimate ninja strom Revolution|10000|10|Fighting|low",
  "Nba 2k17|15000|50|Sports|low",
  "Nba 2k18|25000|60|Sports|mid",
  "Nba 2k19|30000|70|Sports|mid",
  "NBA 2K20|30000|80|Sports|mid",
  "NBA 2K21 Mamba Forever Edition|30000|90|Sports|high",
  "NBA 2k22|40000|110|Sports|high",
  "Need For Speed Heat|25000|50|Racing|high",
  "Need For Speed Payback|20000|30|Racing|mid",
  "Need For Speed Undercover|10000|10|Racing|low",
  "Need For speed Rivals|10000|15|Racing|low",
  "Need For speed Most Wanted New Version|10000|10|Racing|low",
  "Ninja Gaiden 4|30000|30|Action|mid",
  "One piece pirate warriors 3|15000|15|Action|low",
  "One piece pirate warriors 4|30000|25|Action|mid",
  "One Piece - Burning Blood|10000|10|Fighting|low",
  "Outlast 1|10000|5|Horror|low",
  "Outlash 2|20000|30|Horror|mid",
  "Quantum Break|20000|68|Action|mid",
  "Project Cars 2 + DLC|30000|50|Racing|mid",
  "Project Cars 3 Deluxe Edition|30000|50|Racing|high",
  "PES 2013 + Update Patch Terbaru|40000|10|Sports|low",
  "PES 2017 + Update patch Terbaru|40000|20|Sports|low",
  "PES 2018 + Update Patch Terbaru|40000|30|Sports|mid",
  "PES 2019 + Update Patch Terbaru|40000|30|Sports|mid",
  "Pes 2021 + Update Patch Terbaru|65000|45|Sports|mid",
  "Rage 2|20000|50|FPS|mid",
  "Ride 4|20000|40|Racing|high",
  "Rainbow Six Vegas 2|10000|10|FPS|low",
  "Rise Of nations|5000|5|Strategy|low",
  "Resident Evil Operation Raccoon City|10000|10|Horror|low",
  "Resident Evil Umbrella Corps|5000|10|Horror|low",
  "Resident Evil 0 HD Resmater|5000|15|Horror|low",
  "Resident Evil 3 Remake Inc All DLC|30000|45|Horror|high",
  "Resident Evil 4 Remake (2023)|40000|70|Horror|high",
  "Resident Evil 4 HD|10000|15|Horror|low",
  "Resident Evil 5|10000|10|Horror|low",
  "Resident Evil 6 All DLC|20000|20|Horror|low",
  "Resident Evil 7 Biohazard|20000|25|Horror|mid",
  "Resident Evil 8 Village Deluxe Edition|30000|35|Horror|high",
  "Resident Evil Revalation 2 Complete Edition|15000|25|Horror|mid",
  "Resident Evil 2 REMAKE|20000|30|Horror|mid",
  "Red Dead Redemption 1|15000|20|Open World|low",
  "Red Dead Redemption 2|50000|120|Open World|high",
  "Ryse Of rome|15000|30|Adventure|low",
  "Silent Hill 2 Remake|30000|50|Horror|ultra",
  "Stray|15000|10|Adventure|mid",
  "Star Wars : Jedi Fallen orde|25000|55|Adventure|high",
  "Sherlock Holmes - The Devil's Daughter|15000|20|Adventure|mid",
  "SpongeBob SquarePants: The Cosmic Shake|20000|15|Adventure|mid",
  "Splinter Cell Blacklist|20000|25|Action|low",
  "Sekiro: Shadows Die Twice|20000|25|RPG|mid",
  "Story Of Season Doraemon|10000|10|Simulation|low",
  "Sniper Elite 3|10000|20|FPS|low",
  "Sniper Elite 4|20000|60|FPS|mid",
  "Shadow Warrior|5000|15|FPS|low",
  "Sonic & All stars Racing|5000|10|Racing|low",
  "Sonic Force|15000|20|Adventure|low",
  "Sleeping Dogs Defensive Offensive|10000|20|Open World|low",
  "State Of Decay|10000|15|Survival|low",
  "State of Decay 2: Juggernaut Edition|20000|30|Survival|mid",
  "Stronghold Crusader Extream|5000|5|Strategy|low",
  "StrongHold Crusader II|5000|5|Strategy|low",
  "Saint Seiya: Soldiers' Soul|10000|12|Fighting|low",
  "Soul Calibur 6 Full DLC|15000|20|Fighting|mid",
  "Saints Row IV|5000|15|Open World|low",
  "Samurai Warriors: Spirit of Sanada|15000|25|Action|low",
  "Samurai Warrior 2 Extream|10000|10|Action|low",
  "Samurai Warrior 4-II|10000|12|Action|low",
  "Samurai warrior 5+DLC|20000|25|Action|mid",
  "Sword Art Online Fatal Bullet|15000|30|RPG|mid",
  "Spec Ops - The line|15000|10|FPS|low",
  "The Medium Deluxe Edition|30000|30|Horror|high",
  "The Surge 2|20000|25|RPG|mid",
  "The Elder Scrolls V: Skyrim Special Edition|20000|15|RPG|low",
  "Thief|15000|25|Action|low",
  "The Surge|15000|15|RPG|low",
  "The Evil Within|15000|40|Horror|low",
  "The Evil Within 2|20000|40|Horror|mid",
  "Tales Of Bersia|10000|15|RPG|low",
  "Teenage Mutant Ninja Turtles Mutants Manhattan|10000|10|Action|low",
  "The Sims 3 Ultimate Collection|15000|30|Simulation|low",
  "The sims 4|15000|25|Simulation|low",
  "The sim 4 Full DLC|30000|60|Simulation|mid",
  "Tekken 7|20000|60|Fighting|mid",
  "Toukiden Kiwami|10000|20|RPG|low",
  "Toukiden Kiwami 2|15000|30|RPG|mid",
  "The amazing Spiderman 2|5000|10|Action|low",
  "The witcher 3 Wild Hunt|20000|50|RPG|mid",
  "Tom Clancy's Rainbow Six Siege|5000|60|FPS|mid",
  "Tombraider|10000|15|Adventure|low",
  "Tomb Raider : Rise Of The Tombs|20000|30|Adventure|mid",
  "Tomb Raider : Shadow of Tomb|25000|40|Adventure|high",
  "Uncharted : Legacy Of Thief Collection|50000|126|Adventure|high",
  "Vapyrs|15000|15|RPG|mid",
  "Virtua Tennis 4|5000|5|Sports|low",
  "Wo Long: Fallen Dynasty|25000|60|RPG|high",
  "Watch Dogs|10000|25|Open World|low",
  "warrior Orochi 3 Remaster|20000|20|Action|low",
  "Warrior Orochi 4 ultimate|25000|25|Action|mid",
  "Watch Dogs 2+ Texture Ultra HD (New)|20000|40|Open World|mid",
  "Watch Dogs Legion|50000|45|Open World|high",
  "WWE Smackdown 2k17|20000|50|Sports|low",
  "WWE SmackDown 2K20|30000|60|Sports|mid",
  "WWE Smackdown 2K22|35000|70|Sports|high",
  "WWE SmackDown 2K24|50000|90|Sports|ultra",
  "Warhammer 40.000 Space marine|10000|10|FPS|low",
  "Wolfenstein II|20000|45|FPS|mid",
  "Yakuza 3 Remastered|20000|20|Adventure|low",
  "Yakuza 4 Remastered|25000|35|Adventure|low",
  "Xcom 2+Include 2 DLC|15000|45|Strategy|mid"
];

// Engine Spesifikasi Otomatis
const SPEC_TIERS = {
  low: { 
    min: { os: "Windows 7/10", cpu: "Core i3 / AMD Phenom II", ram: "4 GB", gpu: "GTX 650 / Radeon HD 7770" },
    rec: { os: "Windows 10", cpu: "Core i5 3rd Gen", ram: "8 GB", gpu: "GTX 750 Ti / RX 460" }
  },
  mid: { 
    min: { os: "Windows 10", cpu: "Core i5-4460 / Ryzen 3", ram: "8 GB", gpu: "GTX 960 / RX 470" },
    rec: { os: "Windows 10/11", cpu: "Core i7-4770 / Ryzen 5", ram: "16 GB", gpu: "GTX 1060 / RX 580" }
  },
  high: { 
    min: { os: "Windows 10", cpu: "Core i5-8400 / Ryzen 5", ram: "16 GB", gpu: "GTX 1070 / RX 5600 XT" },
    rec: { os: "Windows 10/11", cpu: "Core i7-8700K / Ryzen 7", ram: "16 GB", gpu: "RTX 2060 / RX 6600" }
  },
  ultra: { 
    min: { os: "Windows 10/11", cpu: "Core i5-10400 / Ryzen 3600", ram: "16 GB", gpu: "RTX 2070 / RX 6700" },
    rec: { os: "Windows 11", cpu: "Core i7-12700 / Ryzen 5800X", ram: "32 GB", gpu: "RTX 3080 / RX 6800 XT" }
  }
};

// Builder Object Game Universal (Pastel Theme Fallback)
const buildGameObj = (id, title, price, size, genre, tier, isCustom = false) => {
  const colors = ["2e1065", "4c1d95", "831843", "0f766e", "1e3a8a"]; // Soft dark pastels
  const accentColors = ["f472b6", "c084fc", "fb7185", "2dd4bf", "60a5fa"]; // Bright neon pastels
  const cleanTitle = title.trim();
  
  return {
    id,
    title: cleanTitle,
    price: parseInt(price, 10),
    size: parseInt(size, 10),
    genre: genre.trim(),
    image: `https://tse2.mm.bing.net/th?q=${encodeURIComponent(cleanTitle + ' pc game wallpaper')}&w=600&h=350&c=7&rs=1&p=0`,
    fallbackImage: `https://placehold.co/600x350/${colors[id % colors.length]}/${accentColors[id % accentColors.length]}?text=${encodeURIComponent(cleanTitle.replace(/ /g, '+').substring(0, 15))}`,
    specs: SPEC_TIERS[tier] || SPEC_TIERS.mid,
    isCustom
  };
};

export default function App() {
  const initializeCatalog = () => {
    const saved = localStorage.getItem('mesra_games_catalog_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) {}
    }
    return RAW_GAMES_LIST.map((raw, index) => {
      const [title, price, size, genre, tier] = raw.split('|');
      return buildGameObj(index + 1, title, price, size, genre, tier, false);
    });
  };

  const [gameCatalog, setGameCatalog] = useState(initializeCatalog);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  // States Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminSearchTerm, setAdminSearchTerm] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingGameId, setEditingGameId] = useState(null);

  const genres = useMemo(() => {
    const allGenres = gameCatalog.map(g => g.genre); 
    return ["All", ...new Set(allGenres)].sort();
  }, [gameCatalog]);

  const processedGames = useMemo(() => {
    let result = gameCatalog.filter(game => {
      const matchSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchGenre = selectedGenre === "All" || game.genre === selectedGenre;
      return matchSearch && matchGenre;
    });

    switch (sortBy) {
      case "cheap": return result.sort((a, b) => a.price - b.price);
      case "expensive": return result.sort((a, b) => b.price - a.price);
      case "az": return result.sort((a, b) => a.title.localeCompare(b.title));
      default: return result.sort((a, b) => (b.isCustom ? 1 : 0) - (a.isCustom ? 1 : 0) || a.id - b.id);
    }
  }, [searchQuery, selectedGenre, sortBy, gameCatalog]);

  const adminFilteredGames = useMemo(() => {
    return gameCatalog.filter(game => game.title.toLowerCase().includes(adminSearchTerm.toLowerCase()));
  }, [adminSearchTerm, gameCatalog]);

  const formatRp = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const toggleCart = (game) => {
    if (cart.find(i => i.id === game.id)) {
      setCart(cart.filter(i => i.id !== game.id));
    } else {
      setCart([...cart, game]);
    }
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalCartSize = cart.reduce((sum, item) => sum + item.size, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    let text = `Halo Admin *${STORE_NAME}* 👾✨, saya ingin order jasa isi game PC nih:\n\n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.title} - ${formatRp(item.price)} (${item.size} GB)\n`;
    });
    text += `\n*Loot Bag Saya 🎒:*`;
    text += `\n- Total Game: ${cart.length} Judul`;
    text += `\n- Kapasitas Storage: ${totalCartSize} GB`;
    text += `\n- Total Harga: *${formatRp(totalCartPrice)}* 💖\n`;
    text += `\nOtw bawa HDD/Flashdisk ke BTP Makassar yaaa! 🚀`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPinInput === ADMIN_PIN) {
      setIsAdmin(true); setShowAdminLogin(false); setShowAdminDashboard(true); setAdminPinInput("");
    } else {
      alert("Oops! PIN Salah 🥺");
    }
  };

  const autoDetectGameInfo = (title) => {
    const t = title.toLowerCase();
    let tier = "mid", genre = "Action/Adventure", size = 40;

    if (t.includes('remake') || t.includes('2024') || t.includes('2023') || t.includes('cyberpunk') || t.includes('ultra')) tier = 'ultra';
    else if (t.includes('hd') || t.includes('definitive') || t.includes('horizon') || t.includes('red dead')) tier = 'high';
    else if (t.includes('lego') || t.includes('retro') || t.includes('2d') || t.includes('pixel')) tier = 'low';

    if (t.includes('fifa') || t.includes('pes') || t.includes('manager') || t.includes('nba') || t.includes('wwe')) genre = 'Sports';
    else if (t.includes('need for speed') || t.includes('forza') || t.includes('moto') || t.includes('racing')) genre = 'Racing';
    else if (t.includes('resident evil') || t.includes('silent hill') || t.includes('outlast') || t.includes('horror')) genre = 'Horror';
    else if (t.includes('call of duty') || t.includes('battlefield') || t.includes('sniper') || t.includes('fps')) genre = 'FPS';
    else if (t.includes('sims') || t.includes('cities')) genre = 'Simulation';

    if(tier === 'ultra') size = Math.floor(Math.random() * 40) + 80;
    else if(tier === 'high') size = Math.floor(Math.random() * 30) + 50;
    else if(tier === 'mid') size = Math.floor(Math.random() * 20) + 20;
    else size = Math.floor(Math.random() * 10) + 5;

    return { tier, genre, size };
  };

  const handleSaveGame = async (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return alert("Judul dan Harga harus diisi ya! ✨");

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let updatedCatalog;
    if (editingGameId) {
      updatedCatalog = gameCatalog.map(g => {
        if (g.id === editingGameId) {
          const cleanTitle = newTitle.trim();
          return {
            ...g, title: cleanTitle, price: parseInt(newPrice, 10),
            image: `https://tse2.mm.bing.net/th?q=${encodeURIComponent(cleanTitle + ' pc game wallpaper')}&w=600&h=350&c=7&rs=1&p=0`,
          };
        }
        return g;
      });
      setEditingGameId(null);
    } else {
      const aiGuessedInfo = autoDetectGameInfo(newTitle);
      const newGameObject = buildGameObj(Date.now(), newTitle, newPrice, aiGuessedInfo.size, aiGuessedInfo.genre, aiGuessedInfo.tier, true);
      updatedCatalog = [newGameObject, ...gameCatalog];
    }
    setGameCatalog(updatedCatalog);
    localStorage.setItem('mesra_games_catalog_v2', JSON.stringify(updatedCatalog));
    setNewTitle(""); setNewPrice(""); setIsGenerating(false);
  };

  const handleEditClick = (game) => {
    setEditingGameId(game.id); setNewTitle(game.title); setNewPrice(game.price.toString());
    const modalContent = document.getElementById('admin-modal-content');
    if(modalContent) modalContent.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => { setEditingGameId(null); setNewTitle(""); setNewPrice(""); };

  const handleDeleteGame = (idToDelete) => {
    if(window.confirm("Beneran mau hapus game ini? 🥺")) {
      const updated = gameCatalog.filter(g => g.id !== idToDelete);
      setGameCatalog(updated);
      localStorage.setItem('mesra_games_catalog_v2', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-[#130d26] text-indigo-100 font-sans selection:bg-pink-500/40 relative overflow-hidden">
      {/* Ornamen Background Gemes */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-64 h-64 bg-violet-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>

      {/* NAVBAR (GLASSMORPHISM LUCU) */}
      <nav className="sticky top-0 z-40 bg-[#1a1438]/70 backdrop-blur-xl border-b-2 border-pink-500/20 shadow-[0_10px_30px_rgba(236,72,153,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
            <div className="bg-gradient-to-br from-pink-500 to-violet-600 p-2.5 rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.5)] rotate-3">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <span className="font-extrabold text-2xl hidden md:block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight font-black">
              {STORE_NAME} ✨
            </span>
          </div>

          <div className="flex-1 max-w-xl mx-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-5 text-pink-300 w-5 h-5" />
              <input
                type="text"
                placeholder={`Cari dari ${gameCatalog.length} Game... 🎮`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#261c4a] border-2 border-[#3d2e75] text-pink-100 rounded-full py-3.5 pl-14 pr-5 focus:outline-none focus:border-pink-500 focus:ring-0 transition-all placeholder-indigo-300/50 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => isAdmin ? setShowAdminDashboard(true) : setShowAdminLogin(true)}
              className="p-3 bg-[#261c4a] hover:bg-[#322561] rounded-2xl border-b-4 border-[#1a1438] active:border-b-0 active:translate-y-1 transition-all"
              title="Panel Admin"
            >
              {isAdmin ? <Settings className="w-5 h-5 text-cyan-400" /> : <Lock className="w-5 h-5 text-indigo-400" />}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-2xl border-b-4 border-purple-800 hover:border-purple-700 active:border-b-0 active:translate-y-1 transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)] group"
            >
              <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-indigo-900 text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-indigo-900 animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION KAWAI */}
      <div className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 justify-between">
          <div className="text-center md:text-left space-y-5 flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-bold w-max mx-auto md:mx-0">
              <Sparkles className="w-4 h-4" /> Halo Gamers Makassar!
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Koleksi Game PC <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
               Ter-Aman & Lengkap 🚀
              </span>
            </h1>
            <p className="text-indigo-200/80 max-w-xl mx-auto md:mx-0 text-base sm:text-lg font-medium leading-relaxed">
              Males nunggu download berhari-hari? Sini bawa Flashdisk / HDD kamu, kita isiin langsung dari <b>{gameCatalog.length}+ game pilihan!</b> 💖
            </p>
          </div>

          <div className="bg-[#261c4a]/80 backdrop-blur-xl border-2 border-purple-500/30 p-6 rounded-[2rem] w-full md:w-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-5 min-w-[320px] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-[100px] pointer-events-none"></div>
             
             <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-2xl text-white shadow-lg shadow-cyan-500/30">
                  <MapPin className="w-6 h-6"/>
                </div>
                <div>
                  <div className="text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1">Basecamp Kita 📍</div>
                  <div className="text-white font-bold text-sm leading-tight">{STORE_ADDRESS}</div>
                </div>
             </div>
             
             <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
             
             <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-500/30">
                  <Phone className="w-6 h-6"/>
                </div>
                <div>
                  <div className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">Chat Admin 💬</div>
                  <div className="text-white font-bold text-lg">0852-1185-2235</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 z-10 relative">
        
        {/* SIDEBAR FILTER BUBBLY */}
        <aside className="w-full md:w-72 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-[#1e163b]/80 backdrop-blur-md rounded-[2rem] p-6 border-2 border-purple-500/20 sticky top-28 shadow-xl">
            
            <div className="mb-8">
              <h3 className="text-xs font-black text-pink-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" /> Urutkan Game 🪄
              </h3>
              <div className="relative">
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-[#2d2252] border-2 border-[#43337a] text-indigo-100 font-bold text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:border-pink-500 focus:ring-0 transition-all cursor-pointer shadow-inner"
                >
                  <option value="default">✨ Sesuai Daftar Lengkap</option>
                  <option value="cheap">💸 Harga Termurah</option>
                  <option value="expensive">💎 Harga Premium</option>
                  <option value="az">🔤 Abjad A - Z</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 pointer-events-none" />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" /> Kategori Genre 🏷️
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border-b-2 active:border-b-0 active:translate-y-[2px] ${
                      selectedGenre === genre
                        ? 'bg-cyan-500 text-indigo-950 border-cyan-700 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-[#2d2252] text-indigo-200 border-[#1a1438] hover:bg-[#3c2d6e]'
                    }`}
                  >
                    {genre === "All" ? "🌟 Semua" : genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-pink-500/10 to-violet-500/10 border-2 border-pink-500/20 rounded-3xl relative overflow-hidden group">
              <Star className="absolute -top-3 -right-3 w-12 h-12 text-pink-500/20 rotate-12 group-hover:rotate-45 transition-transform duration-500" />
              <p className="text-xs text-indigo-200 flex flex-col gap-2 leading-relaxed font-medium">
                <span className="font-black flex items-center gap-1 text-pink-400 text-sm"><ShieldCheck className="w-5 h-5"/> Info Penting!</span>
                Data Size Game adalah estimasi (inc. DLC). Jangan lupa bawa Flashdisk/HDD yang sizenya lega ya kak! 🥺💖
              </p>
            </div>
          </div>
        </aside>

        {/* GAME GRID (CUTE CARDS) */}
        <div className="flex-1">
          <div className="mb-8 flex justify-between items-center border-b-2 border-purple-500/20 pb-4">
             <h2 className="text-2xl font-black text-white flex items-center gap-2 drop-shadow-md">
                Katalog Kami 🎮
             </h2>
             <span className="bg-pink-500 text-white font-black text-sm px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                {processedGames.length} Game
             </span>
          </div>
          
          {processedGames.length === 0 ? (
             <div className="text-center py-20 bg-[#1e163b]/50 rounded-[3rem] border-2 border-dashed border-purple-500/30 flex flex-col items-center">
                <div className="text-6xl mb-4">🥺</div>
                <p className="text-pink-300 font-bold text-lg">Yah, gamenya ga ketemu...</p>
                <p className="text-indigo-300/70 text-sm mt-1">Coba cari judul lain ya kak!</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {processedGames.map((game) => (
                <div key={game.id} className="bg-[#241b45] rounded-[2rem] p-3 border-2 border-[#362a66] hover:border-pink-400 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(236,72,153,0.2)] transition-all duration-300 group flex flex-col relative">
                  
                  {/* Badge Baru */}
                  {game.isCustom && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-indigo-900 text-[10px] font-black px-3 py-1 rounded-full z-20 shadow-lg animate-pulse border-2 border-yellow-200">
                      ✨ NEW
                    </div>
                  )}

                  {/* Image Box */}
                  <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#130d26] mb-4 border-2 border-[#130d26]">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      loading="lazy"
                      onError={(e) => { e.target.onerror = null; e.target.src = game.fallbackImage; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#241b45] via-transparent to-transparent opacity-80" />
                    
                    {/* Size Badge */}
                    <div className="absolute bottom-3 left-3 bg-[#130d26]/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-lg">
                      <HardDrive className="w-3.5 h-3.5" /> ±{game.size} GB
                    </div>
                  </div>
                  
                  {/* Content Info */}
                  <div className="flex flex-col flex-1 px-2 pb-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-1.5 truncate bg-pink-500/10 w-max px-2 py-0.5 rounded-md">{game.genre}</div>
                    <h3 className="font-bold text-white text-base leading-tight mb-4 group-hover:text-pink-300 transition-colors line-clamp-2" title={game.title}>{game.title}</h3>
                    
                    <div className="mt-auto flex items-center justify-between mb-4 bg-[#1e163b] p-3 rounded-2xl border border-[#362a66]">
                      <span className="text-xs font-bold text-indigo-300">Biaya Copy:</span>
                      <span className="font-black text-emerald-400 text-lg drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{formatRp(game.price)}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setSelectedGame(game)}
                        className="text-xs bg-[#362a66] hover:bg-[#453682] text-indigo-100 py-3 rounded-2xl font-bold transition-all border-b-4 border-[#1e163b] active:border-b-0 active:translate-y-1 flex items-center justify-center gap-1"
                      >
                        <Monitor className="w-3.5 h-3.5"/> Spek
                      </button>
                      
                      <button 
                        onClick={() => toggleCart(game)}
                        className={`text-xs py-3 rounded-2xl font-black transition-all border-b-4 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-1 shadow-lg ${
                          cart.find(i => i.id === game.id) 
                          ? 'bg-rose-500 text-white border-rose-800 shadow-rose-500/40'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-indigo-950 border-cyan-700 shadow-cyan-500/40'
                        }`}
                      >
                        {cart.find(i => i.id === game.id) ? 'Batal ✖' : 'Bungkus! 🎒'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* =========================================
          MODAL SPESIFIKASI (CUTE POPUP)
      ========================================= */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0817]/90 backdrop-blur-sm" onClick={() => setSelectedGame(null)}>
          <div className="bg-[#241b45] border-4 border-[#453682] rounded-[3rem] w-full max-w-3xl overflow-hidden shadow-[0_0_60px_rgba(236,72,153,0.3)] transform scale-100 transition-all flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            
            <div className="relative h-56 sm:h-72 bg-[#130d26] flex-shrink-0">
               <img 
                 src={selectedGame.image} 
                 alt={selectedGame.title} 
                 onError={(e) => { e.target.onerror = null; e.target.src = selectedGame.fallbackImage; }}
                 className="w-full h-full object-cover opacity-60" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#241b45] via-[#241b45]/60 to-transparent"></div>
               <button onClick={() => setSelectedGame(null)} className="absolute top-5 right-5 bg-[#130d26]/60 hover:bg-rose-500 text-white p-3 rounded-full transition-all backdrop-blur-md border-2 border-white/10 hover:scale-110">
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="inline-block bg-cyan-500 text-indigo-950 font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-3 shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                     {selectedGame.genre}
                   </div>
                   <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">{selectedGame.title}</h2>
                </div>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-[#1e163b] px-5 py-3 rounded-2xl text-sm border-2 border-[#362a66] flex items-center shadow-inner">
                  <HardDrive className="w-5 h-5 mr-2 text-cyan-400"/> Butuh Space: <span className="font-black ml-2 text-white text-base">± {selectedGame.size} GB</span>
                </div>
                <div className="bg-[#1e163b] px-5 py-3 rounded-2xl text-sm border-2 border-[#362a66] flex items-center shadow-inner">
                  Biaya Isi: <span className="font-black text-emerald-400 ml-2 text-xl drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">{formatRp(selectedGame.price)}</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 bg-[#130d26] p-6 rounded-[2rem] border-2 border-[#362a66] shadow-inner">
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-pink-400 uppercase tracking-widest border-b-2 border-[#362a66] pb-3 flex items-center gap-2">
                    <span className="bg-pink-500/20 p-1.5 rounded-lg"><Monitor className="w-4 h-4 text-pink-500" /></span> PC Kentang (Min)
                  </h4>
                  <ul className="space-y-4 text-sm">
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">Windows</span> <span className="text-gray-200 font-bold">{selectedGame.specs.min.os}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase flex items-center gap-1"><Cpu className="w-3 h-3"/> Processor</span> <span className="text-gray-200 font-bold">{selectedGame.specs.min.cpu}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">RAM</span> <span className="text-gray-200 font-bold">{selectedGame.specs.min.ram}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">VGA / GPU</span> <span className="text-gray-200 font-bold">{selectedGame.specs.min.gpu}</span></li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest border-b-2 border-[#362a66] pb-3 flex items-center gap-2">
                    <span className="bg-cyan-500/20 p-1.5 rounded-lg"><Monitor className="w-4 h-4 text-cyan-500" /></span> PC Sultan (Rec)
                  </h4>
                  <ul className="space-y-4 text-sm">
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">Windows</span> <span className="text-white font-bold">{selectedGame.specs.rec.os}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase flex items-center gap-1"><Cpu className="w-3 h-3"/> Processor</span> <span className="text-white font-bold">{selectedGame.specs.rec.cpu}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">RAM</span> <span className="text-white font-bold">{selectedGame.specs.rec.ram}</span></li>
                    <li className="flex flex-col"><span className="text-indigo-400 text-[10px] font-bold uppercase">VGA / GPU</span> <span className="text-white font-bold">{selectedGame.specs.rec.gpu}</span></li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <button 
                  onClick={() => { toggleCart(selectedGame); setSelectedGame(null); }}
                  className={`w-full py-5 font-black rounded-full transition-all flex items-center justify-center gap-3 text-lg border-b-4 active:border-b-0 active:translate-y-1 shadow-lg ${
                    cart.find(i => i.id === selectedGame.id)
                    ? 'bg-rose-500 text-white border-rose-800 hover:bg-rose-400 shadow-rose-500/40'
                    : 'bg-cyan-500 text-indigo-950 border-cyan-700 hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" /> 
                  {cart.find(i => i.id === selectedGame.id) ? 'Buang dari Tas Loot 🗑️' : 'Masukkan Tas Loot 🎒✨'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================
          SIDEBAR LOOT BAG (KERANJANG)
      ========================================= */}
      <div className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-[#1a1438] border-l-4 border-pink-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b-2 border-[#362a66] flex items-center justify-between bg-[#1e163b]">
          <h2 className="text-2xl font-black flex items-center gap-3 text-white">
            🎒 Loot Bag 
            <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">{cart.length}</span>
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-3 bg-[#130d26] border-2 border-[#362a66] hover:bg-rose-500 rounded-full text-indigo-200 hover:text-white transition-all hover:scale-110">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#130d26]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-indigo-300 space-y-5">
              <div className="text-7xl animate-bounce">🎒</div>
              <p className="font-bold text-lg">Tas Loot kamu masih kosong nih...</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-2 px-8 py-4 bg-cyan-500 text-indigo-950 font-black rounded-full hover:bg-cyan-400 border-b-4 border-cyan-700 active:border-b-0 active:translate-y-1 transition-all shadow-lg">
                 Ayo Cari Game! 🎮
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-[#1e163b] p-3 rounded-3xl border-2 border-[#362a66] hover:border-pink-500/50 transition-colors group">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onError={(e) => { e.target.onerror = null; e.target.src = item.fallbackImage; }}
                  className="w-24 h-24 object-cover rounded-[1.5rem] border-2 border-[#130d26]" 
                />
                <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                  <h4 className="font-bold text-base leading-tight truncate text-white mb-1" title={item.title}>{item.title}</h4>
                  <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2">{item.genre}</div>
                  <div className="flex justify-between items-end mt-auto">
                    <span className="text-emerald-400 font-black text-lg">{formatRp(item.price)}</span>
                    <span className="text-indigo-950 text-xs font-black px-2.5 py-1 bg-cyan-400 rounded-lg flex items-center gap-1 shadow-md">
                      <HardDrive className="w-3 h-3"/> {item.size} GB
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => toggleCart(item)}
                  className="self-center p-3 bg-[#130d26] text-gray-400 hover:text-white hover:bg-rose-500 rounded-2xl transition-all mr-1"
                  title="Buang"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-[#1e163b] border-t-2 border-[#362a66]">
            <div className="bg-[#130d26] rounded-3xl p-5 mb-5 border-2 border-[#362a66] shadow-inner">
              <div className="flex justify-between text-sm text-indigo-300 mb-3 font-medium">
                <span>Total Size (Bawa HDD!)</span>
                <span className="font-black text-cyan-400 flex items-center gap-1 bg-cyan-500/10 px-2 py-1 rounded-md">
                  <HardDrive className="w-4 h-4" /> ± {totalCartSize} GB
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-[#362a66]">
                <span className="text-white font-bold">Total Biaya 💸</span>
                <span className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{formatRp(totalCartPrice)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-black rounded-full flex items-center justify-center transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] gap-3 text-lg border-b-4 border-rose-800 active:border-b-0 active:translate-y-1"
            >
              <Send className="w-6 h-6" /> Cus ke WhatsApp! 🚀
            </button>
            <p className="text-[11px] font-medium text-center text-indigo-300 mt-4">
              List game kamu bakal langsung dikirim ke WhatsApp Admin {STORE_NAME} 💖
            </p>
          </div>
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-[#0b0817]/80 z-40 sm:hidden backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      )}

      {/* =========================================
          MODAL LOGIN ADMIN (CUTE SECURITY)
      ========================================= */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0817]/90 backdrop-blur-md" onClick={() => setShowAdminLogin(false)}>
          <div className="bg-[#241b45] border-4 border-[#453682] rounded-[3rem] p-8 max-w-sm w-full shadow-[0_0_50px_rgba(6,182,212,0.2)] text-center relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full pointer-events-none"></div>
            
            <div className="bg-[#1e163b] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Lock className="w-10 h-10 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Admin Only 🔒</h2>
            <p className="text-indigo-300 text-sm mb-8 font-medium">Masukin PIN rahasia kamu dong!</p>
            
            <form onSubmit={handleAdminLogin}>
              <input 
                type="password" 
                value={adminPinInput}
                onChange={e => setAdminPinInput(e.target.value)}
                placeholder="****"
                className="w-full bg-[#130d26] border-2 border-[#453682] text-center text-3xl font-black tracking-[1em] text-white rounded-2xl py-4 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] mb-6 transition-all placeholder-indigo-800"
                autoFocus
              />
              <button type="submit" className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-indigo-950 font-black text-lg rounded-full border-b-4 border-cyan-700 active:border-b-0 active:translate-y-1 transition-all shadow-lg">
                Buka Gembok 🗝️
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================
          MODAL DASHBOARD ADMIN 
      ========================================= */}
      {showAdminDashboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0817]/95 backdrop-blur-md" onClick={() => setShowAdminDashboard(false)}>
          <div id="admin-modal-content" className="bg-[#1e163b] border-4 border-[#453682] rounded-[3rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(236,72,153,0.2)]" onClick={e => e.stopPropagation()}>
            
            <div className="p-6 border-b-2 border-[#362a66] flex items-center justify-between bg-[#1a1438]">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <span className="bg-emerald-500/20 p-2 rounded-xl"><Unlock className="w-6 h-6 text-emerald-400" /></span> Dashboard Sultan 👑
                </h2>
                <p className="text-indigo-300 text-xs font-bold mt-2 uppercase tracking-widest">Manajemen Katalog Otomatis</p>
              </div>
              <button onClick={() => setShowAdminDashboard(false)} className="p-3 bg-[#241b45] border-2 border-[#362a66] hover:bg-rose-500 rounded-full text-white transition-all hover:scale-110">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8 bg-[#130d26]">
              
              {/* Form Input / Edit Game */}
              <div className={`bg-[#241b45] border-4 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden transition-colors ${editingGameId ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.1)]'}`}>
                <div className={`absolute top-0 right-0 w-40 h-40 rounded-bl-full pointer-events-none opacity-20 ${editingGameId ? 'bg-yellow-400' : 'bg-pink-500'}`}></div>
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                  {editingGameId ? (
                    <><Edit3 className="w-6 h-6 text-yellow-400" /> Mode Edit Game ✏️</>
                  ) : (
                    <><Plus className="w-6 h-6 text-pink-400" /> Tambah Game Baru ✨</>
                  )}
                </h3>
                
                <form onSubmit={handleSaveGame} className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2">Judul Game (Harus Beneran Ya!)</label>
                    <input 
                      type="text" 
                      value={newTitle}
                      onChange={e => setNewTitle(e.target.value)}
                      placeholder="Cth: Resident Evil 4 Remake"
                      className="w-full bg-[#130d26] border-2 border-[#453682] text-white font-bold rounded-2xl py-4 px-5 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-indigo-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2">Harga Copy (Angka Aja)</label>
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 bg-[#362a66] flex items-center justify-center px-5 rounded-l-2xl border-r-2 border-[#453682]">
                        <span className="text-white font-black">Rp</span>
                      </div>
                      <input 
                        type="number" 
                        value={newPrice}
                        onChange={e => setNewPrice(e.target.value)}
                        placeholder="25000"
                        className="w-full bg-[#130d26] border-2 border-[#453682] text-white font-bold text-lg rounded-2xl py-4 pl-20 pr-5 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-indigo-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button 
                      type="submit" 
                      disabled={isGenerating}
                      className={`flex-1 py-4 rounded-full font-black text-lg flex items-center justify-center gap-2 transition-all border-b-4 active:border-b-0 active:translate-y-1 shadow-lg ${
                        isGenerating 
                        ? 'bg-[#362a66] border-[#1e163b] text-indigo-300 cursor-wait' 
                        : editingGameId
                          ? 'bg-yellow-400 hover:bg-yellow-300 border-yellow-600 text-yellow-950'
                          : 'bg-pink-500 hover:bg-pink-400 border-pink-700 text-white'
                      }`}
                    >
                      {isGenerating ? (
                        <><Loader2 className="w-6 h-6 animate-spin" /> {editingGameId ? 'Menyimpan...' : 'Nyari Poster...'}</>
                      ) : (
                        <><Monitor className="w-6 h-6" /> {editingGameId ? 'Simpan Editan 💾' : 'Auto Generate! 🚀'}</>
                      )}
                    </button>

                    {editingGameId && (
                       <button 
                         type="button"
                         onClick={handleCancelEdit}
                         disabled={isGenerating}
                         className="py-4 px-8 rounded-full font-black bg-[#362a66] hover:bg-rose-500 border-b-4 border-[#1e163b] hover:border-rose-700 active:border-b-0 active:translate-y-1 text-white transition-all"
                       >
                         Batal ✖
                       </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Daftar Seluruh Game Untuk Diedit */}
              <div className="bg-[#241b45] p-6 rounded-[2rem] border-2 border-[#362a66]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b-2 border-[#362a66] pb-4">
                  <h3 className="text-sm font-black text-cyan-400 uppercase tracking-widest">
                    Semua Katalog ({gameCatalog.length}) 📚
                  </h3>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Cari mau edit apa..."
                      value={adminSearchTerm}
                      onChange={(e) => setAdminSearchTerm(e.target.value)}
                      className="w-full bg-[#130d26] border-2 border-[#453682] text-white font-bold text-sm rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-all placeholder-indigo-700"
                    />
                  </div>
                </div>
                
                {adminFilteredGames.length === 0 ? (
                  <div className="text-center py-10 text-indigo-400 font-bold border-2 border-dashed border-[#453682] rounded-3xl">
                    Waduh, gamenya nggak ada bos.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adminFilteredGames.map((game) => (
                      <div key={game.id} className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border-2 transition-all ${editingGameId === game.id ? 'bg-yellow-400/10 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'bg-[#130d26] border-[#362a66]'}`}>
                        <div className="min-w-0 pr-4">
                          <div className="font-black text-white text-base truncate">{game.title}</div>
                          <div className="text-xs text-indigo-300 mt-2 flex flex-wrap items-center gap-2 sm:gap-3 font-bold">
                            <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{formatRp(game.price)}</span>
                            <span className="bg-[#362a66] px-2 py-1 rounded-md">{game.size} GB</span>
                            <span className="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-md">{game.genre}</span>
                            {game.isCustom && <span className="bg-pink-500 text-white px-2 py-1 rounded-md text-[10px] uppercase shadow-md">Hasil Input ✨</span>}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                          <button 
                            onClick={() => handleEditClick(game)}
                            className="p-3 bg-[#241b45] border-2 border-[#362a66] hover:bg-yellow-400 hover:border-yellow-400 text-indigo-300 hover:text-yellow-950 rounded-xl transition-all shadow-md"
                            title="Edit"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteGame(game.id)}
                            className="p-3 bg-[#241b45] border-2 border-[#362a66] hover:bg-rose-500 hover:border-rose-500 text-indigo-300 hover:text-white rounded-xl transition-all shadow-md"
                            title="Hapus"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Custom Scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #130d26;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #453682;
          border-radius: 20px;
          border: 2px solid #130d26;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec4899;
        }
      `}} />
    </div>
  );
}
