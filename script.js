const products = [
    { id: 1, name: "Äpple", category: "frukt", price: 18, unit: "kg", emoji: "🍎", desc: "Söta svenska äpplen." },
    { id: 2, name: "Banan", category: "frukt", price: 22, unit: "kg", emoji: "🍌", desc: "Perfekt till frukost och smoothie." },
    { id: 3, name: "Tomat", category: "grönsaker", price: 29, unit: "kg", emoji: "🍅", desc: "Fräscha tomater till sallad och matlagning." },
    { id: 4, name: "Gurka", category: "grönsaker", price: 19, unit: "st", emoji: "🥒", desc: "Krispig gurka." },
    { id: 5, name: "Mjölk", category: "mejeri", price: 16, unit: "1L", emoji: "🥛", desc: "Standardmjölk 3%." },
    { id: 6, name: "Ris", category: "basvaror", price: 39, unit: "1kg", emoji: "🍚", desc: "Långkornigt ris." },
    { id: 7, name: "Mineralvatten", category: "dryck", price: 14, unit: "1.5L", emoji: "💧", desc: "Kolsyrat vatten." },
    { id: 8, name: "Ost", category: "mejeri", price: 54, unit: "500g", emoji: "🧀", desc: "Mild hushållsost." }
];

const state = {
    search: "",
    category: "alla",
    sort: "default",
    maxPrice: 120,
    cart: loadCart()
};

