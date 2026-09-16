/* Dataset-aware product imagery. Exact title/subcategory matches win over legacy Firebase imageURL values. */
(function (global) {
  const FALLBACK = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=85";
  const SUPPLIED_BY_TITLE = {"deep-sea silver pomfret (flash-frozen insulated export crates)": "assets/products/Deep-Sea-Silver-Pomfret-Flash-Frozen-Insulated-Export-Crates.jpg", "aged farmstead cheddar (6-month cave)": "assets/products/Aged-Farmstead-Cheddar-6-Month-Cave.png", "artisanal vedic bilona cow ghee (glass jar)": "assets/products/Artisanal Vedic Bilona Cow Ghee (Glass Jar).jpg", "bhagwa pomegranate (deep ruby arils)": "assets/products/Bhagwa Pomegranate (Deep Ruby Arils).jpg", "blue swimmer crab (live catch)": "assets/products/Blue Swimmer Crab (Live Catch).jpg", "broiler chicken (antibiotic-residue free)": "assets/products/Broiler Chicken (Antibiotic-Residue Free).jpg", "country brinjal (bharta special)": "assets/products/Country Brinjal (Bharta Special).png", "country chicken (naati koli, whole dressed)": "assets/products/Country Chicken (Naati Koli, Whole Dressed).jpg", "desi chana whole black gram": "assets/products/Desi Chana Whole Black Gram.jpg", "foxtail millet (navane, polished-free)": "assets/products/Foxtail Millet (Navane, Polished-Free).jpg", "fresh malai paneer (hand pressed)": "assets/products/Fresh Malai Paneer (Hand Pressed).jpg", "fresh squid rings (cleaned & deveined)": "assets/products/Fresh Squid Rings (Cleaned & Deveined).jpg", "indian mackerel (bangda, ice packed)": "assets/products/Indian Mackerel (Bangda, Ice Packed).jpg", "kadaknath black chicken eggs": "assets/products/Kadaknath Black Chicken Eggs.jpg", "murrah buffalo full-cream milk": "assets/products/Murrah Buffalo Full-Cream Milk.jpg", "nendran banana (kerala highland)": "assets/products/Nendran Banana (Kerala Highland).jpeg", "organic jowar (sorghum whole grain)": "assets/products/Organic Jowar (Sorghum Whole Grain).jpg", "set dahi from a2 gir cow milk": "assets/products/Set Dahi from A2 Gir Cow Milk.jpg", "siridhanya finger millet (ragi whole)": "assets/products/Siridhanya Finger Millet (Ragi Whole).jpg", "sitaphal custard apple (balanagar)": "assets/products/Sitaphal Custard Apple (Balanagar).jpeg", "snowball cauliflower (pesticide monitored)": "assets/products/Snowball Cauliflower (Pesticide Monitored).jpg", "stone-ground sharbati wheat atta": "assets/products/Stone-Ground Sharbati Wheat Atta.jpg", "toor dal (arhar, unpolished mill fresh)": "assets/products/Toor Dal (Arhar, Unpolished Mill Fresh).jpg", "wild seer fish steaks (surmai)": "assets/products/Wild Seer Fish Steaks (Surmai).jpg", "yellowfin tuna loin (sashimi cut)": "assets/products/Yellowfin Tuna Loin (Sashimi Cut).jpg", "free-range country chicken eggs (brown)": "assets/products/Free-Range-Country-Chicken-Eggs-Brown.jpg", "farmhouse sweet lassi (bottled)": "assets/products/Farmhouse-Sweet-Lassi-Bottled.jpg"};
  function normalizeTitle(value) { return String(value || "").toLowerCase().replace(/\.(jpg|jpeg|png)$/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }
  // Bug fix: the map's keys must be normalized the same way as the incoming
  // title before comparing, otherwise punctuation (hyphens/commas/parens in
  // keys like "Murrah Buffalo Full-Cream Milk") makes every exact/substring
  // check fail silently and real supplied photos never get used.
  const SUPPLIED_BY_TITLE_NORM = Object.keys(SUPPLIED_BY_TITLE).reduce((acc, k) => {
    acc[normalizeTitle(k)] = SUPPLIED_BY_TITLE[k];
    return acc;
  }, {});
  function suppliedImage(product) {
    const title = normalizeTitle(product?.title);
    if (!title) return "";
    const normKeys = Object.keys(SUPPLIED_BY_TITLE_NORM);
    const exact = normKeys.find(k => title === k || title.includes(k) || k.includes(title));
    if (exact) return SUPPLIED_BY_TITLE_NORM[exact];
    // Fallback aliases for bulk/HoReCa variants that reuse a retail photo.
    // "country"+"chicken" is deliberately excluded here when the title says
    // "egg" so an egg listing can never be routed to a dressed-meat photo;
    // eggs now have their own exact entry above anyway.
    const aliases = [["malai","paneer","fresh malai paneer (hand pressed)"],["bilona","ghee","artisanal vedic bilona cow ghee (glass jar)"],["pomegranate","bhagwa pomegranate (deep ruby arils)"],["nendran","banana","nendran banana (kerala highland)"],["toor","dal","toor dal (arhar, unpolished mill fresh)"],["seer","fish","wild seer fish steaks (surmai)"],["country","chicken","country chicken (naati koli, whole dressed)"]];
    const alias = aliases.find(([a,b]) => title.includes(a) && title.includes(b) && !title.includes("egg"));
    return alias ? SUPPLIED_BY_TITLE_NORM[normalizeTitle(alias[2])] : "";
  }
  const IMAGE_BY_KEY = {
    tomato: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=800&auto=format&fit=crop&q=85",
    onion: "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&auto=format&fit=crop&q=85",
    potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=85",
    mango: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=85",
    banana: "https://images.unsplash.com/photo-1571771894821-ace20d8e2c6b?w=800&auto=format&fit=crop&q=85",
    apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=85",
    guava: "https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=800&auto=format&fit=crop&q=85",
    orange: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop&q=85",
    mandarin: "https://images.unsplash.com/photo-1547514701-42782101795e?w=800&auto=format&fit=crop&q=85",
    pomegranate: "https://images.unsplash.com/photo-1541344999736-83eca272f6fc?w=800&auto=format&fit=crop&q=85",
    custard: "https://images.unsplash.com/photo-1603048719539-9ecb4f9a6f1d?w=800&auto=format&fit=crop&q=85",
    papaya: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=800&auto=format&fit=crop&q=85",
    spinach: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=85",
    leafy: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=85",
    capsicum: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&auto=format&fit=crop&q=85",
    carrot: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=85",
    vegetable: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=85",
    rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=85",
    wheat: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=85",
    millet: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=85",
    dal: "https://images.unsplash.com/photo-1613758235402-745466bb7efe?w=800&auto=format&fit=crop&q=85",
    milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=85",
    paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=85",
    dahi: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&auto=format&fit=crop&q=85",
    curd: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&auto=format&fit=crop&q=85",
    butter: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=85",
    ghee: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=800&auto=format&fit=crop&q=85",
    dairy: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=85",
    egg: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&auto=format&fit=crop&q=85",
    poultry: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=800&auto=format&fit=crop&q=85",
    fish: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&auto=format&fit=crop&q=85",
    seafood: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?w=800&auto=format&fit=crop&q=85",
    honey: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=800&auto=format&fit=crop&q=85",
    oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=85"
  };
  const EXACT = [
    ["malai paneer", "paneer"], ["paneer", "paneer"], ["white butter", "butter"], ["safed makhan", "butter"],
    ["set dahi", "dahi"], ["curd", "curd"], ["murrah buffalo", "milk"], ["a2 milk", "milk"],
    ["custard apple", "custard"], ["sitaphal", "custard"], ["santra", "orange"], ["mandarin", "mandarin"],
    ["pomegranate", "pomegranate"], ["capsicum", "capsicum"], ["carrot", "carrot"], ["finger millet", "millet"],
    ["ragi", "millet"], ["toor dal", "dal"], ["groundnut oil", "oil"], ["bilona", "ghee"]
  ];
  function productImage(product) {
    const seed = global.AgriSetuDB?.initialSeed || {};
    const seeded = [...(seed.products || []), ...(seed.bulkProducts || [])].find(x => product?.id && x.id === product.id);
    const supplied = suppliedImage(product || seeded);
    if (supplied) return supplied;
    if (seeded?.imageURL) return seeded.imageURL;
    if (product?.imageURL) return product.imageURL;
    const text = `${product?.title || ""} ${product?.subCategory || ""} ${product?.category || ""}`.toLowerCase();
    const exact = EXACT.find(([needle]) => text.includes(needle));
    if (exact) return IMAGE_BY_KEY[exact[1]];
    const key = Object.keys(IMAGE_BY_KEY).find(k => text.includes(k));
    return (key && IMAGE_BY_KEY[key]) || FALLBACK;
  }
  global.SamruddhiProductImages = { productImage, suppliedImage, FALLBACK, IMAGE_BY_KEY };
})(window);
