/**
 * Samruddhi Setu - Firebase Config & Dual-Mode Reactive Data Layer
 * Supports both Live Firebase SDK (v10 modular/compat), Firebase REST API, and Local Reactive Firestore
 */

// Live Firebase Configuration
// This is the real, registered Firebase project this app connects to.
// projectId / authDomain / storageBucket are permanent identifiers assigned
// by Google when the project was created — they must stay exactly as shown
// in the Firebase console (Project settings > General), not just match the
// app's display branding.
const defaultFirebaseConfig = {
  apiKey: "AIzaSyBf3Ipslo2l1sm_1W9RDnfFhDa3jXQLhXs",
  authDomain: "samruddhi-setu-dc4ac.firebaseapp.com",
  projectId: "samruddhi-setu-dc4ac",
  storageBucket: "samruddhi-setu-dc4ac.firebasestorage.app",
  messagingSenderId: "315639815992",
  appId: "1:315639815992:web:17bf39387c8b3e868debcd",
  measurementId: "G-QTR6L63GW4"
};

// Initial Seed Data for Agricultural & Coastal Marine Ecosystem
const initialDataSeed = {
  // 1. Cooperative Societies Directory
  cooperatives: [
    {
      id: "coop-sahyadri-01",
      name: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      shortName: "Sahyadri Co-op",
      regNo: "MH/NSK/COOP/AGRI/2014-988",
      type: "Horticulture & Crops",
      district: "Nashik",
      state: "Maharashtra",
      pinCode: "422209",
      address: "Pimpalgaon APMC Complex, Niphad Taluk, Nashik District",
      nearbyZone: "Nashik - Dindori - Niphad Belt (Within 15 km)",
      president: "Vilasrao Shinde",
      secretary: "Sanjay Sonawane",
      phone: "+91 253 281 9001",
      email: "contact@sahyadricoop.org",
      established: 2014,
      totalMembers: 340,
      memberCapacity: 25,
      activeFarmersCount: 142,
      storageCapacity: "12,000 MT Cold Storage & Atmosphere Controlled Units",
      fleetSize: "18 Reefer Trucks (2°C - 8°C)",
      commissionRate: "1.5% Pooled Maintenance",
      minWeightKgThreshold: 50,
      activeSchemes: ["PMKSY Integrated Cold Chain", "MIDH Packhouse Subsidy", "Agriculture Infrastructure Fund (AIF)"],
      bannerImage: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
      description: "Premier horticultural farmer producer cooperative handling export-spec tomatoes, grapes, and onions. Operates direct cold chain aggregation with guaranteed floor pricing.",
      rating: 4.92,
      verified: true
    },
    {
      id: "coop-karnal-02",
      name: "Karnal Indigenous Dairy & Grains Cooperative Union",
      shortName: "Karnal Dairy Union",
      regNo: "HR/KNL/COOP/DAIRY/2018-412",
      type: "Dairy, Livestock & Grains",
      district: "Karnal",
      state: "Haryana",
      pinCode: "132001",
      address: "Sector 32, National Dairy Corridor, GT Road, Karnal",
      nearbyZone: "Karnal - Kurukshetra - Panipat Belt (Within 25 km)",
      president: "Harpal Singh Cheema",
      secretary: "Ranjit Kaur",
      phone: "+91 184 225 6780",
      email: "karnaldairy.union@haryanaagri.org",
      established: 2018,
      totalMembers: 215,
      memberCapacity: 18,
      activeFarmersCount: 98,
      storageCapacity: "25,000 Liters Chilling Silos + 8,000 MT Grain Silos",
      fleetSize: "12 Insulated Milk Tankers & Dry Freight Trucks",
      commissionRate: "1.2% Non-Profit Operation",
      minWeightKgThreshold: 50,
      activeSchemes: ["Rashtriya Gokul Mission", "National Livestock Mission", "Sub-Mission on Seeds & Planting Material"],
      bannerImage: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80",
      description: "State-recognized indigenous Gir cow & Murrah buffalo dairy union. Aggregates farm-fresh A2 milk, Vedic Bilona ghee, and pesticide-free golden wheat.",
      rating: 4.88,
      verified: true
    },
    {
      id: "coop-tuticorin-03",
      name: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      shortName: "Gulf Marine Co-op",
      regNo: "TN/TCN/COOP/MARINE/2016-702",
      type: "Marine & Coastal Fisheries",
      district: "Thoothukudi (Tuticorin)",
      state: "Tamil Nadu",
      pinCode: "628001",
      address: "Deep Sea Fishing Harbour Jetty Road, Tuticorin Coastal Zone",
      nearbyZone: "Tuticorin Marine Corridor & Jetty 1-4 (Within 10 km)",
      president: "J. Anthony Sebastian",
      secretary: "M. Muthuraman",
      phone: "+91 461 232 4410",
      email: "tuticorin.marinecoop@tnfisheries.org",
      established: 2016,
      totalMembers: 480,
      memberCapacity: 30,
      activeFarmersCount: 175,
      storageCapacity: "600 MT Flash-Freeze Cold Rooms (-25°C) & Flake Ice Plants",
      fleetSize: "14 Deep-Freeze Mobile Reefer Containers",
      commissionRate: "1.8% Coastal Welfare Pool",
      minWeightKgThreshold: 50,
      activeSchemes: ["PM Matsya Sampada Yojana (PMMSY)", "Blue Revolution Fishery Support", "KCC for Fisheries"],
      bannerImage: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=800&auto=format&fit=crop&q=80",
      description: "Empowering 480+ traditional and mechanised deep-sea fishing families. Offers ocean-side blast freezing, cold storage, and direct hotel/export contract fulfillment.",
      rating: 4.95,
      verified: true
    },
    {
      id: "coop-konkan-04",
      name: "Konkan Agro & Horticulture Producer Cooperative Society",
      shortName: "Konkan Horti Co-op",
      regNo: "MH/RTG/COOP/HORTI/2019-335",
      type: "Fruit Orchards & Spices",
      district: "Ratnagiri",
      state: "Maharashtra",
      pinCode: "416613",
      address: "Devgad APMC Yard, Ratnagiri Coastal Highway",
      nearbyZone: "Ratnagiri - Devgad - Sindhudurg Orchard Belt (Within 30 km)",
      president: "Rajesh S. Sawant",
      secretary: "Pooja V. Mane",
      phone: "+91 2352 221 445",
      email: "konkan.mangoes@mahaagricoop.org",
      established: 2019,
      totalMembers: 190,
      memberCapacity: 12,
      activeFarmersCount: 84,
      storageCapacity: "5,000 MT Ripening Chambers & Vapour Heat Treatment (VHT) Plant",
      fleetSize: "8 Air-Conditioned Fruit Transit Vans",
      commissionRate: "2.0% GI Authentication & Quality Grading",
      minWeightKgThreshold: 50,
      activeSchemes: ["National Horticulture Board (NHB)", "APEDA Export Incentive", "PMFBY Crop Shield"],
      bannerImage: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80",
      description: "Specialized GI-tagged Ratnagiri Alphonso mangoes, cashew processing, and coastal spices cooperative with complete traceability and blockchain certification.",
      rating: 4.91,
      verified: true
    }
  ],

  // 2. Users (Farmers, Consumers, Logistics, Admins)
  // No predefined/demo user profiles are shipped with the app.
  // Real accounts are created via Register/Login and stored in Firebase.
  users: [],

  // 3. Products (Direct & Cooperative channels with Sales Status)
  products: [
    {
      id: "prod-101",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Farm Fresh Vine-Ripened Hybrid Tomatoes",
      category: "vegetables",
      subCategory: "Tomato",
      price: 28,
      mandiPrice: 42,
      retailPrice: 50,
      unit: "kg",
      stockQuantity: 450,
      minOrderQuantity: 1,
      weightKg: 450,
      harvestDate: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Export Quality)",
      aiFreshnessScore: 98,
      shelfLifeDays: 8,
      isOrganic: true,
      description: "Naturally grown pesticide-monitored juicy red tomatoes pooled via Sahyadri Co-op cold chain."
    },
    {
      id: "prod-102",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nashik Red Onion (High Pungency & Storage Life)",
      category: "vegetables",
      subCategory: "Onion",
      price: 24,
      mandiPrice: 36,
      retailPrice: 45,
      unit: "kg",
      stockQuantity: 1200,
      minOrderQuantity: 2,
      weightKg: 1200,
      harvestDate: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 30,
      isOrganic: false,
      description: "Sun-cured dry-skin red onions with crisp layers stored in Sahyadri Co-op ventilated silos."
    },
    {
      id: "prod-103",
      farmerId: "farmer-sunita-102",
      farmerName: "Sunita Devi Sharma",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Pure A2 Gir Cow Raw Chilled Milk (Farm Bottled)",
      category: "dairy",
      subCategory: "Milk",
      price: 68,
      mandiPrice: 85,
      retailPrice: 95,
      unit: "liter",
      stockQuantity: 90,
      minOrderQuantity: 1,
      weightKg: 90,
      harvestDate: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Purity 99.8%)",
      aiFreshnessScore: 99,
      shelfLifeDays: 3,
      isOrganic: true,
      description: "Untouched, grass-fed A2 milk immediately chilled to 4°C right after morning milking."
    },
    {
      id: "prod-104",
      farmerId: "farmer-sunita-102",
      farmerName: "Sunita Devi Sharma",
      farmerLocation: "Karnal, Haryana",
      societyId: null,
      societyName: null,
      sellingChannel: "direct",
      saleStatus: "available",
      title: "Artisanal Vedic Bilona Cow Ghee (Glass Jar)",
      category: "dairy",
      subCategory: "Ghee",
      price: 1150,
      mandiPrice: 1550,
      retailPrice: 1800,
      unit: "liter",
      stockQuantity: 35,
      minOrderQuantity: 1,
      weightKg: 35,
      harvestDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Artisanal Vedic Bilona Cow Ghee (Glass Jar).jpg",
      aiGrade: "Grade A+ (Traditional Bilona)",
      aiFreshnessScore: 100,
      shelfLifeDays: 180,
      isOrganic: true,
      description: "Hand-churned curd from indigenous Gir cows simmered slowly over firewood directly by farmer."
    },
    {
      id: "prod-105",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "sold",
      title: "Thompson Seedless Sweet Table Grapes (Batch Alpha)",
      category: "fruits",
      subCategory: "Grapes",
      price: 75,
      mandiPrice: 110,
      retailPrice: 140,
      unit: "kg",
      stockQuantity: 0,
      minOrderQuantity: 1,
      weightKg: 850,
      harvestDate: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Export Batch - 18° Brix)",
      aiFreshnessScore: 96,
      shelfLifeDays: 12,
      isOrganic: true,
      description: "Crisp, sweet seedless green grapes - this batch has been completely sold via Sahyadri Co-op."
    },
    {
      id: "prod-106",
      farmerId: "farmer-kailas-104",
      farmerName: "Kailasrao More",
      farmerLocation: "Niphad, Nashik",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Emerald Green Capsicum & Bell Peppers",
      category: "vegetables",
      subCategory: "Capsicum",
      price: 36,
      mandiPrice: 55,
      retailPrice: 68,
      unit: "kg",
      stockQuantity: 320,
      minOrderQuantity: 2,
      weightKg: 320,
      harvestDate: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Polyhouse",
      aiFreshnessScore: 97,
      shelfLifeDays: 10,
      isOrganic: true,
      description: "Thick-walled crunchy green bell peppers harvested from automated shade-net polyhouses."
    },
    {
      id: "prod-107",
      farmerId: "farmer-jaswant-106",
      farmerName: "Sardar Jaswant Singh",
      farmerLocation: "Taraori, Karnal",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Aged Traditional Taraori Basmati Rice (1121 Extra Long)",
      category: "grains",
      subCategory: "Rice",
      price: 110,
      mandiPrice: 155,
      retailPrice: 185,
      unit: "kg",
      stockQuantity: 4200,
      minOrderQuantity: 5,
      weightKg: 4200,
      harvestDate: new Date(Date.now() - 200 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Heritage Long Grain (Aged 2 Years)",
      aiFreshnessScore: 100,
      shelfLifeDays: 730,
      isOrganic: true,
      description: "Naturally matured fragrant basmati rice grain with 8.4mm elongation after cooking."
    },
    {
      id: "prod-108",
      farmerId: "farmer-mahesh-108",
      farmerName: "Mahesh Sawant",
      farmerLocation: "Devgad, Ratnagiri",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "GI-Tagged Devgad Alphonso Mangoes (Carbide Free)",
      category: "fruits",
      subCategory: "Mango",
      price: 680,
      mandiPrice: 950,
      retailPrice: 1200,
      unit: "dozen",
      stockQuantity: 180,
      minOrderQuantity: 1,
      weightKg: 540,
      harvestDate: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80",
      aiGrade: "GI Certified Grade A+",
      aiFreshnessScore: 100,
      shelfLifeDays: 14,
      isOrganic: true,
      description: "Authentic carbide-free GI Devgad Hapus tree-ripened in dry rice grass bedding."
    },
    {
      id: "prod-109",
      farmerId: "farmer-fisher-103",
      farmerName: "Anthony Murugan",
      farmerLocation: "Tuticorin Marine Jetty",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "sold",
      title: "Deep Sea Fresh Silver Pomfret (Batch Marine 4)",
      category: "seafood",
      subCategory: "Seafood",
      price: 480,
      mandiPrice: 700,
      retailPrice: 850,
      unit: "kg",
      stockQuantity: 0,
      minOrderQuantity: 2,
      weightKg: 650,
      harvestDate: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Marine Grade A+ (Slurry Chilled)",
      aiFreshnessScore: 99,
      shelfLifeDays: 8,
      isOrganic: false,
      description: "Direct boat-haul prime silver pomfret - 100% consignment sold to hotel chains."
    },
    {
      id: "prod-110",
      farmerId: "farmer-fisher-103",
      farmerName: "Anthony Murugan",
      farmerLocation: "Tuticorin Marine Jetty",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Wild Ocean Jumbo Tiger Prawns (Head-On)",
      category: "seafood",
      subCategory: "Seafood",
      price: 520,
      mandiPrice: 750,
      retailPrice: 890,
      unit: "kg",
      stockQuantity: 180,
      minOrderQuantity: 2,
      weightKg: 180,
      harvestDate: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Marine (16/20 Count)",
      aiFreshnessScore: 99,
      shelfLifeDays: 10,
      isOrganic: false,
      description: "Prime sea catch blast chilled at harbor. Export size count with sweet succulent flesh."
    },

    // ===== Expanded catalogue (v7): 8+ products per category =====
    {
      id: "prod-111",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Organic Baby Spinach (Palak) Bunches",
      category: "vegetables",
      subCategory: "Spinach",
      price: 32,
      mandiPrice: 48,
      retailPrice: 60,
      unit: "kg",
      stockQuantity: 180,
      minOrderQuantity: 1,
      weightKg: 180,
      harvestDate: new Date(Date.now() - 27 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A (Tender Leaf)",
      aiFreshnessScore: 96,
      shelfLifeDays: 4,
      isOrganic: true,
      rating: 4.7,
      reviewCount: 58,
      description: "Hand-picked tender palak harvested at dawn and cold-chained within four hours."
    },
    {
      id: "prod-112",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Country Brinjal (Bharta Special)",
      category: "vegetables",
      subCategory: "Brinjal",
      price: 26,
      mandiPrice: 40,
      retailPrice: 52,
      unit: "kg",
      stockQuantity: 320,
      minOrderQuantity: 1,
      weightKg: 320,
      harvestDate: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Country Brinjal (Bharta Special).png",
      aiGrade: "Grade A",
      aiFreshnessScore: 94,
      shelfLifeDays: 6,
      isOrganic: true,
      rating: 4.5,
      reviewCount: 41,
      description: "Glossy purple bharta brinjal with thin skin and very few seeds."
    },
    {
      id: "prod-113",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Tender Ladies Finger (Bhindi)",
      category: "vegetables",
      subCategory: "Okra",
      price: 38,
      mandiPrice: 56,
      retailPrice: 70,
      unit: "kg",
      stockQuantity: 210,
      minOrderQuantity: 1,
      weightKg: 210,
      harvestDate: new Date(Date.now() - 29 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Snap Tested)",
      aiFreshnessScore: 97,
      shelfLifeDays: 5,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 73,
      description: "Snap-tested tender bhindi, no fibrous pods, picked the same morning."
    },
    {
      id: "prod-114",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nadan Ooty Carrots (Sweet Crunch)",
      category: "vegetables",
      subCategory: "Carrot",
      price: 34,
      mandiPrice: 50,
      retailPrice: 64,
      unit: "kg",
      stockQuantity: 400,
      minOrderQuantity: 1,
      weightKg: 400,
      harvestDate: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+",
      aiFreshnessScore: 95,
      shelfLifeDays: 12,
      isOrganic: false,
      rating: 4.6,
      reviewCount: 52,
      description: "High-altitude Ooty carrots with deep orange core and natural sweetness."
    },
    {
      id: "prod-115",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Snowball Cauliflower (Pesticide Monitored)",
      category: "vegetables",
      subCategory: "Cauliflower",
      price: 30,
      mandiPrice: 45,
      retailPrice: 58,
      unit: "kg",
      stockQuantity: 260,
      minOrderQuantity: 1,
      weightKg: 260,
      harvestDate: new Date(Date.now() - 31 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Snowball Cauliflower (Pesticide Monitored).jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 93,
      shelfLifeDays: 7,
      isOrganic: true,
      rating: 4.4,
      reviewCount: 36,
      description: "Tight compact white curds grown under residue-monitored protocols."
    },
    {
      id: "prod-116",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Salad Cucumber (Seedless English Variety)",
      category: "vegetables",
      subCategory: "Cucumber",
      price: 28,
      mandiPrice: 42,
      retailPrice: 54,
      unit: "kg",
      stockQuantity: 290,
      minOrderQuantity: 1,
      weightKg: 290,
      harvestDate: new Date(Date.now() - 32 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 8,
      isOrganic: true,
      rating: 4.5,
      reviewCount: 44,
      description: "Crisp seedless cucumbers ideal for salads and summer coolers."
    },
    {
      id: "prod-117",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Farm Potato (Kufri Jyoti Table Grade)",
      category: "vegetables",
      subCategory: "Potato",
      price: 22,
      mandiPrice: 33,
      retailPrice: 42,
      unit: "kg",
      stockQuantity: 900,
      minOrderQuantity: 1,
      weightKg: 900,
      harvestDate: new Date(Date.now() - 33 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A (Table)",
      aiFreshnessScore: 92,
      shelfLifeDays: 30,
      isOrganic: false,
      rating: 4.3,
      reviewCount: 88,
      description: "All-purpose Kufri Jyoti potatoes, cured and graded for long shelf life."
    },
    {
      id: "prod-118",
      farmerId: "farmer-rajesh-104",
      farmerName: "Rajesh S. Sawant",
      farmerLocation: "Ratnagiri, Maharashtra",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Bhagwa Pomegranate (Deep Ruby Arils)",
      category: "fruits",
      subCategory: "Pomegranate",
      price: 145,
      mandiPrice: 210,
      retailPrice: 260,
      unit: "kg",
      stockQuantity: 240,
      minOrderQuantity: 1,
      weightKg: 240,
      harvestDate: new Date(Date.now() - 34 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Bhagwa Pomegranate (Deep Ruby Arils).jpg",
      aiGrade: "Grade A+ (Export)",
      aiFreshnessScore: 98,
      shelfLifeDays: 18,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 126,
      description: "Thick-skinned Bhagwa pomegranates with deep ruby arils and high Brix."
    },
    {
      id: "prod-119",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nendran Banana (Kerala Highland)",
      category: "fruits",
      subCategory: "Banana",
      price: 58,
      mandiPrice: 86,
      retailPrice: 105,
      unit: "kg",
      stockQuantity: 380,
      minOrderQuantity: 1,
      weightKg: 380,
      harvestDate: new Date(Date.now() - 35 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Nendran Banana (Kerala Highland).jpeg",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 7,
      isOrganic: true,
      rating: 4.6,
      reviewCount: 64,
      description: "Traditional Nendran bananas, naturally ripened without carbide."
    },
    {
      id: "prod-120",
      farmerId: "farmer-rajesh-104",
      farmerName: "Rajesh S. Sawant",
      farmerLocation: "Ratnagiri, Maharashtra",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Red Lady Papaya (Farm Ripened)",
      category: "fruits",
      subCategory: "Papaya",
      price: 42,
      mandiPrice: 64,
      retailPrice: 80,
      unit: "kg",
      stockQuantity: 310,
      minOrderQuantity: 1,
      weightKg: 310,
      harvestDate: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 94,
      shelfLifeDays: 6,
      isOrganic: true,
      rating: 4.5,
      reviewCount: 49,
      description: "Tree-ripened Red Lady papaya with firm sweet flesh."
    },
    {
      id: "prod-121",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Allahabad Safeda Guava",
      category: "fruits",
      subCategory: "Guava",
      price: 48,
      mandiPrice: 72,
      retailPrice: 90,
      unit: "kg",
      stockQuantity: 270,
      minOrderQuantity: 1,
      weightKg: 270,
      harvestDate: new Date(Date.now() - 7 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+",
      aiFreshnessScore: 96,
      shelfLifeDays: 8,
      isOrganic: true,
      rating: 4.7,
      reviewCount: 58,
      description: "Crisp white-fleshed Safeda guava with high vitamin C."
    },
    {
      id: "prod-122",
      farmerId: "farmer-rajesh-104",
      farmerName: "Rajesh S. Sawant",
      farmerLocation: "Ratnagiri, Maharashtra",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nagpur Santra Mandarin Oranges",
      category: "fruits",
      subCategory: "Orange",
      price: 68,
      mandiPrice: 102,
      retailPrice: 125,
      unit: "kg",
      stockQuantity: 350,
      minOrderQuantity: 1,
      weightKg: 350,
      harvestDate: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Juice Grade)",
      aiFreshnessScore: 97,
      shelfLifeDays: 12,
      isOrganic: false,
      rating: 4.8,
      reviewCount: 91,
      description: "Loose-skinned Nagpur mandarins, easy to peel and richly juicy."
    },
    {
      id: "prod-123",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Sitaphal Custard Apple (Balanagar)",
      category: "fruits",
      subCategory: "Custard Apple",
      price: 132,
      mandiPrice: 190,
      retailPrice: 235,
      unit: "kg",
      stockQuantity: 150,
      minOrderQuantity: 1,
      weightKg: 150,
      harvestDate: new Date(Date.now() - 9 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Sitaphal Custard Apple (Balanagar).jpeg",
      aiGrade: "Grade A+",
      aiFreshnessScore: 96,
      shelfLifeDays: 4,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 47,
      description: "Creamy Balanagar sitaphal, hand-graded for uniform ripening."
    },
    {
      id: "prod-124",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Set Dahi from A2 Gir Cow Milk",
      category: "dairy",
      subCategory: "Curd",
      price: 72,
      mandiPrice: 108,
      retailPrice: 135,
      unit: "kg",
      stockQuantity: 160,
      minOrderQuantity: 1,
      weightKg: 160,
      harvestDate: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Set Dahi from A2 Gir Cow Milk.jpg",
      aiGrade: "Grade A+ (Live Culture)",
      aiFreshnessScore: 98,
      shelfLifeDays: 5,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 143,
      description: "Naturally set dahi cultured in earthen pots from single-herd A2 milk."
    },
    {
      id: "prod-125",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Fresh Malai Paneer (Hand Pressed)",
      category: "dairy",
      subCategory: "Paneer",
      price: 320,
      mandiPrice: 470,
      retailPrice: 580,
      unit: "kg",
      stockQuantity: 90,
      minOrderQuantity: 1,
      weightKg: 90,
      harvestDate: new Date(Date.now() - 11 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Fresh Malai Paneer (Hand Pressed).jpg",
      aiGrade: "Grade A+",
      aiFreshnessScore: 97,
      shelfLifeDays: 4,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 112,
      description: "Soft hand-pressed paneer made each morning from full-cream A2 milk."
    },
    {
      id: "prod-126",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "White Butter (Safed Makhan)",
      category: "dairy",
      subCategory: "Butter",
      price: 480,
      mandiPrice: 700,
      retailPrice: 860,
      unit: "kg",
      stockQuantity: 60,
      minOrderQuantity: 1,
      weightKg: 60,
      harvestDate: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+",
      aiFreshnessScore: 96,
      shelfLifeDays: 7,
      isOrganic: true,
      rating: 4.7,
      reviewCount: 68,
      description: "Traditional cultured white butter churned from malai, unsalted."
    },
    {
      id: "prod-127",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Murrah Buffalo Full-Cream Milk",
      category: "dairy",
      subCategory: "Buffalo Milk",
      price: 64,
      mandiPrice: 94,
      retailPrice: 115,
      unit: "litre",
      stockQuantity: 500,
      minOrderQuantity: 1,
      weightKg: 500,
      harvestDate: new Date(Date.now() - 13 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Murrah Buffalo Full-Cream Milk.jpg",
      aiGrade: "Grade A+ (6.5% Fat)",
      aiFreshnessScore: 98,
      shelfLifeDays: 2,
      isOrganic: false,
      rating: 4.8,
      reviewCount: 156,
      description: "High-fat Murrah buffalo milk, chilled to 4°C within an hour of milking."
    },
    {
      id: "prod-128",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Farmhouse Sweet Lassi (Bottled)",
      category: "dairy",
      subCategory: "Lassi",
      price: 55,
      mandiPrice: 82,
      retailPrice: 100,
      unit: "litre",
      stockQuantity: 140,
      minOrderQuantity: 1,
      weightKg: 140,
      harvestDate: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Farmhouse-Sweet-Lassi-Bottled.jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 3,
      isOrganic: false,
      rating: 4.4,
      reviewCount: 39,
      description: "Churned sweet lassi bottled fresh daily with no added preservatives."
    },
    {
      id: "prod-129",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Aged Farmstead Cheddar (6-Month Cave)",
      category: "dairy",
      subCategory: "Cheese",
      price: 690,
      mandiPrice: 980,
      retailPrice: 1200,
      unit: "kg",
      stockQuantity: 45,
      minOrderQuantity: 1,
      weightKg: 45,
      harvestDate: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Aged-Farmstead-Cheddar-6-Month-Cave.png",
      aiGrade: "Grade A+ (Aged)",
      aiFreshnessScore: 97,
      shelfLifeDays: 90,
      isOrganic: false,
      rating: 4.6,
      reviewCount: 52,
      description: "Six-month cave-aged cheddar from grass-fed indigenous cow milk."
    },
    {
      id: "prod-130",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Stone-Ground Sharbati Wheat Atta",
      category: "grains",
      subCategory: "Wheat Flour",
      price: 52,
      mandiPrice: 78,
      retailPrice: 95,
      unit: "kg",
      stockQuantity: 800,
      minOrderQuantity: 1,
      weightKg: 800,
      harvestDate: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Stone-Ground Sharbati Wheat Atta.jpg",
      aiGrade: "Grade A+ (Chakki Fresh)",
      aiFreshnessScore: 97,
      shelfLifeDays: 60,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 204,
      description: "Chakki stone-ground Sharbati atta, milled to order to retain bran oils."
    },
    {
      id: "prod-131",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Siridhanya Finger Millet (Ragi Whole)",
      category: "grains",
      subCategory: "Ragi",
      price: 68,
      mandiPrice: 98,
      retailPrice: 120,
      unit: "kg",
      stockQuantity: 420,
      minOrderQuantity: 1,
      weightKg: 420,
      harvestDate: new Date(Date.now() - 17 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Siridhanya Finger Millet (Ragi Whole).jpg",
      aiGrade: "Grade A+ (Organic)",
      aiFreshnessScore: 96,
      shelfLifeDays: 180,
      isOrganic: true,
      rating: 4.7,
      reviewCount: 88,
      description: "Whole organic ragi rich in calcium, sun-dried and stone-cleaned."
    },
    {
      id: "prod-132",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Foxtail Millet (Navane, Polished-Free)",
      category: "grains",
      subCategory: "Foxtail Millet",
      price: 96,
      mandiPrice: 140,
      retailPrice: 172,
      unit: "kg",
      stockQuantity: 280,
      minOrderQuantity: 1,
      weightKg: 280,
      harvestDate: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Foxtail Millet (Navane, Polished-Free).jpg",
      aiGrade: "Grade A+ (Unpolished)",
      aiFreshnessScore: 96,
      shelfLifeDays: 180,
      isOrganic: true,
      rating: 4.6,
      reviewCount: 61,
      description: "Unpolished foxtail millet retaining full fibre and mineral content."
    },
    {
      id: "prod-133",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Desi Chana Whole Black Gram",
      category: "grains",
      subCategory: "Pulses",
      price: 88,
      mandiPrice: 128,
      retailPrice: 158,
      unit: "kg",
      stockQuantity: 560,
      minOrderQuantity: 1,
      weightKg: 560,
      harvestDate: new Date(Date.now() - 19 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Desi Chana Whole Black Gram.jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 240,
      isOrganic: true,
      rating: 4.5,
      reviewCount: 77,
      description: "Naturally grown desi chana, machine-cleaned and hand-sorted."
    },
    {
      id: "prod-134",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Toor Dal (Arhar, Unpolished Mill Fresh)",
      category: "grains",
      subCategory: "Pulses",
      price: 132,
      mandiPrice: 192,
      retailPrice: 235,
      unit: "kg",
      stockQuantity: 640,
      minOrderQuantity: 1,
      weightKg: 640,
      harvestDate: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Toor Dal (Arhar, Unpolished Mill Fresh).jpg",
      aiGrade: "Grade A+",
      aiFreshnessScore: 96,
      shelfLifeDays: 210,
      isOrganic: false,
      rating: 4.7,
      reviewCount: 131,
      description: "Mill-fresh unpolished toor dal with no artificial polishing agents."
    },
    {
      id: "prod-135",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Cold-Pressed Groundnut Oil (Wood Ghani)",
      category: "grains",
      subCategory: "Edible Oil",
      price: 285,
      mandiPrice: 410,
      retailPrice: 505,
      unit: "litre",
      stockQuantity: 220,
      minOrderQuantity: 1,
      weightKg: 220,
      harvestDate: new Date(Date.now() - 21 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Wood Pressed)",
      aiFreshnessScore: 98,
      shelfLifeDays: 180,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 167,
      description: "Wood-ghani cold-pressed groundnut oil, unrefined and filter-settled."
    },
    {
      id: "prod-136",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Organic Jowar (Sorghum Whole Grain)",
      category: "grains",
      subCategory: "Jowar",
      price: 62,
      mandiPrice: 92,
      retailPrice: 112,
      unit: "kg",
      stockQuantity: 480,
      minOrderQuantity: 1,
      weightKg: 480,
      harvestDate: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Organic Jowar (Sorghum Whole Grain).jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 200,
      isOrganic: true,
      rating: 4.5,
      reviewCount: 54,
      description: "Whole white jowar for rotis and porridge, sun-dried on farm floors."
    },
    {
      id: "prod-137",
      farmerId: "farmer-anthony-103",
      farmerName: "J. Anthony Sebastian",
      farmerLocation: "Thoothukudi, Tamil Nadu",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Blue Swimmer Crab (Live Catch)",
      category: "seafood",
      subCategory: "Crab",
      price: 520,
      mandiPrice: 760,
      retailPrice: 930,
      unit: "kg",
      stockQuantity: 80,
      minOrderQuantity: 1,
      weightKg: 80,
      harvestDate: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Blue Swimmer Crab (Live Catch).jpg",
      aiGrade: "Grade A+ (Live)",
      aiFreshnessScore: 98,
      shelfLifeDays: 2,
      isOrganic: false,
      rating: 4.8,
      reviewCount: 73,
      description: "Live blue swimmer crabs landed at Tuticorin jetty and packed in seawater ice."
    },
    {
      id: "prod-138",
      farmerId: "farmer-suresh-106",
      farmerName: "Suresh Nair",
      farmerLocation: "Ernakulam, Kerala",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Fresh Squid Rings (Cleaned & Deveined)",
      category: "seafood",
      subCategory: "Squid",
      price: 420,
      mandiPrice: 610,
      retailPrice: 750,
      unit: "kg",
      stockQuantity: 110,
      minOrderQuantity: 1,
      weightKg: 110,
      harvestDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Fresh Squid Rings (Cleaned & Deveined).jpg",
      aiGrade: "Grade A+",
      aiFreshnessScore: 97,
      shelfLifeDays: 3,
      isOrganic: false,
      rating: 4.6,
      reviewCount: 58,
      description: "Cleaned deveined squid tubes and rings, IQF-ready within four hours."
    },
    {
      id: "prod-139",
      farmerId: "farmer-anthony-103",
      farmerName: "J. Anthony Sebastian",
      farmerLocation: "Thoothukudi, Tamil Nadu",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Kerala Oil Sardine (Mathi, Boat Fresh)",
      category: "seafood",
      subCategory: "Sardine",
      price: 180,
      mandiPrice: 265,
      retailPrice: 325,
      unit: "kg",
      stockQuantity: 240,
      minOrderQuantity: 1,
      weightKg: 240,
      harvestDate: new Date(Date.now() - 25 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 2,
      isOrganic: false,
      rating: 4.4,
      reviewCount: 92,
      description: "Omega-rich oil sardines straight off traditional Kerala boats."
    },
    {
      id: "prod-140",
      farmerId: "farmer-suresh-106",
      farmerName: "Suresh Nair",
      farmerLocation: "Ernakulam, Kerala",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Yellowfin Tuna Loin (Sashimi Cut)",
      category: "seafood",
      subCategory: "Tuna",
      price: 880,
      mandiPrice: 1280,
      retailPrice: 1560,
      unit: "kg",
      stockQuantity: 60,
      minOrderQuantity: 1,
      weightKg: 60,
      harvestDate: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Yellowfin Tuna Loin (Sashimi Cut).jpg",
      aiGrade: "Grade A+ (Sashimi)",
      aiFreshnessScore: 99,
      shelfLifeDays: 3,
      isOrganic: false,
      rating: 4.9,
      reviewCount: 64,
      description: "Hand-cut sashimi-grade yellowfin loins, blast-chilled on the vessel."
    },
    {
      id: "prod-141",
      farmerId: "farmer-anthony-103",
      farmerName: "J. Anthony Sebastian",
      farmerLocation: "Thoothukudi, Tamil Nadu",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Indian Mackerel (Bangda, Ice Packed)",
      category: "seafood",
      subCategory: "Mackerel",
      price: 240,
      mandiPrice: 350,
      retailPrice: 430,
      unit: "kg",
      stockQuantity: 190,
      minOrderQuantity: 1,
      weightKg: 190,
      harvestDate: new Date(Date.now() - 27 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Indian Mackerel (Bangda, Ice Packed).jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 96,
      shelfLifeDays: 2,
      isOrganic: false,
      rating: 4.5,
      reviewCount: 81,
      description: "Firm-fleshed bangda packed in flake ice immediately after landing."
    },
    {
      id: "prod-142",
      farmerId: "farmer-suresh-106",
      farmerName: "Suresh Nair",
      farmerLocation: "Ernakulam, Kerala",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Wild Seer Fish Steaks (Surmai)",
      category: "seafood",
      subCategory: "Seer Fish",
      price: 720,
      mandiPrice: 1050,
      retailPrice: 1290,
      unit: "kg",
      stockQuantity: 95,
      minOrderQuantity: 1,
      weightKg: 95,
      harvestDate: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Wild Seer Fish Steaks (Surmai).jpg",
      aiGrade: "Grade A+",
      aiFreshnessScore: 98,
      shelfLifeDays: 3,
      isOrganic: false,
      rating: 4.8,
      reviewCount: 103,
      description: "Thick-cut wild surmai steaks from deep-sea longline catch."
    },
    {
      id: "prod-143",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Free-Range Country Chicken Eggs (Brown)",
      category: "poultry",
      subCategory: "Eggs",
      price: 12,
      mandiPrice: 18,
      retailPrice: 22,
      unit: "piece",
      stockQuantity: 1200,
      minOrderQuantity: 1,
      weightKg: 1200,
      harvestDate: new Date(Date.now() - 29 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Free-Range-Country-Chicken-Eggs-Brown.jpg",
      aiGrade: "Grade A+ (Free Range)",
      aiFreshnessScore: 98,
      shelfLifeDays: 21,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 218,
      description: "Free-range brown eggs from hens foraging on open pasture."
    },
    {
      id: "prod-144",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Kadaknath Black Chicken Eggs",
      category: "poultry",
      subCategory: "Eggs",
      price: 28,
      mandiPrice: 42,
      retailPrice: 52,
      unit: "piece",
      stockQuantity: 400,
      minOrderQuantity: 1,
      weightKg: 400,
      harvestDate: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Kadaknath Black Chicken Eggs.jpg",
      aiGrade: "Grade A+ (Heritage)",
      aiFreshnessScore: 97,
      shelfLifeDays: 18,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 86,
      description: "Rare Kadaknath eggs, prized for high protein and low cholesterol."
    },
    {
      id: "prod-145",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Farm Duck Eggs (Pasture Raised)",
      category: "poultry",
      subCategory: "Eggs",
      price: 18,
      mandiPrice: 27,
      retailPrice: 34,
      unit: "piece",
      stockQuantity: 520,
      minOrderQuantity: 1,
      weightKg: 520,
      harvestDate: new Date(Date.now() - 31 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 96,
      shelfLifeDays: 20,
      isOrganic: true,
      rating: 4.6,
      reviewCount: 54,
      description: "Large pasture-raised duck eggs with rich golden yolks."
    },
    {
      id: "prod-146",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Quail Eggs (Bater, Tray of Farm Fresh)",
      category: "poultry",
      subCategory: "Eggs",
      price: 6,
      mandiPrice: 9,
      retailPrice: 12,
      unit: "piece",
      stockQuantity: 1500,
      minOrderQuantity: 1,
      weightKg: 1500,
      harvestDate: new Date(Date.now() - 32 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1569127959161-2b1297b2d9a6?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A",
      aiFreshnessScore: 95,
      shelfLifeDays: 15,
      isOrganic: false,
      rating: 4.4,
      reviewCount: 47,
      description: "Delicate quail eggs collected daily from small-batch aviaries."
    },
    {
      id: "prod-147",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Country Chicken (Naati Koli, Whole Dressed)",
      category: "poultry",
      subCategory: "Chicken",
      price: 380,
      mandiPrice: 550,
      retailPrice: 680,
      unit: "kg",
      stockQuantity: 130,
      minOrderQuantity: 1,
      weightKg: 130,
      harvestDate: new Date(Date.now() - 33 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Country Chicken (Naati Koli, Whole Dressed).jpg",
      aiGrade: "Grade A+ (Free Range)",
      aiFreshnessScore: 97,
      shelfLifeDays: 3,
      isOrganic: true,
      rating: 4.8,
      reviewCount: 139,
      description: "Slow-grown naati koli, antibiotic-free and dressed to order."
    },
    {
      id: "prod-148",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Kadaknath Whole Chicken (Heritage Breed)",
      category: "poultry",
      subCategory: "Chicken",
      price: 780,
      mandiPrice: 1120,
      retailPrice: 1380,
      unit: "kg",
      stockQuantity: 55,
      minOrderQuantity: 1,
      weightKg: 55,
      harvestDate: new Date(Date.now() - 34 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Heritage)",
      aiFreshnessScore: 98,
      shelfLifeDays: 3,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 72,
      description: "Pure Kadaknath black meat chicken raised on traditional feed."
    },
    {
      id: "prod-149",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Broiler Chicken (Antibiotic-Residue Free)",
      category: "poultry",
      subCategory: "Chicken",
      price: 210,
      mandiPrice: 310,
      retailPrice: 385,
      unit: "kg",
      stockQuantity: 340,
      minOrderQuantity: 1,
      weightKg: 340,
      harvestDate: new Date(Date.now() - 35 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Broiler Chicken (Antibiotic-Residue Free).jpg",
      aiGrade: "Grade A",
      aiFreshnessScore: 94,
      shelfLifeDays: 3,
      isOrganic: false,
      rating: 4.3,
      reviewCount: 118,
      description: "Residue-tested broiler chicken, chilled and vacuum packed."
    },
    {
      id: "prod-150",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Raw Forest Honey (Single Origin, Unfiltered)",
      category: "poultry",
      subCategory: "Honey",
      price: 620,
      mandiPrice: 900,
      retailPrice: 1105,
      unit: "kg",
      stockQuantity: 95,
      minOrderQuantity: 1,
      weightKg: 95,
      harvestDate: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Raw)",
      aiFreshnessScore: 98,
      shelfLifeDays: 720,
      isOrganic: true,
      rating: 4.9,
      reviewCount: 186,
      description: "Unheated unfiltered forest honey from wild Apis dorsata combs."
    }
  
  ],

  // 4. Bulk Products (> 50 kg Lots for Wholesale & Cooperative Consignments)
  bulkProducts: [
    {
      id: "bulk-201",
      lotId: "LOT-TOM-2026-NASHIK",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Pimpalgaon APMC Belt, Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Commercial Grade-A+ Vine-Ripened Hybrid Tomatoes (Field Harvest Lot)",
      category: "vegetables",
      subCategory: "Tomato Bulk",
      bulkPrice: 18,
      mandiWholesalePrice: 28,
      pricePerUnitDisplay: "₹1,800 / Quintal (₹18/kg)",
      mandiPriceDisplay: "₹2,800 / Quintal (₹28/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 1800,
      mandiPrice: 2800,
      pricePerKg: 18,
      stockQuantity: 50,
      weightKg: 5000,
      stockDisplay: "50 Quintals (5 Metric Tonnes)",
      minOrderQuantity: 5,
      moqDisplay: "5 Quintals (500 kg)",
      packagingType: "25kg Heavy Duty Ventilated Farm Crates",
      coldChainReq: "Reefer Ambient / 12°C - 15°C Cool Freight",
      harvestDate: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Export Grade A+ (Brix 5.2°, Firmness 98%)",
      aiFreshnessScore: 98,
      shelfLifeDays: 14,
      volumeTiers: [
        { tier: "5 - 15 Quintals (0.5 - 1.5 MT)", discount: "Standard Wholesale", price: "₹1,800/Qtl" },
        { tier: "16 - 30 Quintals (1.6 - 3 MT)", discount: "5% Direct FPO Rebate", price: "₹1,710/Qtl" },
        { tier: "> 30 Quintals (Full Truckload >3 MT)", discount: "10% Truckload Incentive", price: "₹1,620/Qtl" }
      ],
      description: "Direct farm-gate harvest pooled through Sahyadri Cooperative. 100% sorted, washed, and packed in uniform crates."
    },
    {
      id: "bulk-202",
      lotId: "LOT-ONION-2026-LASALGAON",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Lasalgaon Mandi Basin, Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "sold",
      title: "Export-Spec Nashik Red Onions (Sun-Cured 45-55mm Mesh Bags)",
      category: "vegetables",
      subCategory: "Onion Bulk",
      bulkPrice: 16,
      mandiWholesalePrice: 25,
      pricePerUnitDisplay: "₹1,600 / Quintal (₹16/kg)",
      mandiPriceDisplay: "₹2,500 / Quintal (₹25/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 1600,
      mandiPrice: 2500,
      pricePerKg: 16,
      stockQuantity: 0,
      weightKg: 20000,
      stockDisplay: "200 Quintals (Sold Out to Supermarket Chain)",
      minOrderQuantity: 10,
      moqDisplay: "10 Quintals (1 Metric Tonne)",
      packagingType: "50kg Breathable Leno Red Mesh Bags",
      coldChainReq: "Dry Ventilated Covered Freight",
      harvestDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A Export (Dry Skin Uniformity 99%)",
      aiFreshnessScore: 97,
      shelfLifeDays: 60,
      volumeTiers: [
        { tier: "10 - 50 Quintals (1 - 5 MT)", discount: "Standard Wholesale", price: "₹1,600/Qtl" },
        { tier: "51 - 100 Quintals (5 - 10 MT)", discount: "6% Volume Incentive", price: "₹1,504/Qtl" },
        { tier: "> 100 Quintals (Multi-Axle Truck >10 MT)", discount: "12% Mega-Procurement", price: "₹1,408/Qtl" }
      ],
      description: "Sun-cured, double-skin Nashik red onions. 200 Quintal bulk lot successfully contracted and dispatched via Sahyadri Co-op."
    },
    {
      id: "bulk-203",
      lotId: "LOT-MILK-2026-KARNAL",
      farmerId: "farmer-sunita-102",
      farmerName: "Sunita Devi Sharma",
      farmerLocation: "GT Road Dairy Belt, Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Chilled Pure A2 Gir Cow Raw Milk (Bulk Insulated Tanker & 50L Casks)",
      category: "dairy",
      subCategory: "Milk Bulk",
      bulkPrice: 54,
      mandiWholesalePrice: 72,
      pricePerUnitDisplay: "₹54 / Liter (₹2,700 / 50L Cask)",
      mandiPriceDisplay: "₹72 / Liter (₹3,600 / 50L Cask)",
      unit: "50L Cask",
      unitSizeKg: 50,
      price: 2700,
      mandiPrice: 3600,
      pricePerKg: 54,
      stockQuantity: 60,
      weightKg: 3000,
      stockDisplay: "3,000 Liters (60 Casks / Tanker Ready)",
      minOrderQuantity: 4,
      moqDisplay: "4 Casks (200 Liters)",
      packagingType: "Food-Grade SS-304 Insulated 50L Hermetic Casks",
      coldChainReq: "Strict 3.8°C Cold-Chain Tanker / Reefer Freight",
      harvestDate: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&auto=format&fit=crop&q=80",
      aiGrade: "A2 Purity Certified (SNF 8.9%, Fat 4.6%)",
      aiFreshnessScore: 100,
      shelfLifeDays: 4,
      volumeTiers: [
        { tier: "200 - 500 Liters", discount: "Direct Dairy Rate", price: "₹54/L" },
        { tier: "501 - 1,500 Liters", discount: "7% Bulk Dairy Rebate", price: "₹50.2/L" },
        { tier: "> 1,500 Liters (Tanker Dispatch)", discount: "15% Institutional Contract", price: "₹45.9/L" }
      ],
      description: "Tested batch of antibiotic-free, untouched A2 cow milk chilled to 4°C immediately after machine milking via Karnal Dairy Union."
    },
    {
      id: "bulk-204",
      lotId: "LOT-FISH-2026-TUTICORIN",
      farmerId: "farmer-fisher-103",
      farmerName: "Anthony Murugan",
      farmerLocation: "Deep Sea Harbor Jetty 4, Tuticorin, Tamil Nadu",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Deep-Sea Silver Pomfret (Flash-Frozen Insulated Export Crates)",
      category: "seafood",
      subCategory: "Seafood Bulk",
      bulkPrice: 380,
      mandiWholesalePrice: 560,
      pricePerUnitDisplay: "₹9,500 / 25kg Crate (₹380/kg)",
      mandiPriceDisplay: "₹14,000 / 25kg Crate (₹560/kg)",
      unit: "25kg Crate",
      unitSizeKg: 25,
      price: 9500,
      mandiPrice: 14000,
      pricePerKg: 380,
      stockQuantity: 40,
      weightKg: 1000,
      stockDisplay: "1,000 kg (40 Marine Ice Crates)",
      minOrderQuantity: 4,
      moqDisplay: "4 Crates (100 kg)",
      packagingType: "Heavy Thermal EPS Casks with Dry Gel Ice",
      coldChainReq: "Sub-Zero -18°C Flash Freeze Reefer Transit",
      harvestDate: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Deep-Sea-Silver-Pomfret-Flash-Frozen-Insulated-Export-Crates.jpg",
      aiGrade: "Grade A+ Marine (Slurry Chilled Core 0°C)",
      aiFreshnessScore: 99,
      shelfLifeDays: 10,
      volumeTiers: [
        { tier: "100 - 250 kg (4 - 10 Crates)", discount: "Standard Wholesale", price: "₹380/kg" },
        { tier: "251 - 500 kg (11 - 20 Crates)", discount: "8% Coastal Direct Rebate", price: "₹349/kg" },
        { tier: "> 500 kg (Full Container)", discount: "15% Institutional Marine Contract", price: "₹323/kg" }
      ],
      description: "Direct boat-landing prime silver pomfret (300-500g grade) flash frozen in cooperative cold storage facilities."
    },
    {
      id: "bulk-205",
      lotId: "LOT-MANGO-2026-KONKAN",
      farmerId: "farmer-mahesh-108",
      farmerName: "Mahesh Sawant",
      farmerLocation: "Devgad Coastal Belt, Maharashtra",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "GI-Tagged Ratnagiri Alphonso Mangoes (Palletized Master Crates)",
      category: "fruits",
      subCategory: "Mango Bulk",
      bulkPrice: 480,
      mandiWholesalePrice: 750,
      pricePerUnitDisplay: "₹480 / Dozen (₹2,400 / 5-Dozen Master Crate)",
      mandiPriceDisplay: "₹750 / Dozen (₹3,750 / 5-Dozen Master Crate)",
      unit: "5-Dozen Crate",
      unitSizeKg: 15,
      price: 2400,
      mandiPrice: 3750,
      pricePerKg: 480,
      stockQuantity: 120,
      weightKg: 1800,
      stockDisplay: "120 Master Crates (600 Dozen / 1.8 MT)",
      minOrderQuantity: 5,
      moqDisplay: "5 Crates (25 Dozen)",
      packagingType: "Cushioned Wooden Export Crates with Paddy Straw",
      coldChainReq: "Air-Conditioned 16°C Ripening Logistics",
      harvestDate: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80",
      aiGrade: "GI Certified Grade A+ (Brix 20.5°)",
      aiFreshnessScore: 100,
      shelfLifeDays: 16,
      volumeTiers: [
        { tier: "5 - 15 Crates", discount: "Wholesale Harvest Rate", price: "₹480/Doz" },
        { tier: "16 - 40 Crates", discount: "8% Direct Orchard Discount", price: "₹441/Doz" },
        { tier: "> 40 Crates", discount: "16% Bulk Export Tier", price: "₹403/Doz" }
      ],
      description: "Authentic carbide-free GI-tagged Devgad Alphonso. Sorted and certified through Konkan Agro Cooperative Society."
    },
    {
      id: "bulk-206",
      lotId: "LOT-GRAIN-2026-TARAORI",
      farmerId: "farmer-jaswant-106",
      farmerName: "Sardar Jaswant Singh",
      farmerLocation: "Taraori, Karnal, Haryana",
      societyId: null,
      societyName: null,
      sellingChannel: "direct",
      saleStatus: "available",
      title: "Direct Farmer Silo Basmati Rice (500kg Bulk Pallets - Farmer Direct)",
      category: "grains",
      subCategory: "Rice Bulk",
      bulkPrice: 85,
      mandiWholesalePrice: 120,
      pricePerUnitDisplay: "₹8,500 / Quintal (₹85/kg)",
      mandiPriceDisplay: "₹12,000 / Quintal (₹120/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 8500,
      mandiPrice: 12000,
      pricePerKg: 85,
      stockQuantity: 30,
      weightKg: 3000,
      stockDisplay: "30 Quintals (3 Metric Tonnes)",
      minOrderQuantity: 5,
      moqDisplay: "5 Quintals (500 kg)",
      packagingType: "50kg Jute Hessian Bags",
      coldChainReq: "Dry Moisture-Controlled Transit",
      harvestDate: new Date(Date.now() - 120 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A Extra Long Grain",
      aiFreshnessScore: 100,
      shelfLifeDays: 730,
      volumeTiers: [
        { tier: "5 - 10 Quintals", discount: "Direct Farm Rate", price: "₹8,500/Qtl" },
        { tier: "> 10 Quintals", discount: "7% Bulk Discount", price: "₹7,905/Qtl" }
      ],
      description: "Direct sale without cooperative society by Jaswant Singh (>50 kg bulk lot sold directly from farm gate)."
    },

    // ===== Expanded bulk catalogue (v7) =====
    {
      id: "bulk-207",
      lotId: "LOT-POTATO-2026-NASHIK",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      farmerLocation: "Nashik, Maharashtra",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Table-Grade Kufri Jyoti Potatoes (Cured Bulk Lot)",
      category: "vegetables",
      subCategory: "Potato Bulk",
      bulkPrice: 19,
      mandiWholesalePrice: 29,
      pricePerUnitDisplay: "₹1,900 / Quintal (₹19/kg)",
      mandiPriceDisplay: "₹2,900 / Quintal (₹29/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 1900,
      mandiPrice: 2900,
      pricePerKg: 19,
      stockQuantity: 180,
      weightKg: 18000,
      stockDisplay: "180 Quintals (18.0 Metric Tonnes)",
      minOrderQuantity: 10,
      moqDisplay: "10 Quintals (1000 kg)",
      packagingType: "50kg Jute Sacks, Field Cured",
      coldChainReq: "Dry Ventilated Covered Freight",
      harvestDate: new Date(Date.now() - 15 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A Table (Cured, <2% Defect)",
      aiFreshnessScore: 96,
      shelfLifeDays: 90,
      volumeTiers: [
        { tier: "10 - 50 Quintals", discount: "Standard Wholesale", price: "₹1,900/Qtl" },
        { tier: "51 - 120 Quintals", discount: "6% Volume Incentive", price: "₹1,786/Qtl" },
        { tier: "> 120 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹1,672/Qtl" }
      ],
      description: "Field-cured Kufri Jyoti potatoes graded 45-75mm, pooled for retail chains."
    },
    {
      id: "bulk-208",
      lotId: "LOT-CAPS-2026-KOLAR",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Polyhouse Coloured Capsicum (Red/Yellow Mixed Pallets)",
      category: "vegetables",
      subCategory: "Capsicum Bulk",
      bulkPrice: 62,
      mandiWholesalePrice: 94,
      pricePerUnitDisplay: "₹6,200 / Quintal (₹62/kg)",
      mandiPriceDisplay: "₹9,400 / Quintal (₹94/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 6200,
      mandiPrice: 9400,
      pricePerKg: 62,
      stockQuantity: 45,
      weightKg: 4500,
      stockDisplay: "45 Quintals (4.5 Metric Tonnes)",
      minOrderQuantity: 3,
      moqDisplay: "3 Quintals (300 kg)",
      packagingType: "5kg Corrugated Fibreboard Trays",
      coldChainReq: "Reefer Chilled 8°C - 10°C",
      harvestDate: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Export (Uniform 180-220g)",
      aiFreshnessScore: 96,
      shelfLifeDays: 21,
      volumeTiers: [
        { tier: "3 - 15 Quintals", discount: "Standard Wholesale", price: "₹6,200/Qtl" },
        { tier: "16 - 36 Quintals", discount: "6% Volume Incentive", price: "₹5,828/Qtl" },
        { tier: "> 36 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹5,456/Qtl" }
      ],
      description: "Polyhouse-grown coloured capsicum on pallets for hotels and modern trade."
    },
    {
      id: "bulk-209",
      lotId: "LOT-CARROT-2026-OOTY",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Ooty Highland Carrots (Washed Bulk Consignment)",
      category: "vegetables",
      subCategory: "Carrot Bulk",
      bulkPrice: 23,
      mandiWholesalePrice: 36,
      pricePerUnitDisplay: "₹2,300 / Quintal (₹23/kg)",
      mandiPriceDisplay: "₹3,600 / Quintal (₹36/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 2300,
      mandiPrice: 3600,
      pricePerKg: 23,
      stockQuantity: 120,
      weightKg: 12000,
      stockDisplay: "120 Quintals (12.0 Metric Tonnes)",
      minOrderQuantity: 5,
      moqDisplay: "5 Quintals (500 kg)",
      packagingType: "25kg Ventilated Plastic Crates",
      coldChainReq: "Reefer Chilled 2°C - 5°C",
      harvestDate: new Date(Date.now() - 17 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Brix 8.4°)",
      aiFreshnessScore: 96,
      shelfLifeDays: 35,
      volumeTiers: [
        { tier: "5 - 25 Quintals", discount: "Standard Wholesale", price: "₹2,300/Qtl" },
        { tier: "26 - 60 Quintals", discount: "6% Volume Incentive", price: "₹2,162/Qtl" },
        { tier: "> 60 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹2,024/Qtl" }
      ],
      description: "High-altitude washed carrots with uniform taper, cold-chained end to end."
    },
    {
      id: "bulk-210",
      lotId: "LOT-POM-2026-SOLAPUR",
      farmerId: "farmer-rajesh-104",
      farmerName: "Rajesh S. Sawant",
      farmerLocation: "Ratnagiri, Maharashtra",
      societyId: "coop-konkan-04",
      societyName: "Konkan Agro & Horticulture Producer Cooperative Society",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Bhagwa Pomegranate Export Pallets (Count 8-12)",
      category: "fruits",
      subCategory: "Pomegranate Bulk",
      bulkPrice: 112,
      mandiWholesalePrice: 168,
      pricePerUnitDisplay: "₹11,200 / Quintal (₹112/kg)",
      mandiPriceDisplay: "₹16,800 / Quintal (₹168/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 11200,
      mandiPrice: 16800,
      pricePerKg: 112,
      stockQuantity: 60,
      weightKg: 6000,
      stockDisplay: "60 Quintals (6.0 Metric Tonnes)",
      minOrderQuantity: 4,
      moqDisplay: "4 Quintals (400 kg)",
      packagingType: "4kg Export Cartons with Foam Nets",
      coldChainReq: "Reefer Chilled 5°C + CA Storage",
      harvestDate: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Bhagwa Pomegranate (Deep Ruby Arils).jpg",
      aiGrade: "Export Grade A+ (Brix 16°)",
      aiFreshnessScore: 96,
      shelfLifeDays: 45,
      volumeTiers: [
        { tier: "4 - 20 Quintals", discount: "Standard Wholesale", price: "₹11,200/Qtl" },
        { tier: "21 - 48 Quintals", discount: "6% Volume Incentive", price: "₹10,528/Qtl" },
        { tier: "> 48 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹9,856/Qtl" }
      ],
      description: "APEDA-compliant Bhagwa pomegranate pallets, residue tested for EU export."
    },
    {
      id: "bulk-211",
      lotId: "LOT-BANANA-2026-KERALA",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nendran Banana Bulk Bunches (Carbide-Free Ripening)",
      category: "fruits",
      subCategory: "Banana Bulk",
      bulkPrice: 44,
      mandiWholesalePrice: 68,
      pricePerUnitDisplay: "₹4,400 / Quintal (₹44/kg)",
      mandiPriceDisplay: "₹6,800 / Quintal (₹68/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 4400,
      mandiPrice: 6800,
      pricePerKg: 44,
      stockQuantity: 95,
      weightKg: 9500,
      stockDisplay: "95 Quintals (9.5 Metric Tonnes)",
      minOrderQuantity: 5,
      moqDisplay: "5 Quintals (500 kg)",
      packagingType: "20kg Ventilated Banana Cartons",
      coldChainReq: "Reefer Ambient 13°C - 15°C",
      harvestDate: new Date(Date.now() - 19 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Nendran Banana (Kerala Highland).jpeg",
      aiGrade: "Grade A (Hand-Cut Bunches)",
      aiFreshnessScore: 96,
      shelfLifeDays: 14,
      volumeTiers: [
        { tier: "5 - 25 Quintals", discount: "Standard Wholesale", price: "₹4,400/Qtl" },
        { tier: "26 - 60 Quintals", discount: "6% Volume Incentive", price: "₹4,136/Qtl" },
        { tier: "> 60 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹3,872/Qtl" }
      ],
      description: "Highland Nendran bunches ripened in ethylene chambers, zero carbide."
    },
    {
      id: "bulk-212",
      lotId: "LOT-ORANGE-2026-NAGPUR",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Nagpur Santra Mandarin Bulk Lot (Juice & Table Grade)",
      category: "fruits",
      subCategory: "Orange Bulk",
      bulkPrice: 52,
      mandiWholesalePrice: 78,
      pricePerUnitDisplay: "₹5,200 / Quintal (₹52/kg)",
      mandiPriceDisplay: "₹7,800 / Quintal (₹78/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 5200,
      mandiPrice: 7800,
      pricePerKg: 52,
      stockQuantity: 140,
      weightKg: 14000,
      stockDisplay: "140 Quintals (14.0 Metric Tonnes)",
      minOrderQuantity: 8,
      moqDisplay: "8 Quintals (800 kg)",
      packagingType: "25kg Wooden Crates with Liner",
      coldChainReq: "Reefer Chilled 6°C - 8°C",
      harvestDate: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Juice Recovery 48%)",
      aiFreshnessScore: 96,
      shelfLifeDays: 28,
      volumeTiers: [
        { tier: "8 - 40 Quintals", discount: "Standard Wholesale", price: "₹5,200/Qtl" },
        { tier: "41 - 96 Quintals", discount: "6% Volume Incentive", price: "₹4,888/Qtl" },
        { tier: "> 96 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹4,576/Qtl" }
      ],
      description: "Dual-purpose Nagpur mandarins for fresh retail and juice processing."
    },
    {
      id: "bulk-213",
      lotId: "LOT-PANEER-2026-KARNAL",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Bulk Malai Paneer Blocks (HoReCa Supply Contract)",
      category: "dairy",
      subCategory: "Paneer Bulk",
      bulkPrice: 295,
      mandiWholesalePrice: 430,
      pricePerUnitDisplay: "₹29,500 / Quintal (₹295/kg)",
      mandiPriceDisplay: "₹43,000 / Quintal (₹430/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 29500,
      mandiPrice: 43000,
      pricePerKg: 295,
      stockQuantity: 18,
      weightKg: 1800,
      stockDisplay: "18 Quintals (1.8 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "5kg Vacuum-Sealed Food-Grade Blocks",
      coldChainReq: "Deep Chill 0°C - 4°C",
      harvestDate: new Date(Date.now() - 21 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Fresh Malai Paneer (Hand Pressed).jpg",
      aiGrade: "Grade A+ (Fat 22%, Moisture 52%)",
      aiFreshnessScore: 96,
      shelfLifeDays: 12,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹29,500/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹27,730/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹25,960/Qtl" }
      ],
      description: "Daily-pressed paneer blocks for hotels, caterers and cloud kitchens."
    },
    {
      id: "bulk-214",
      lotId: "LOT-GHEE-2026-KARNAL",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Vedic Bilona Cow Ghee (Bulk Institutional Tins)",
      category: "dairy",
      subCategory: "Ghee Bulk",
      bulkPrice: 680,
      mandiWholesalePrice: 980,
      pricePerUnitDisplay: "₹68,000 / Quintal (₹680/kg)",
      mandiPriceDisplay: "₹98,000 / Quintal (₹980/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 68000,
      mandiPrice: 98000,
      pricePerKg: 680,
      stockQuantity: 25,
      weightKg: 2500,
      stockDisplay: "25 Quintals (2.5 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "15kg Food-Grade Tin Containers",
      coldChainReq: "Dry Ambient, Away from Sunlight",
      harvestDate: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Artisanal Vedic Bilona Cow Ghee (Glass Jar).jpg",
      aiGrade: "Grade A+ (Bilona Hand-Churned)",
      aiFreshnessScore: 96,
      shelfLifeDays: 365,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹68,000/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹63,920/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹59,840/Qtl" }
      ],
      description: "Hand-churned bilona ghee in institutional tins with batch traceability."
    },
    {
      id: "bulk-215",
      lotId: "LOT-RAGI-2026-KOLAR",
      farmerId: "farmer-vimala-107",
      farmerName: "Vimala Reddy",
      farmerLocation: "Kadapa, Andhra Pradesh",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Organic Finger Millet (Ragi) Bulk Procurement Lot",
      category: "grains",
      subCategory: "Ragi Bulk",
      bulkPrice: 56,
      mandiWholesalePrice: 84,
      pricePerUnitDisplay: "₹5,600 / Quintal (₹56/kg)",
      mandiPriceDisplay: "₹8,400 / Quintal (₹84/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 5600,
      mandiPrice: 8400,
      pricePerKg: 56,
      stockQuantity: 220,
      weightKg: 22000,
      stockDisplay: "220 Quintals (22.0 Metric Tonnes)",
      minOrderQuantity: 10,
      moqDisplay: "10 Quintals (1000 kg)",
      packagingType: "50kg Food-Grade PP Woven Sacks",
      coldChainReq: "Dry Ventilated Warehouse",
      harvestDate: new Date(Date.now() - 23 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1613758235402-745466bb7efe?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Organic (Moisture <12%)",
      aiFreshnessScore: 96,
      shelfLifeDays: 270,
      volumeTiers: [
        { tier: "10 - 50 Quintals", discount: "Standard Wholesale", price: "₹5,600/Qtl" },
        { tier: "51 - 120 Quintals", discount: "6% Volume Incentive", price: "₹5,264/Qtl" },
        { tier: "> 120 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹4,928/Qtl" }
      ],
      description: "Certified organic ragi for millet processors and government nutrition programmes."
    },
    {
      id: "bulk-216",
      lotId: "LOT-TOORDAL-2026-GULBARGA",
      farmerId: "farmer-harpal-102",
      farmerName: "Harpal Singh Cheema",
      farmerLocation: "Karnal, Haryana",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Unpolished Toor Dal Mill Lot (No Polishing Agents)",
      category: "grains",
      subCategory: "Pulses Bulk",
      bulkPrice: 112,
      mandiWholesalePrice: 164,
      pricePerUnitDisplay: "₹11,200 / Quintal (₹112/kg)",
      mandiPriceDisplay: "₹16,400 / Quintal (₹164/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 11200,
      mandiPrice: 16400,
      pricePerKg: 112,
      stockQuantity: 300,
      weightKg: 30000,
      stockDisplay: "300 Quintals (30.0 Metric Tonnes)",
      minOrderQuantity: 10,
      moqDisplay: "10 Quintals (1000 kg)",
      packagingType: "50kg Laminated PP Bags",
      coldChainReq: "Dry Ventilated Warehouse",
      harvestDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Toor Dal (Arhar, Unpolished Mill Fresh).jpg",
      aiGrade: "Grade A+ (Unpolished, Sortex Clean)",
      aiFreshnessScore: 96,
      shelfLifeDays: 300,
      volumeTiers: [
        { tier: "10 - 50 Quintals", discount: "Standard Wholesale", price: "₹11,200/Qtl" },
        { tier: "51 - 120 Quintals", discount: "6% Volume Incentive", price: "₹10,528/Qtl" },
        { tier: "> 120 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹9,856/Qtl" }
      ],
      description: "Sortex-cleaned unpolished toor dal direct from Gulbarga mill cluster."
    },
    {
      id: "bulk-217",
      lotId: "LOT-GNOIL-2026-GUJARAT",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Wood-Pressed Groundnut Oil (Bulk Institutional Drums)",
      category: "grains",
      subCategory: "Edible Oil Bulk",
      bulkPrice: 245,
      mandiWholesalePrice: 360,
      pricePerUnitDisplay: "₹24,500 / Quintal (₹245/kg)",
      mandiPriceDisplay: "₹36,000 / Quintal (₹360/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 24500,
      mandiPrice: 36000,
      pricePerKg: 245,
      stockQuantity: 40,
      weightKg: 4000,
      stockDisplay: "40 Quintals (4.0 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "15 Litre Food-Grade HDPE Drums",
      coldChainReq: "Dry Ambient, Dark Storage",
      harvestDate: new Date(Date.now() - 25 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ (Cold Pressed, FFA <1%)",
      aiFreshnessScore: 96,
      shelfLifeDays: 240,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹24,500/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹23,030/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹21,560/Qtl" }
      ],
      description: "Wood-ghani groundnut oil in bulk drums with cold-press batch certificates."
    },
    {
      id: "bulk-218",
      lotId: "LOT-PRAWN-2026-TUTICORIN",
      farmerId: "farmer-anthony-103",
      farmerName: "J. Anthony Sebastian",
      farmerLocation: "Thoothukudi, Tamil Nadu",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "IQF Jumbo Tiger Prawns (Head-On Export Blocks)",
      category: "seafood",
      subCategory: "Prawn Bulk",
      bulkPrice: 640,
      mandiWholesalePrice: 940,
      pricePerUnitDisplay: "₹64,000 / Quintal (₹640/kg)",
      mandiPriceDisplay: "₹94,000 / Quintal (₹940/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 64000,
      mandiPrice: 94000,
      pricePerKg: 640,
      stockQuantity: 32,
      weightKg: 3200,
      stockDisplay: "32 Quintals (3.2 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "10kg IQF Master Cartons",
      coldChainReq: "Deep Freeze -18°C to -25°C",
      harvestDate: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Export Grade A+ (Count 16/20)",
      aiFreshnessScore: 96,
      shelfLifeDays: 270,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹64,000/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹60,160/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹56,320/Qtl" }
      ],
      description: "Individually quick-frozen head-on tiger prawns, HACCP certified."
    },
    {
      id: "bulk-219",
      lotId: "LOT-SEER-2026-KOCHI",
      farmerId: "farmer-suresh-106",
      farmerName: "Suresh Nair",
      farmerLocation: "Ernakulam, Kerala",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Wild Seer Fish (Surmai) Bulk Steaks & Whole",
      category: "seafood",
      subCategory: "Seer Fish Bulk",
      bulkPrice: 590,
      mandiWholesalePrice: 870,
      pricePerUnitDisplay: "₹59,000 / Quintal (₹590/kg)",
      mandiPriceDisplay: "₹87,000 / Quintal (₹870/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 59000,
      mandiPrice: 87000,
      pricePerKg: 590,
      stockQuantity: 26,
      weightKg: 2600,
      stockDisplay: "26 Quintals (2.6 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "20kg Insulated Thermocol with Flake Ice",
      coldChainReq: "Deep Freeze -18°C",
      harvestDate: new Date(Date.now() - 27 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Wild Seer Fish Steaks (Surmai).jpg",
      aiGrade: "Grade A+ (Longline Wild Catch)",
      aiFreshnessScore: 96,
      shelfLifeDays: 180,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹59,000/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹55,460/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹51,920/Qtl" }
      ],
      description: "Longline-caught wild surmai, processed whole or steak-cut to order."
    },
    {
      id: "bulk-220",
      lotId: "LOT-SARDINE-2026-KERALA",
      farmerId: "farmer-suresh-106",
      farmerName: "Suresh Nair",
      farmerLocation: "Ernakulam, Kerala",
      societyId: "coop-tuticorin-03",
      societyName: "Gulf of Mannar Coastal Fishermen Cooperative Federation",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Kerala Oil Sardine Bulk Landing (Processing Grade)",
      category: "seafood",
      subCategory: "Sardine Bulk",
      bulkPrice: 145,
      mandiWholesalePrice: 218,
      pricePerUnitDisplay: "₹14,500 / Quintal (₹145/kg)",
      mandiPriceDisplay: "₹21,800 / Quintal (₹218/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 14500,
      mandiPrice: 21800,
      pricePerKg: 145,
      stockQuantity: 180,
      weightKg: 18000,
      stockDisplay: "180 Quintals (18.0 Metric Tonnes)",
      minOrderQuantity: 10,
      moqDisplay: "10 Quintals (1000 kg)",
      packagingType: "25kg Insulated Fish Tubs with Ice",
      coldChainReq: "Chilled 0°C - 2°C",
      harvestDate: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A (Omega-3 Rich)",
      aiFreshnessScore: 96,
      shelfLifeDays: 5,
      volumeTiers: [
        { tier: "10 - 50 Quintals", discount: "Standard Wholesale", price: "₹14,500/Qtl" },
        { tier: "51 - 120 Quintals", discount: "6% Volume Incentive", price: "₹13,630/Qtl" },
        { tier: "> 120 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹12,760/Qtl" }
      ],
      description: "High-volume oil sardine landings for canning and fishmeal processors."
    },
    {
      id: "bulk-221",
      lotId: "LOT-EGGS-2026-KOLAR",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Free-Range Brown Eggs (Bulk Tray Consignment)",
      category: "poultry",
      subCategory: "Eggs Bulk",
      bulkPrice: 9,
      mandiWholesalePrice: 14,
      pricePerUnitDisplay: "₹900 / Quintal (₹9/kg)",
      mandiPriceDisplay: "₹1,400 / Quintal (₹14/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 900,
      mandiPrice: 1400,
      pricePerKg: 9,
      stockQuantity: 150,
      weightKg: 15000,
      stockDisplay: "150 Quintals (15.0 Metric Tonnes)",
      minOrderQuantity: 5,
      moqDisplay: "5 Quintals (500 kg)",
      packagingType: "30-Egg Moulded Pulp Trays in Cartons",
      coldChainReq: "Cool Dry 15°C - 20°C",
      harvestDate: new Date(Date.now() - 29 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Free Range (55-62g)",
      aiFreshnessScore: 96,
      shelfLifeDays: 21,
      volumeTiers: [
        { tier: "5 - 25 Quintals", discount: "Standard Wholesale", price: "₹900/Qtl" },
        { tier: "26 - 60 Quintals", discount: "6% Volume Incentive", price: "₹846/Qtl" },
        { tier: "> 60 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹792/Qtl" }
      ],
      description: "Free-range brown eggs supplied in bulk trays to bakeries and hotels."
    },
    {
      id: "bulk-222",
      lotId: "LOT-NAATI-2026-KARNATAKA",
      farmerId: "farmer-gurpreet-108",
      farmerName: "Gurpreet Kaur",
      farmerLocation: "Ludhiana, Punjab",
      societyId: "coop-karnal-02",
      societyName: "Karnal Indigenous Dairy & Grains Cooperative Union",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Country Chicken (Naati Koli) Bulk Dressed Lot",
      category: "poultry",
      subCategory: "Chicken Bulk",
      bulkPrice: 330,
      mandiWholesalePrice: 480,
      pricePerUnitDisplay: "₹33,000 / Quintal (₹330/kg)",
      mandiPriceDisplay: "₹48,000 / Quintal (₹480/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 33000,
      mandiPrice: 48000,
      pricePerKg: 330,
      stockQuantity: 22,
      weightKg: 2200,
      stockDisplay: "22 Quintals (2.2 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "10kg Vacuum Packs in Insulated Cartons",
      coldChainReq: "Deep Chill 0°C - 4°C",
      harvestDate: new Date(Date.now() - 30 * 3600 * 1000).toISOString(),
      imageURL: "assets/products/Country Chicken (Naati Koli, Whole Dressed).jpg",
      aiGrade: "Grade A+ Free Range (Antibiotic-Free)",
      aiFreshnessScore: 96,
      shelfLifeDays: 7,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹33,000/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹31,020/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹29,040/Qtl" }
      ],
      description: "Slow-grown naati koli dressed to order for restaurant supply chains."
    },
    {
      id: "bulk-223",
      lotId: "LOT-HONEY-2026-NILGIRI",
      farmerId: "farmer-lakshmi-105",
      farmerName: "Lakshmi Devi",
      farmerLocation: "Kolar, Karnataka",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      saleStatus: "available",
      title: "Raw Wild Forest Honey (Bulk Unfiltered Drums)",
      category: "poultry",
      subCategory: "Honey Bulk",
      bulkPrice: 520,
      mandiWholesalePrice: 760,
      pricePerUnitDisplay: "₹52,000 / Quintal (₹520/kg)",
      mandiPriceDisplay: "₹76,000 / Quintal (₹760/kg)",
      unit: "Quintal",
      unitSizeKg: 100,
      price: 52000,
      mandiPrice: 76000,
      pricePerKg: 520,
      stockQuantity: 35,
      weightKg: 3500,
      stockDisplay: "35 Quintals (3.5 Metric Tonnes)",
      minOrderQuantity: 2,
      moqDisplay: "2 Quintals (200 kg)",
      packagingType: "20kg Food-Grade HDPE Drums",
      coldChainReq: "Dry Ambient, Below 25°C",
      harvestDate: new Date(Date.now() - 31 * 3600 * 1000).toISOString(),
      imageURL: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop&q=80",
      aiGrade: "Grade A+ Raw (Moisture <20%)",
      aiFreshnessScore: 96,
      shelfLifeDays: 720,
      volumeTiers: [
        { tier: "2 - 10 Quintals", discount: "Standard Wholesale", price: "₹52,000/Qtl" },
        { tier: "11 - 24 Quintals", discount: "6% Volume Incentive", price: "₹48,880/Qtl" },
        { tier: "> 24 Quintals (Full Truckload)", discount: "12% Mega-Procurement", price: "₹45,760/Qtl" }
      ],
      description: "Unheated single-origin forest honey in bulk drums with pollen analysis."
    }
  
  ],

  // 5. Active Orders
  orders: [
    {
      id: "ORD-9403",
      buyerId: "consumer-ananya-201",
      buyerName: "Ananya Deshmukh",
      buyerPhone: "+91 98201 12345",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      logisticsId: null,
      driverName: "Awaiting Dispatch Assignment",
      items: [
        { productId: "prod-103", title: "Alphonso Mango Tray", quantity: 2, unit: "kg", price: 320 }
      ],
      totalAmount: 640,
      mandiComparableTotal: 920,
      savings: 280,
      deliveryType: "instant_bike",
      status: "pending_pickup",
      statusHistory: [
        { status: "pending_pickup", label: "Order placed & payment confirmed", at: new Date(Date.now() - 8 * 60 * 1000).toISOString() }
      ],
      deliveryAddress: "12 Lakeview Residency, Koramangala, Bengaluru",
      pickupAddress: "Sahyadri Co-op Collection Center 3, Pimpalgaon, Nashik",
      paymentMethod: "ONLINE",
      paymentId: "pay_test_9K2mQ7pR4tX1cD",
      paymentStatus: "paid_test_mode",
      createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString()
    },
    {
      id: "ORD-9401",
      buyerId: "consumer-ananya-201",
      buyerName: "Ananya Deshmukh",
      buyerPhone: "+91 98201 12345",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      logisticsId: "driver-rohit-302",
      driverName: "Rohit Verma (Bike)",
      items: [
        { productId: "prod-101", title: "Vine-Ripened Hybrid Tomatoes", quantity: 3, unit: "kg", price: 28 },
        { productId: "prod-102", title: "Nashik Red Onion", quantity: 4, unit: "kg", price: 24 }
      ],
      totalAmount: 180,
      mandiComparableTotal: 270,
      savings: 90,
      deliveryType: "instant_bike",
      status: "out_for_delivery",
      deliveryAddress: "Flat 402, Green Meadows, Indiranagar, Bengaluru",
      pickupAddress: "Sahyadri Co-op Collection Center 3, Pimpalgaon, Nashik",
      paymentMethod: "ONLINE",
      paymentId: "pay_test_5F3x9QkL2mN0aB",
      paymentStatus: "paid_test_mode",
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: "ORD-9402",
      buyerId: "buyer-tajhotel-202",
      buyerName: "Grand Horizon Hotels & Resorts",
      buyerPhone: "+91 99302 99881",
      farmerId: "farmer-ramesh-101",
      farmerName: "Rameshwar Patil",
      societyId: "coop-sahyadri-01",
      societyName: "Sahyadri Farmers Agro Cooperative Society Ltd.",
      sellingChannel: "cooperative",
      logisticsId: "driver-vikram-301",
      driverName: "Vikram Rathore (Reefer Cold-Truck)",
      items: [
        { productId: "bulk-201", title: "Grade-A+ Tomatoes (Field Harvest Lot)", quantity: 10, unit: "Quintal", price: 1800 }
      ],
      totalAmount: 18000,
      mandiComparableTotal: 28000,
      savings: 10000,
      deliveryType: "large_truck",
      status: "out_for_delivery",
      deliveryAddress: "Central Kitchen, Whitefield Bengaluru",
      pickupAddress: "Sahyadri Agro Cold-Storage Bay 4, Nashik",
      paymentMethod: "COD",
      paymentId: null,
      paymentStatus: "cod_pending",
      createdAt: new Date(Date.now() - 110 * 60 * 1000).toISOString()
    }
  ],

  // 6. Govt Schemes
  schemes: [
    {
      id: "scheme-pmkisan",
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      category: "Direct Income Support",
      benefit: "₹6,000 / year in 3 direct bank installments",
      eligibility: "All landholding farmer families with cultivable landholding",
      status: "Enrolling Now",
      officialLink: "https://pmkisan.gov.in/",
      deadline: "Ongoing 2026-27",
      aiRecommendation: "Highly Recommended for your registered farm profile."
    },
    {
      id: "scheme-pmfby",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      category: "Crop Insurance & Weather Shield",
      benefit: "Comprehensive coverage against crop failure at nominal premium (1.5% - 2%)",
      eligibility: "Farmers growing notified crops (Tomato, Grapes, Pulses, Wheat)",
      status: "Kharif & Rabi Active",
      officialLink: "https://pmfby.gov.in/",
      deadline: "Within 15 days of sowing",
      aiRecommendation: "Protect high-value grape and tomato crops from unseasonal rain."
    },
    {
      id: "scheme-pmmsy",
      title: "PM Matsya Sampada Yojana (PMMSY)",
      category: "Fisheries & Marine Infrastructure",
      benefit: "Up to 60% capital subsidy for insulated fish transport vans & cold storages",
      eligibility: "Fishers, Fish farmers, Coastal Cooperatives, SHGs",
      status: "Active Portal",
      officialLink: "https://pmmsy.dof.gov.in/",
      deadline: "2026-2027 Open",
      aiRecommendation: "Perfect for coastal catch cold chain preservation."
    },
    {
      id: "scheme-aif",
      title: "Agriculture Infrastructure Fund (AIF)",
      category: "Cold Chain & Storage Loan",
      benefit: "3% interest subvention up to ₹2 Crore for farm-gate cold storage & solar drying",
      eligibility: "FPOs, Individual Farmers, Agri Cooperatives",
      status: "Open",
      officialLink: "https://agriinfra.dac.gov.in/",
      deadline: "Valid through 2030",
      aiRecommendation: "Cooperative societies can expand cold room capacity under AIF."
    },
    {
      id: "scheme-solarpump",
      title: "PM-KUSUM Scheme (Solar Agriculture Pump)",
      category: "Renewable Energy Subsidy",
      benefit: "Up to 60% government subsidy for standalone solar irrigation pumps",
      eligibility: "Farmers with irrigation water source but limited grid power",
      status: "Active Portal",
      officialLink: "https://pmkusum.mnre.gov.in/",
      deadline: "Phase III Active",
      aiRecommendation: "Cut irrigation electricity bills to ₹0."
    }
  ],

  // 7. Community Forums
  forums: [
    {
      id: "forum-1",
      authorName: "Gurpreet Singh (Punjab)",
      authorRole: "Wheat & Pulses Specialist",
      title: "Zero-Tillage Wheat Sowing: Results after 3rd Season",
      content: "Switched to Happy Seeder method this rabi season. Saved ₹3,800/acre in diesel and moisture retention was exceptional even during the hot spell. Highly recommend fellow northern growers.",
      likes: 42,
      replies: 15,
      tag: "Crops & Agronomy",
      timestamp: "2 hours ago"
    },
    {
      id: "forum-2",
      authorName: "Dr. Arvind Kulkarni",
      authorRole: "Veterinary Officer",
      title: "Preventing Heat Stress & Milk Yield Drop in Dairy Cattle",
      content: "Ensure adequate electrolyte hydration, mist fans in holding pens, and shift high-protein concentrate feeding to cooler dawn/dusk hours to maintain butterfat content.",
      likes: 58,
      replies: 23,
      tag: "Dairy & Livestock",
      timestamp: "5 hours ago"
    },
    {
      id: "forum-3",
      authorName: "Anthony Murugan (Tamil Nadu)",
      authorRole: "Coastal Marine Catch",
      title: "Slurry Ice vs Flake Ice on Boat: Keeping Silver Pomfret Export Grade",
      content: "Sea-water slurry ice drops core temperature of the fish to -1°C in under 12 minutes without bruising the skin. Highly recommended for all seafood partners.",
      likes: 64,
      replies: 19,
      tag: "Marine & Cold Chain",
      timestamp: "1 hour ago"
    }
  ]
};

// ============================================================================
// DATA LAYER — Dual mode: Real Firebase Firestore (shared, cross-device)
// or Local Reactive Firestore (localStorage, single-browser demo fallback).
//
// HOW TO GO LIVE (make product updates visible to every logged-in user):
//   1. Create a project at https://console.firebase.google.com
//   2. Enable "Cloud Firestore" (and Authentication if you want real auth)
//   3. Enable "Storage" too (Build > Storage > Get Started) if you want
//      farmer-uploaded produce photos shared across devices instead of
//      staying as local-only data URLs (see window.AgriSetuDB.uploadImage
//      below). Default Storage rules require auth to write; for a quick
//      demo you can temporarily allow public read/write similarly to the
//      Firestore rules snippet in README.md — tighten before production.
//   4. Project settings > General > Your apps > Web app > copy the config
//   5. Paste those real values into `defaultFirebaseConfig` below,
//      replacing the placeholder apiKey/projectId/etc.
//   6. Reload the app. It auto-detects a real config and switches every
//      page to shared Firestore + Storage automatically — no other file
//      needs to change.
// Until you do that, the app keeps working exactly as before, using
// localStorage, so it's safe to leave this in place as a demo/dev fallback.
// ============================================================================

function isRealFirebaseConfig(config) {
  return !!(
    config &&
    config.apiKey &&
    !String(config.apiKey).includes("Dummy") &&
    config.projectId
  );
}

// ---- Local Reactive Firestore (localStorage) — used only as a fallback ----
class ReactiveFirestore {
  constructor() {
    this.storageKey = "samruddhisetu_db_data_v5";
    this.listeners = new Map();
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed.cooperatives && parsed.cooperatives.length >= 4 &&
          parsed.products && parsed.products.length >= 50 &&
          parsed.bulkProducts && parsed.bulkProducts.length >= 23
        ) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading local storage, re-seeding data:", e);
    }
    this.saveData(initialDataSeed);
    return JSON.parse(JSON.stringify(initialDataSeed));
  }

  saveData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      this.notifyListeners();
    } catch (e) {
      console.error("Failed to save Firestore data:", e);
    }
  }

  notifyListeners(collectionName) {
    this.listeners.forEach((callback, key) => {
      if (!collectionName || key.startsWith(collectionName)) {
        callback(this.data);
      }
    });
  }

  collection(collectionName) {
    const self = this;
    if (!self.data[collectionName]) {
      self.data[collectionName] = [];
      self.saveData(self.data);
    }

    return {
      async get() {
        return {
          docs: (self.data[collectionName] || []).map(item => ({
            id: item.id || item.uid,
            data: () => ({ ...item })
          }))
        };
      },

      async add(item) {
        const id = item.id || `${collectionName.slice(0, 3)}-${Date.now()}-${Math.floor(Math.random()*1000)}`;
        const record = { ...item, id, createdAt: item.createdAt || new Date().toISOString() };
        self.data[collectionName] = [record, ...(self.data[collectionName] || [])];
        self.saveData(self.data);
        return { id, data: () => record };
      },

      doc(docId) {
        return {
          async get() {
            const item = (self.data[collectionName] || []).find(d => (d.id === docId || d.uid === docId));
            return {
              exists: !!item,
              id: docId,
              data: () => item ? ({ ...item }) : null
            };
          },

          async update(updates) {
            const list = self.data[collectionName] || [];
            const idx = list.findIndex(d => (d.id === docId || d.uid === docId));
            if (idx !== -1) {
              list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
              self.data[collectionName] = list;
              self.saveData(self.data);
              return { success: true };
            }
            throw new Error(`Document ${docId} not found in collection ${collectionName}`);
          },

          async delete() {
            self.data[collectionName] = (self.data[collectionName] || []).filter(d => (d.id !== docId && d.uid !== docId));
            self.saveData(self.data);
            return { success: true };
          },

          async set(data, options = {}) {
            const list = self.data[collectionName] || [];
            const idx = list.findIndex(d => (d.id === docId || d.uid === docId));
            const record = { id: docId, ...data };
            if (idx !== -1) {
              list[idx] = options.merge ? { ...list[idx], ...data } : record;
            } else {
              list.unshift(record);
            }
            self.data[collectionName] = list;
            self.saveData(self.data);
            return { success: true };
          }
        };
      },

      onSnapshot(callback) {
        const listenerId = `${collectionName}_${Date.now()}_${Math.random()}`;
        const listener = () => {
          const docs = (self.data[collectionName] || []).map(item => ({
            id: item.id || item.uid,
            data: () => ({ ...item })
          }));
          callback({ docs });
        };
        self.listeners.set(listenerId, listener);
        listener();
        return () => self.listeners.delete(listenerId);
      }
    };
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(initialDataSeed));
    this.saveData(this.data);
    return this.data;
  }
}

// ---- Real Firestore adapter — shared across every user/device/browser ----
class LiveFirestore {
  constructor(config) {
    if (!window.firebase || !window.firebase.apps) {
      throw new Error("Firebase SDK not loaded. Add the firebase-app-compat.js and firebase-firestore-compat.js <script> tags before firebase-config.js.");
    }
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(config);
    }
    this.db = window.firebase.firestore();
  }

  collection(collectionName) {
    const ref = this.db.collection(collectionName);

    return {
      async get() {
        const snap = await ref.get();
        return {
          docs: snap.docs.map(d => ({ id: d.id, data: () => d.data() }))
        };
      },

      async add(item) {
        const id = item.id || undefined;
        const payload = { ...item, createdAt: item.createdAt || new Date().toISOString() };
        if (id) {
          await ref.doc(id).set(payload);
          return { id, data: () => payload };
        }
        const docRef = await ref.add(payload);
        return { id: docRef.id, data: () => payload };
      },

      doc(docId) {
        const dref = ref.doc(docId);
        return {
          async get() {
            const snap = await dref.get();
            return { exists: snap.exists, id: docId, data: () => (snap.exists ? snap.data() : null) };
          },
          async update(updates) {
            await dref.update({ ...updates, updatedAt: new Date().toISOString() });
            return { success: true };
          },
          async delete() {
            await dref.delete();
            return { success: true };
          },
          async set(data, options = {}) {
            await dref.set(data, options);
            return { success: true };
          }
        };
      },

      onSnapshot(callback) {
        return ref.onSnapshot(snap => {
          callback({ docs: snap.docs.map(d => ({ id: d.id, data: () => d.data() })) });
        });
      }
    };
  }
}

// ---- Real Firebase Authentication adapter ----
// This is the actual Firebase Authentication service (not Firestore). Every
// sign-up creates a real Auth user (email + password credential, managed
// and hashed by Google's servers — the app never sees or stores the raw
// password). The Auth user's `uid` is what we then use as the document ID
// for that person's profile in the Firestore "users" collection, so the
// login credential and the profile data stay permanently linked.
class LiveAuthAdapter {
  constructor() {
    if (!window.firebase || typeof window.firebase.auth !== "function") {
      throw new Error("Firebase Auth SDK not loaded. Add the firebase-auth-compat.js <script> tag before firebase-config.js.");
    }
    this.auth = window.firebase.auth();
  }
  async signUp(email, password) {
    const cred = await this.auth.createUserWithEmailAndPassword(String(email).trim(), password);
    return cred.user;
  }
  async signIn(email, password) {
    const cred = await this.auth.signInWithEmailAndPassword(String(email).trim(), password);
    return cred.user;
  }
  async signOutUser() {
    await this.auth.signOut();
  }
  async sendPasswordReset(email) {
    await this.auth.sendPasswordResetEmail(String(email).trim());
  }
  async deleteCurrentUser() {
    if (this.auth.currentUser) await this.auth.currentUser.delete();
  }
  getCurrentUser() {
    return this.auth.currentUser;
  }
}

// ---- Local demo Authentication adapter (localStorage) ----
// Used only when no live Firebase Auth SDK/project is attached (the same
// dual-mode pattern as ReactiveFirestore above), so the sign-up/login flow
// still works end-to-end while developing without cloud credentials.
class LocalAuthAdapter {
  constructor() {
    this.storageKey = "samruddhisetu_local_auth_users_v1";
    this.sessionKey = "samruddhisetu_local_auth_session_v1";
  }
  _load() {
    try { return JSON.parse(localStorage.getItem(this.storageKey)) || {}; } catch (e) { return {}; }
  }
  _save(users) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
  async _hash(pw) {
    const bytes = new TextEncoder().encode(String(pw || ""));
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  async signUp(email, password) {
    const users = this._load();
    const key = String(email).trim().toLowerCase();
    if (users[key]) {
      const err = new Error("The email address is already in use by another account.");
      err.code = "auth/email-already-in-use";
      throw err;
    }
    const uid = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    users[key] = { uid, email: key, passwordHash: await this._hash(password) };
    this._save(users);
    localStorage.setItem(this.sessionKey, uid);
    return {
      uid,
      email: key,
      delete: async () => {
        const latest = this._load();
        delete latest[key];
        this._save(latest);
      }
    };
  }
  async signIn(email, password) {
    const users = this._load();
    const key = String(email).trim().toLowerCase();
    const record = users[key];
    if (!record) {
      const err = new Error("There is no account registered with this email.");
      err.code = "auth/user-not-found";
      throw err;
    }
    const hash = await this._hash(password);
    if (hash !== record.passwordHash) {
      const err = new Error("Incorrect password.");
      err.code = "auth/wrong-password";
      throw err;
    }
    localStorage.setItem(this.sessionKey, record.uid);
    return { uid: record.uid, email: key };
  }
  async signOutUser() {
    localStorage.removeItem(this.sessionKey);
  }
  async sendPasswordReset(_email) {
    // No real mail service in local demo mode — the existing password
    // simply keeps working. Kept as a no-op so calling code doesn't branch.
    return true;
  }
  async deleteCurrentUser() {}
  getCurrentUser() {
    const uid = localStorage.getItem(this.sessionKey);
    return uid ? { uid } : null;
  }
}

// ---- Pick the right engine for this session ----
const storedConfigRaw = localStorage.getItem("samruddhisetu_firebase_config");
const effectiveConfig = storedConfigRaw ? JSON.parse(storedConfigRaw) : defaultFirebaseConfig;
const useLiveFirebase = isRealFirebaseConfig(effectiveConfig);

let activeDb;
try {
  activeDb = useLiveFirebase ? new LiveFirestore(effectiveConfig) : new ReactiveFirestore();
} catch (e) {
  console.error("Falling back to local demo storage:", e.message);
  activeDb = new ReactiveFirestore();
}

if (useLiveFirebase) {
  console.info(`Samruddhi Setu is running on LIVE Firebase project "${effectiveConfig.projectId}" — data is shared across all users.`);
} else {
  console.info("Samruddhi Setu is running in LOCAL DEMO mode (localStorage) — data is private to this browser. Add real Firebase keys in js/firebase-config.js to share data across users.");
}

// Global DB Singleton
window.AgriSetuDB = {
  db: activeDb,
  config: effectiveConfig,
  initialSeed: initialDataSeed,
  isLiveFirebase: useLiveFirebase,

  connectLiveFirebase: async function(customConfig) {
    try {
      const merged = { ...defaultFirebaseConfig, ...customConfig };
      localStorage.setItem("samruddhisetu_firebase_config", JSON.stringify(merged));
      return { success: true, message: `Saved Firebase project "${merged.projectId}". Reload the page to connect.` };
    } catch (err) {
      console.error("Firebase connection error:", err);
      return { success: false, error: err.message };
    }
  },

  getStoredConfig: function() {
    return effectiveConfig;
  },

  /**
   * Resize + compress an image File client-side before storing/uploading it,
   * so both the live-Firebase and local-demo paths stay fast and cheap.
   * Returns a JPEG data URL.
   */
  _downscaleImage: function(file, maxDim = 900, quality = 0.82) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /**
   * Uploads an image file for use as a product/produce photo.
   *  - Live Firebase mode: uploads to Firebase Cloud Storage (requires
   *    firebase-storage-compat.js to be included on the page) and returns
   *    the public download URL, shared across every user/device.
   *  - Local demo mode: downsizes the image and returns a compressed
   *    base64 data URL instead (kept only in this browser's storage).
   * @param {File} file
   * @param {string} folder e.g. "product-images"
   * @param {function} onProgress optional (percent:number) => void, only
   *        fires meaningfully in live Firebase mode.
   */
  uploadImage: async function(file, folder = "product-images", onProgress = null) {
    if (!file) throw new Error("No file provided");

    if (useLiveFirebase && window.firebase && typeof window.firebase.storage === "function") {
      try {
        const storage = window.firebase.storage();
        const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const ref = storage.ref().child(`${folder}/${safeName}`);
        const task = ref.put(file);

        return await new Promise((resolve, reject) => {
          task.on(
            "state_changed",
            (snapshot) => {
              if (onProgress) {
                const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                onProgress(pct);
              }
            },
            (err) => reject(err),
            async () => {
              const url = await task.snapshot.ref.getDownloadURL();
              resolve({ url, storage: "firebase" });
            }
          );
        });
      } catch (err) {
        console.warn("Firebase Storage upload failed, falling back to local data URL:", err.message);
      }
    }

    // Local demo fallback: compressed data URL, no Storage bucket needed.
    const dataUrl = await this._downscaleImage(file);
    if (onProgress) onProgress(100);
    return { url: dataUrl, storage: "local" };
  },

  seedDatabase: async function(onProgress = null) {
    const seed = JSON.parse(JSON.stringify(initialDataSeed));
    const collections = Object.keys(seed);

    // `allLogs` is the full transcript returned to the caller; `logs` is a
    // drain-on-report buffer so the live console never repeats a line.
    const allLogs = [];
    const logs = {
      push(msg) { allLogs.push(msg); this._pending.push(msg); },
      splice() { const out = this._pending; this._pending = []; return out; },
      _pending: []
    };

    if (useLiveFirebase) {
      logs.push(`Seeding live Firebase project "${effectiveConfig.projectId}"...`);
      if (onProgress) onProgress({ step: "firebase_starting", percent: 5, logs: logs.splice() });

      // Total document count drives an accurate progress bar across every
      // collection, so large catalogues report real progress rather than
      // jumping from 20% to 100%.
      const totalDocs = collections.reduce((n, c) => n + ((seed[c] || []).length), 0);
      let count = 0;
      let failed = 0;

      for (let ci = 0; ci < collections.length; ci++) {
        const colName = collections[ci];
        const items = seed[colName] || [];
        if (!items.length) {
          logs.push(`- ${colName}: nothing to seed (0 documents).`);
          if (onProgress) onProgress({ step: colName, percent: Math.round(5 + (count / Math.max(totalDocs, 1)) * 90), logs: logs.splice() });
          continue;
        }

        logs.push(`→ Uploading ${items.length} document(s) to "${colName}"...`);
        let colOk = 0;

        for (const item of items) {
          const docId = item.id || item.uid;
          if (!docId) {
            failed++;
            logs.push(`  ! Skipped a ${colName} record with no id/uid.`);
            continue;
          }
          try {
            await activeDb.db.collection(colName).doc(String(docId)).set(item, { merge: true });
            count++;
            colOk++;
          } catch (e) {
            failed++;
            logs.push(`  ! Failed ${colName}/${docId}: ${e.message}`);
          }
          // Report progress every few documents to keep the UI responsive
          if (count % 5 === 0 && onProgress) {
            onProgress({ step: colName, percent: Math.round(5 + (count / Math.max(totalDocs, 1)) * 90), logs: logs.splice() });
          }
        }

        logs.push(`✓ ${colName}: ${colOk}/${items.length} documents synced.`);
        if (onProgress) onProgress({ step: colName, percent: Math.round(5 + (count / Math.max(totalDocs, 1)) * 90), logs: logs.splice() });
      }

      logs.push(`Seeded ${count} of ${totalDocs} documents to Firestore${failed ? ` (${failed} failed)` : ""}.`);
      if (onProgress) onProgress({ step: "complete", percent: 100, logs: logs.splice(), liveSyncedCount: count });
      return { success: true, logs: allLogs, liveSyncedCount: count, totalDocs, failed };
    } else {
      activeDb.resetToDefault();
      const totalDocs = collections.reduce((n, c) => n + ((seed[c] || []).length), 0);
      collections.forEach(c => {
        const n = (seed[c] || []).length;
        if (n) logs.push(`✓ ${c}: ${n} documents re-seeded locally.`);
      });
      logs.push(`Local demo database re-seeded with ${totalDocs} documents (localStorage only, not shared across browsers).`);
      logs.push("ℹ️ Connect a Firebase project below to push this same data to the cloud.");
      if (onProgress) onProgress({ step: "complete", percent: 100, logs: logs.splice(), liveSyncedCount: 0, totalDocs });
      return { success: true, logs: allLogs, liveSyncedCount: 0, totalDocs };
    }
  }
};

// ---- Global Authentication Singleton ----
// Real Firebase Authentication is used whenever this page has loaded
// firebase-auth-compat.js AND we're on a live Firebase project; otherwise
// we fall back to the local demo adapter above.
const canUseLiveAuth = useLiveFirebase && window.firebase && typeof window.firebase.auth === "function";
let activeAuth;
try {
  activeAuth = canUseLiveAuth ? new LiveAuthAdapter() : new LocalAuthAdapter();
} catch (e) {
  console.error("Falling back to local demo authentication:", e.message);
  activeAuth = new LocalAuthAdapter();
}

if (canUseLiveAuth) {
  console.info("Samruddhi Setu is using LIVE Firebase Authentication for sign-up and login.");
} else {
  console.info("Samruddhi Setu is using LOCAL DEMO authentication (localStorage) — add the firebase-auth-compat.js <script> tag on this page to use real Firebase Authentication.");
}

window.AgriSetuAuth = activeAuth;
